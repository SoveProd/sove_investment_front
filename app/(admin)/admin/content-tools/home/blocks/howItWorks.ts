import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import type { HowItWorksBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialHowItWorksBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const HOW_IT_WORKS_BLOCK_TYPE = "how_it_works:main";

export function hydrateHowItWorksBlock(block?: CmsBlock | null): HowItWorksBlockData {
  if (!block) return initialHowItWorksBlock;

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              title?: string | null;
              subtitle?: string | null;
              text?: string | null;
              button?: string | null;
            }>;
          }
        ).items
      : [];

  const media = [...(Array.isArray(block.media) ? (block.media as CmsMedia[]) : [])].sort(
    (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER),
  );

  const maxLength = Math.max(contentItems.length, media.length, 4);

  return {
    title: block.title || "",
    subtitle: block.subtitle || block.text || "",
    steps: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        stepLabel: contentItem?.title || "",
        title: contentItem?.subtitle || "",
        shortDescription: contentItem?.text || "",
        buttonLabel: contentItem?.button || "",
        fileName: mediaItem?.file_name || "Фото.jpeg",
        preview:
          mediaItem?.url ||
          mediaItem?.large_url ||
          mediaItem?.thumbnail_url ||
          undefined,
        mediaId: mediaItem?.id,
      };
    }),
  };
}

export function buildHowItWorksPatches(block: HowItWorksBlockData) {
  const mediaIds = block.steps
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.steps
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  const contentPatch = {
    content: {
      items: block.steps.map((step) => ({
        title: step.stepLabel,
        subtitle: step.title,
        text: step.shortDescription,
        button: step.buttonLabel,
      })),
    },
  };

  const basePatchA = {
    title: block.title,
    subtitle: block.subtitle,
    ...contentPatch,
  };

  const basePatchB = {
    title: block.title,
    text: block.subtitle,
    ...contentPatch,
  };

  return [
    {
      ...basePatchA,
      media_ids: mediaIds,
    },
    {
      ...basePatchA,
      media: positionedMedia,
    },
    {
      ...basePatchB,
      media_ids: mediaIds,
    },
    {
      ...basePatchB,
      media: positionedMedia,
    },
  ] as Record<string, unknown>[];
}

