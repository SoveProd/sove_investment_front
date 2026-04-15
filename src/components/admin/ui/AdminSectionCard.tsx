import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function AdminSectionCard({ title, children }: Props) {
  return (
    <section className="space-y-5">
      <h2 className="text-[35px] font-medium text-graphite">{title}</h2>

      <div className="rounded-[18px] bg-surface">
        {children}
      </div>
    </section>
  );
}
