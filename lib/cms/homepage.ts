import {
  CmsStaticPage,
  CmsBlock,
  CmsHeroBlock,
  CmsMetricsBlock,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

// ==============================
// Получение homepage
// ==============================
export async function getPublishedHomepage(): Promise<CmsStaticPage | null> {
  try {
    const response = await fetch(`${API_BASE}/static-pages/homepage`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-client-type": "web",
      },
      // Important: `router.refresh()` should see fresh CMS content immediately.
      // If you need CDN-level caching, do it at the API layer instead.
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch homepage", response.status);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Homepage fetch error", error);
    return null;
  }
}

// ==============================
// Helpers
// ==============================
export function findBlockByType<T extends CmsBlock>(
  blocks: CmsBlock[],
  blockType: string,
): T | undefined {
  return blocks.find((block) => block.block_type === blockType) as
    | T
    | undefined;
}

export function getHomepageHeroBlock(
  page: CmsStaticPage | null,
): CmsHeroBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsHeroBlock>(page.blocks, "ceiling:main");
}

export function getHomepageMetricsBlock(
  page: CmsStaticPage | null,
): CmsMetricsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsMetricsBlock>(page.blocks, "metrics:main");
}

export function getHomepageDoItWithSoveBlock(
  page: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, "do_it_with_sove:main");
}

export function getVisibleBlocks(
  blocks: CmsBlock[],
  client: "web" | "mobile" | "telegram" = "web",
) {
  return [...blocks]
    .filter((block) => block.display?.[client]?.is_visible)
    .sort((a, b) => {
      const aPos = a.display?.[client]?.position ?? Number.MAX_SAFE_INTEGER;
      const bPos = b.display?.[client]?.position ?? Number.MAX_SAFE_INTEGER;
      return aPos - bPos;
    });
}

export function getHomepageManagePropertyBlock(
  homepage: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!homepage) return undefined;

  return homepage.blocks.find(
    (block) => block.block_type === "manage_your_property:main",
  );
}

export function getHomepageDesignMosaicBlock(
  homepage: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!homepage) return undefined;

  return homepage.blocks.find(
    (block) => block.block_type === "end_to_end_investment:main",
  );
}

export function getHomepageHowItWorksBlock(
  homepage: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!homepage) return undefined;

  return homepage.blocks.find((block) => block.block_type === "how_it_works:main");
}
