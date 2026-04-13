export type CaseItem = {
  id: string;
  title: string;
  imageSrc: string;
  budget: string;
  roi: string;
  area: string;
  location: string;
  complex: string;
  href: string;
  subtitle?: string;
  duration?: string;
};

export const CASES: CaseItem[] = [
  {
    id: "1",
    title: "Modern Loft",
    imageSrc: "/images/statsimg1.jpg",
    budget: "$60,000",
    roi: "35%",
    area: "100 м²",
    location: "Москва",
    complex: "Символ",
    href: "/cases/modern-loft",
  },
  {
    id: "2",
    title: "Urban Minimal",
    imageSrc: "/images/statsimg2.jpg",
    budget: "$48,000",
    roi: "32%",
    area: "85 м²",
    location: "Москва",
    complex: "ЗИЛАРТ",
    href: "/cases/urban-minimal",
  },
  {
    id: "3",
    title: "Family Comfort",
    imageSrc: "/images/pathimg.jpg",
    budget: "$72,000",
    roi: "41%",
    area: "120 м²",
    location: "Санкт-Петербург",
    complex: "Neva Towers",
    href: "/cases/family-comfort",
  },
  {
    id: "4",
    title: "Premium Rent",
    imageSrc: "/images/hero.jpg",
    budget: "$95,000",
    roi: "52%",
    area: "140 м²",
    location: "Москва",
    complex: "Lucky",
    href: "/cases/premium-rent",
  },
  {
    id: "5",
    title: "Investment Studio",
    imageSrc: "/images/statsimg1.jpg",
    budget: "$38,000",
    roi: "29%",
    area: "48 м²",
    location: "Москва",
    complex: "Headliner",
    href: "/cases/investment-studio",
  },
  {
    id: "6",
    title: "High ROI Flip",
    imageSrc: "/images/statsimg2.jpg",
    budget: "$110,000",
    roi: "58%",
    area: "150 м²",
    location: "Москва",
    complex: "Red Side",
    href: "/cases/high-roi-flip",
  },
];

import { Container } from "@/src/components/layout/Container";
import { CaseCard } from "./CaseCard";

export function CasesCatalogSection() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <Container>
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-black/60">
            Материалов: {CASES.length}
          </div>

          <div className="flex gap-3">
            {/* Фильтры можно позже заменить на Select */}
            <div className="rounded-full border px-4 py-2 text-[13px]">
              Бюджет
            </div>
            <div className="rounded-full border px-4 py-2 text-[13px]">ROI</div>
            <div className="rounded-full border px-4 py-2 text-[13px]">
              Метраж
            </div>
            <div className="rounded-full border px-4 py-2 text-[13px]">
              Локация
            </div>
            <div className="rounded-full border px-4 py-2 text-[13px]">ЖК</div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {CASES.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
