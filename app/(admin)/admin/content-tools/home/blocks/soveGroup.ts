import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import type { SoveGroupBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialSoveGroupBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const SOVE_GROUP_BLOCK_TYPE = "sove_group:main";

export function hydrateSoveGroupBlock(block?: CmsBlock | null): SoveGroupBlockData {
  if (!block) return initialSoveGroupBlock;

  const contentItems =
    block.content &&
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

  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];
  const firstMedia = media[0];

  const zones = Array.from({ length: Math.max(contentItems.length, 3) }).map(
    (_, index) => {
      const item = contentItems[index];
      return {
        id: index + 1,
        title: item?.label || item?.title || "",
        subtitle: item?.value || item?.subtitle || "",
      };
    },
  );

  return {
    zones,
    mediaId: firstMedia?.id,
    fileName: firstMedia?.file_name || "Фото.jpeg",
    preview:
      firstMedia?.url ||
      firstMedia?.large_url ||
      firstMedia?.thumbnail_url ||
      undefined,
  };
}

export function buildSoveGroupPatches(block: SoveGroupBlockData) {
  const contentPatch = {
    content: {
      items: block.zones.map((zone) => ({
        label: zone.title,
        value: zone.subtitle,
      })),
    },
  };

  const mediaIds =
    typeof block.mediaId === "number" ? ([block.mediaId] as number[]) : [];

  return [
    {
      ...contentPatch,
      media_ids: mediaIds,
    },
    {
      ...contentPatch,
      media: typeof block.mediaId === "number" ? [{ id: block.mediaId, position: 0 }] : [],
    },
  ] as Record<string, unknown>[];
}

