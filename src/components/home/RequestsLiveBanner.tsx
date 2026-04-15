"use client";

import type { CmsBlock } from "@/lib/cms/types";
import { getCmsMediaUrl, isLikelyVideoUrl } from "@/lib/cms/mediaUrl";
import { CtaBanner } from "@/src/components/home/CtaBanner/CtaBanner";
import { usePublishedHomepageBlock } from "@/src/components/home/hooks/usePublishedHomepageBlock";

type Props = {
  initialBlock?: CmsBlock;
};

function getButtonLabel(block: CmsBlock | undefined, position: number) {
  const button = block?.button;
  const buttons = Array.isArray(button) ? button : button ? [button] : [];
  return buttons.find((b) => b.position === position)?.name || undefined;
}

export function RequestsLiveBanner({ initialBlock }: Props) {
  const block = usePublishedHomepageBlock({
    blockType: "requests:main",
    initialBlock,
    refreshIntervalMs: 0,
  });

  const cmsBgSrc = block?.media?.[0] ? getCmsMediaUrl(block.media[0]) || undefined : undefined;
  const bgSrc = cmsBgSrc && !isLikelyVideoUrl(cmsBgSrc) ? cmsBgSrc : undefined;

  return (
    <CtaBanner
      title={block?.title || undefined}
      bgSrc={bgSrc}
      primaryButtonLabel={getButtonLabel(block, 0)}
      secondaryButtonLabel={block?.subtitle || undefined}
    />
  );
}

