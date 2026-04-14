import type { CmsBlock, CmsMedia } from "@/lib/cms/types";
import type { RequestsBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialRequestsBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const REQUESTS_BLOCK_TYPE = "requests:main";

export function hydrateRequestsBlock(block?: CmsBlock | null): RequestsBlockData {
  if (!block) return initialRequestsBlock;

  const button = Array.isArray(block.button) ? block.button[0] : block.button;
  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];
  const firstMedia = media[0];

  return {
    title: block.title || "",
    primaryButtonLabel: button?.name || "",
    secondaryButtonLabel: block.subtitle || "",
    mediaId: firstMedia?.id,
    fileName: firstMedia?.file_name || "Фото.jpeg",
    preview:
      firstMedia?.url ||
      firstMedia?.large_url ||
      firstMedia?.thumbnail_url ||
      undefined,
  };
}

export function buildRequestsPatches(block: RequestsBlockData) {
  const mediaIds =
    typeof block.mediaId === "number" ? ([block.mediaId] as number[]) : [];

  const basePatch = {
    title: block.title,
    subtitle: block.secondaryButtonLabel,
    button: {
      name: block.primaryButtonLabel,
      position: 0,
    },
  };

  return [
    {
      ...basePatch,
      media_ids: mediaIds,
    },
    {
      ...basePatch,
      media:
        typeof block.mediaId === "number" ? [{ id: block.mediaId, position: 0 }] : [],
    },
  ] as Record<string, unknown>[];
}

