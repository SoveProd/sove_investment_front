import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function AdminSectionCard({ title, children }: Props) {
  return (
    <section className="space-y-5">
      <h2 className="text-[22px] font-medium text-[#383838]">{title}</h2>

      <div className="rounded-[18px]  bg-white ">
        {children}
      </div>
    </section>
  );
}
