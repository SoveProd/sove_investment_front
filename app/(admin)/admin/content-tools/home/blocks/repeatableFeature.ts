import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import type { CmsBlock } from "@/lib/cms/types";
import {
  mapDoItWithSoveBlockToAdmin,
  mapDiyBlockToAdmin,
} from "@/lib/cms/homepageAdapters";

export const MAKE_WITH_SOVE_BLOCK_TYPE = "do_it_with_sove:main";
export const DIY_BLOCK_TYPE = "diy:main";

export function hydrateMakeWithSoveBlock(block?: CmsBlock | null): RepeatableFeatureBlockData {
  return mapDoItWithSoveBlockToAdmin(block || undefined);
}

export function hydrateDiyBlock(block?: CmsBlock | null): RepeatableFeatureBlockData {
  return mapDiyBlockToAdmin(block || undefined);
}

export function buildRepeatableFeaturePatches(block: RepeatableFeatureBlockData) {
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
    button: {
      name: block.buttonLabel,
      position: 0,
    },
    content: {
      items: block.items.map((item) => ({
        text: item.text,
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

