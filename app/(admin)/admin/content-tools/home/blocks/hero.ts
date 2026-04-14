import type { HeroBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import type { CmsHeroBlock } from "@/lib/cms/types";
import { mapHeroBlockToAdmin, mapHeroAdminToPatch } from "@/lib/cms/homepageAdapters";

export const HERO_BLOCK_TYPE = "ceiling:main";

export function hydrateHeroBlock(block?: CmsHeroBlock | null): HeroBlockData {
  return mapHeroBlockToAdmin(block || undefined);
}

export function buildHeroPatch(data: HeroBlockData) {
  return mapHeroAdminToPatch(data) as Record<string, unknown>;
}

export function buildHeroMediaPatches(nextMediaIds: number[]) {
  const firstMediaId = nextMediaIds[0];

  return [
    { media_ids: nextMediaIds },
    { media_id: firstMediaId ?? null },
    {
      media: firstMediaId ? [{ id: firstMediaId, position: 0 }] : [],
    },
  ] as Record<string, unknown>[];
}

