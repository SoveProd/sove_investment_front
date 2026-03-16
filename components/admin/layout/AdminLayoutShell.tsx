import type { ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

type AdminLayoutShellProps = {
  children: ReactNode;
};

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#383838]">
      <div className="flex min-h-screen gap-5 p-5">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <div className="rounded-[34px] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
            <AdminHeader />

            <main className="px-8 pb-10 pt-4 max-lg:px-5">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
