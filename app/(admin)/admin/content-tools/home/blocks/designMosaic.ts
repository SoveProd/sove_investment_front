import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import type { DesignMosaicBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialDesignMosaicBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const DESIGN_MOSAIC_BLOCK_TYPE = "end_to_end_investment:main";

export function hydrateDesignMosaicBlock(block?: CmsBlock | null): DesignMosaicBlockData {
  if (!block) return initialDesignMosaicBlock;

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{ title?: string | null; text?: string | null }>;
          }
        ).items
      : [];

  const media = [...(Array.isArray(block.media) ? (block.media as CmsMedia[]) : [])].sort(
    (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER),
  );

  const maxLength = Math.max(contentItems.length, media.length, 4);

  return {
    title: block.title || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        title: contentItem?.title || "",
        description: contentItem?.text || "",
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

export function buildDesignMosaicPatches(block: DesignMosaicBlockData) {
  const mediaIds = block.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  const basePatch = {
    title: block.title,
    content: {
      items: block.items.map((item) => ({
        title: item.title,
        subtitle: item.description,
        text: item.description,
      })),
    },
  };

  return [
    {
      ...basePatch,
      media_ids: mediaIds,
    },
    {
      ...basePatch,
      media: positionedMedia,
    },
  ] as Record<string, unknown>[];
}

