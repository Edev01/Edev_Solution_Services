"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Fragment, type Node as ProseMirrorNode } from "@tiptap/pm/model";
import { TextSelection } from "@tiptap/pm/state";
import { useEffect } from "react";

function ToolbarButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-signal/25 text-lilac"
          : "text-fog hover:bg-line/60 hover:text-paper"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

function toEditorHtml(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

type BlockTarget =
  | { type: "heading"; level: 2 | 3 }
  | { type: "paragraph" };

/**
 * Apply a block type to the current text selection only.
 * Selected text becomes its own block; surrounding text stays as paragraphs.
 */
function applyBlockToSelection(editor: Editor, target: BlockTarget) {
  const { state } = editor;
  const { selection, schema, doc } = state;
  const { from, to, empty } = selection;
  const paragraph = schema.nodes.paragraph;
  const heading = schema.nodes.heading;

  if (!paragraph || !heading) return false;

  const createTarget = (content: Fragment | ProseMirrorNode | null) => {
    if (target.type === "heading") {
      return heading.create({ level: target.level }, content);
    }
    return paragraph.create(null, content);
  };

  // No selection → toggle/convert the whole current block (normal TipTap behavior)
  if (empty) {
    if (target.type === "heading") {
      return editor.chain().focus().toggleHeading({ level: target.level }).run();
    }
    return editor.chain().focus().setParagraph().run();
  }

  const $from = doc.resolve(from);
  const $to = doc.resolve(to);

  // Multi-block or non-textblock selections: fall back to whole-block convert
  if (!$from.sameParent($to) || !$from.parent.isTextblock) {
    if (target.type === "heading") {
      return editor.chain().focus().setHeading({ level: target.level }).run();
    }
    return editor.chain().focus().setParagraph().run();
  }

  const parent = $from.parent;
  const parentPos = $from.before();
  const parentStart = $from.start();
  const parentEnd = $from.end();

  // Full block selected → convert the block
  if (from <= parentStart && to >= parentEnd) {
    if (target.type === "heading") {
      return editor.chain().focus().setHeading({ level: target.level }).run();
    }
    return editor.chain().focus().setParagraph().run();
  }

  // Already a matching heading and selection is partial — keep selection-only split
  const beforeContent =
    from > parentStart ? parent.content.cut(0, from - parentStart) : null;
  const selectedContent = parent.content.cut(from - parentStart, to - parentStart);
  const afterContent =
    to < parentEnd ? parent.content.cut(to - parentStart, parent.content.size) : null;

  const nodes: ProseMirrorNode[] = [];
  if (beforeContent && beforeContent.size > 0) {
    nodes.push(paragraph.create(null, beforeContent));
  }
  nodes.push(createTarget(selectedContent.size > 0 ? selectedContent : null));
  if (afterContent && afterContent.size > 0) {
    nodes.push(paragraph.create(null, afterContent));
  }

  return editor
    .chain()
    .focus()
    .command(({ tr, dispatch }) => {
      if (!dispatch) return true;
      tr.replaceWith(parentPos, parentPos + parent.nodeSize, nodes);

      // Place caret inside the new target block (the middle one when before exists)
      const targetIndex = beforeContent && beforeContent.size > 0 ? 1 : 0;
      let pos = parentPos + 1;
      for (let i = 0; i < targetIndex; i++) {
        pos += nodes[i].nodeSize;
      }
      const inner = Math.min(pos + 1, tr.doc.content.size - 1);
      tr.setSelection(TextSelection.near(tr.doc.resolve(inner)));
      dispatch(tr.scrollIntoView());
      return true;
    })
    .run();
}

function toggleHeadingOnSelection(editor: Editor, level: 2 | 3) {
  const { selection, doc } = editor.state;
  const { from, to, empty } = selection;

  if (!empty) {
    const $from = doc.resolve(from);
    const $to = doc.resolve(to);
    if (
      $from.sameParent($to) &&
      $from.parent.type.name === "heading" &&
      $from.parent.attrs.level === level
    ) {
      // Selected text already in this heading level → turn that slice back into a paragraph
      return applyBlockToSelection(editor, { type: "paragraph" });
    }
    return applyBlockToSelection(editor, { type: "heading", level });
  }

  return editor.chain().focus().toggleHeading({ level }).run();
}

export function RichTextEditor({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (html: string) => void;
  required?: boolean;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Write your post… Use the toolbar for headings and emphasis.",
      }),
    ],
    content: toEditorHtml(value),
    editorProps: {
      attributes: {
        class: "rich-editor-body focus:outline-none min-h-48 px-4 py-3",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.isEmpty ? "" : ed.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = toEditorHtml(value);
    if (!value && !editor.isEmpty) {
      editor.commands.clearContent();
      return;
    }
    if (value && next && next !== current && !editor.isFocused) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rich-editor overflow-hidden border border-line bg-panel">
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-ink/60 px-2 py-2">
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => toggleHeadingOnSelection(editor, 2)}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => toggleHeadingOnSelection(editor, 3)}
        >
          H3
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-line" />
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-line" />
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-line" />
        <ToolbarButton
          active={editor.isActive("link")}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            const url = window.prompt("Link URL");
            if (!url) return;
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          Clear
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      {required ? (
        <input
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          value={value?.replace(/<[^>]+>/g, "").trim() ? "ok" : ""}
          onChange={() => {}}
          required
        />
      ) : null}
    </div>
  );
}
