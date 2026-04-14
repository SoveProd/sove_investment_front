import Image from "next/image";
import clsx from "clsx";
import type { CaseItem } from "./CasesCatalogSection";
import { Button } from "@/src/components/ui/Button";

type Props = {
  item: CaseItem;
  mobile?: boolean;
};

export function CaseCard({ item, mobile = false }: Props) {
  if (mobile) {
    return (
      <article className="w-full">
        <div className="relative overflow-hidden rounded-[24px]">
          <div className="relative h-[250px] w-full">
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              className="object-cover"
              sizes="343px"
            />
          </div>
        </div>

        <h3 className="mt-5 text-[18px] font-semibold uppercase leading-none tracking-[0.03em] text-black">
          {item.title}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] leading-[1.25] text-black/75">
          <div>
            <span className="font-semibold text-black">Бюджет:</span>{" "}
            {item.budget}
          </div>
          <div>
            <span className="font-semibold text-black">Локация:</span>{" "}
            {item.location}
          </div>
          <div>
            <span className="font-semibold text-black">ROI:</span> {item.roi}
          </div>
          <div>
            <span className="font-semibold text-black">ЖК:</span> {item.complex}
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-black">Сроки реализации:</span>{" "}
            {item.duration ?? "6 мес."}
          </div>
        </div>

        <div className="mt-5">
          <Button
            href={item.href}
            variant="secondaryLight"
            size="md"
            maxWidth
            className="h-[58px] rounded-full text-[14px] font-medium"
          >
            Забронировать слот
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full">
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
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
        <Button href={item.href} variant="secondaryLight" size="md" maxWidth>
          Подробнее
        </Button>
      </div>
    </article>
  );
}
