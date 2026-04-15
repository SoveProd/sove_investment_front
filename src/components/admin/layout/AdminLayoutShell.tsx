import type { ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeaderActionsProvider } from "./AdminHeaderActionsContext";

type AdminLayoutShellProps = {
  children: ReactNode;
};

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  return (
    <AdminHeaderActionsProvider>
      <div className="min-h-screen bg-bg text-graphite">
        <div className="flex min-h-screen gap-5 p-5">
          <AdminSidebar />

          <div className="min-w-0 flex-1">
            <div className="flex min-h-[calc(100vh-40px)] flex-col rounded-[34px] bg-surface shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
              <AdminHeader />

              <main className="flex-1 px-8 pb-10 pt-4 max-lg:px-5">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </AdminHeaderActionsProvider>
  );
}
