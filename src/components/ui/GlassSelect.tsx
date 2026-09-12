"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type GlassSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function GlassSelect({
  name,
  placeholder = "Select an option",
  options,
  value,
  onChange,
}: GlassSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="glass-input flex w-full items-center justify-between gap-3 text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected ? "text-white" : "text-edev-mist/45"}>
          {selected?.label || placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-edev-lilac transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.25 7.5 10 12.25 14.75 7.5l1.5 1.5L10 15.25 3.75 9z" />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-white/20 bg-[#1a0f36] p-1.5 shadow-[0_16px_40px_rgba(8,2,24,0.55)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-edev-mist/85 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
