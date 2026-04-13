import type { ReactNode } from "react";
import { AdminLayoutShell } from "@/src/components/admin/layout/AdminLayoutShell";
import { AdminAuthGate } from "@/src/components/auth/AdminAuthGate";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGate>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AdminAuthGate>
  );
}
