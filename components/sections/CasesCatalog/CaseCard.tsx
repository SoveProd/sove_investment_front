import Image from "next/image";
import Link from "next/link";
import type { CaseItem } from "./CasesCatalogSection";
import { Button } from "@/components/ui/Button";

export function CaseCard({ item }: { item: CaseItem }) {
  return (
    <article>
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <h3 className="mt-5 text-[18px] font-semibold uppercase tracking-wide">
        {item.title}
      </h3>

      <div className="mt-3 grid grid-cols-2 gap-y-2 text-[13px] text-black/70">
        <div><span className="font-medium">Бюджет:</span> {item.budget}</div>
        <div><span className="font-medium">Сроки реализации:</span> 6 мес.</div>
        <div><span className="font-medium">ROI:</span> {item.roi}</div>
        <div><span className="font-medium">Локация:</span> {item.location}</div>
        <div><span className="font-medium">Метраж:</span> {item.area}</div>
        <div><span className="font-medium">ЖК:</span> {item.complex}</div>
      </div>

      <div className="mt-5">
        <Button
          href={item.href}
          variant="secondaryLight"
          size="lg"
          maxWidth={false}
        >
          Подробнее
        </Button>
      </div>
    </article>
  );
}