import type { MetricsBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import type { CmsMetricsBlock, CmsMedia } from "@/lib/cms/types";
import { mapMetricsBlockToAdmin, mapMetricsAdminToPatch } from "@/lib/cms/homepageAdapters";

export const METRICS_BLOCK_TYPE = "metrics:main";

export function hydrateMetricsBlock(block?: CmsMetricsBlock | null): MetricsBlockData {
  return mapMetricsBlockToAdmin(block || undefined);
}

export function buildMetricsPatch(data: MetricsBlockData) {
  return mapMetricsAdminToPatch(data) as Record<string, unknown>;
}

export function buildMetricsMediaPatches(data: MetricsBlockData) {
  const mediaIds = data.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = data.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  const basePatch = buildMetricsPatch(data);

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

export function sortMediaByPosition(media: CmsMedia[]) {
  return [...media].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });
}

