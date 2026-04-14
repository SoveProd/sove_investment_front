"use client";

import Image from "next/image";
import type { CmsBlock } from "@/lib/cms/types";
import { getCmsMediaUrl } from "@/lib/cms/mediaUrl";
import { ThreeHoverZones } from "@/src/components/home/FeatureZone/FeatureZone";
import { usePublishedHomepageBlock } from "@/src/components/home/hooks/usePublishedHomepageBlock";

type Props = {
  initialBlock?: CmsBlock;
};

function mapSoveGroupToThreeHoverZones(block?: CmsBlock) {
  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              label?: string | null;
              value?: string | null;
              title?: string | null;
              subtitle?: string | null;
            }>;
          }
        ).items
      : [];

  const zones = contentItems.length
    ? contentItems.map((item) => ({
        title: item.label || item.title || "",
        text: item.value || item.subtitle || "",
      }))
    : [
        { title: "Современный дизайн", text: "Наши дизайнеры создают концепции..." },
        { title: "Профессиональное\nуправление", text: "Берём на себя процесс..." },
        { title: "Гарантированная ROI", text: "Работаем на результат..." },
      ];

  const firstMedia = Array.isArray(block?.media) ? block?.media?.[0] : undefined;
  const imageSrc = (firstMedia ? getCmsMediaUrl(firstMedia) : null) || "/images/hero.jpg";

  return { zones, imageSrc };
}

export function SoveGroupLiveSection({ initialBlock }: Props) {
  const block = usePublishedHomepageBlock({
    blockType: "sove_group:main",
    initialBlock,
    refreshIntervalMs: 4000,
  });

  const mapped = mapSoveGroupToThreeHoverZones(block);

  return (
    <div className="bg-white">
      <div className="flex justify-center pt-10 pb-6">
        <Image
          src="/logo_dark.svg"
          alt="SOVE GROUP"
          width={443}
          height={42}
          priority
          className="opacity-90"
        />
      </div>

      <ThreeHoverZones imageSrc={mapped.imageSrc} zones={mapped.zones} />
    </div>
  );
}

