import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import type { MediaTextCardsBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialManagePropertyBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const MANAGE_PROPERTY_BLOCK_TYPE = "manage_your_property:main";

export function hydrateManagePropertyBlock(block?: CmsBlock | null): MediaTextCardsBlockData {
  if (!block) return initialManagePropertyBlock;

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{ title?: string; subtitle?: string }>;
          }
        ).items
      : [];

  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];
  const maxLength = Math.max(contentItems.length, media.length, 0);

  if (maxLength === 0) {
    return {
      ...initialManagePropertyBlock,
      title: block.title || initialManagePropertyBlock.title,
      description: block.text || initialManagePropertyBlock.description,
      items: initialManagePropertyBlock.items,
    };
  }

  return {
    title: block.title || "",
    description: block.text || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        title: contentItem?.title || "",
        subtitle: contentItem?.subtitle || "",
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

export function buildManagePropertyPatches(block: MediaTextCardsBlockData) {
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
    text: block.description,
    content: {
      items: block.items.map((item) => ({
        title: item.title,
        subtitle: item.subtitle,
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

