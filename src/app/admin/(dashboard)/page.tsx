import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Admin</p>
        <h1 className="display mt-3 text-4xl text-paper md:text-5xl">
          Content studio
        </h1>
        <p className="mt-4 max-w-xl text-fog">
          Manage blogs and client work. Media uploads go to Cloudflare R2; URLs
          are stored in MongoDB.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/blogs"
          className="border border-line bg-panel p-6 transition-colors hover:border-lilac"
        >
          <p className="eyebrow">01</p>
          <h2 className="display mt-3 text-3xl text-paper">Blogs</h2>
          <p className="mt-3 text-sm text-fog">
            Create, edit, publish, and delete blog posts with images/videos.
          </p>
        </Link>
        <Link
          href="/admin/work"
          className="border border-line bg-panel p-6 transition-colors hover:border-lilac"
        >
          <p className="eyebrow">02</p>
          <h2 className="display mt-3 text-3xl text-paper">Work</h2>
          <p className="mt-3 text-sm text-fog">
            Client projects, reviews, and video case cards.
          </p>
        </Link>
      </div>
    </div>
  );
}
