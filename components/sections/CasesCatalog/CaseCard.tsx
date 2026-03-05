import Image from "next/image";
import type { CaseItem } from "./CasesCatalogSection";
import { Button } from "@/components/ui/Button";

export function CaseCard({ item }: { item: CaseItem }) {
  return (
    <article className="w-full">
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

      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-black/70">
        <div>
          <span className="font-medium text-black">Бюджет:</span> {item.budget}
        </div>
        <div>
          <span className="font-medium text-black">Локация:</span>{" "}
          {item.location}
        </div>
        <div>
          <span className="font-medium text-black">ROI:</span> {item.roi}
        </div>
        <div>
          <span className="font-medium text-black">ЖК:</span> {item.complex}
        </div>
        <div>
          <span className="font-medium text-black">Сроки реализации:</span>{" "}
          {item.duration ?? "6 мес."}
        </div>
        <div>
          <span className="font-medium text-black">Метраж:</span> {item.area}
        </div>
      </div>

      <div className="mt-5">
        <Button href={item.href} variant="outlinePill" size="md" maxWidth>
          Подробнее
        </Button>
      </div>
    </article>
  );
}
