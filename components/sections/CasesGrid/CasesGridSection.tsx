import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export type CaseItem = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
};


export const CASES: CaseItem[] = [
  {
    id: "case-1",
    title: "Modern Loft",
    subtitle: "Доходность +42% • 4 месяца",
    imageSrc: "/images/statsimg1.jpg",
    href: "/cases/modern-loft",
  },
  {
    id: "case-2",
    title: "Family Comfort",
    subtitle: "Доходность +36% • 3.5 месяца",
    imageSrc: "/images/statsimg2.jpg",
    href: "/cases/family-comfort",
  },
  {
    id: "case-3",
    title: "Premium Rent",
    subtitle: "Доходность +51% • 5 месяцев",
    imageSrc: "/images/pathimg.jpg",
    href: "/cases/premium-rent",
  },
  {
    id: "case-4",
    title: "Urban Minimal",
    subtitle: "Доходность +33% • 3 месяца",
    imageSrc: "/images/hero.jpg",
    href: "/cases/urban-minimal",
  },
];
export function CasesGridSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[26px] font-medium text-[#1f1f1f] sm:text-[32px]">
            Проекты
          </h2>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className={[
                "group block overflow-hidden rounded-[22px] border border-black/10 bg-white",
                "transition hover:-translate-y-[2px] hover:shadow-[0_18px_60px_rgba(0,0,0,0.12)]",
              ].join(" ")}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={c.imageSrc}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <div className="text-[16px] font-semibold tracking-wide text-[#1f1f1f]">
                  {c.title}
                </div>
                <div className="mt-1 text-[13px] text-black/55">
                  {c.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}