import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <AdminNav />
      <div className="shell py-10">{children}</div>
    </div>
  );
}
