import type { CmsBlock } from "@/lib/cms/types";
import type { ReviewsBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import { initialReviewsBlock } from "@/app/(admin)/admin/content-tools/home/defaults";

export const REVIEWS_BLOCK_TYPE = "reviews:main";

export function hydrateReviewsBlock(block?: CmsBlock | null): ReviewsBlockData {
  if (!block) return initialReviewsBlock;

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              author?: string | null;
              text?: string | null;
              rating?: number | null;
              date?: string | null;
              url?: string | null;
            }>;
          }
        ).items
      : [];

  const maxLength = Math.max(contentItems.length, 3);

  return {
    title: block.title || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const item = contentItems[index];
      return {
        id: index + 1,
        author: item?.author || "",
        text: item?.text || "",
        rating: typeof item?.rating === "number" ? item.rating : 5,
        date: item?.date || "",
        url: item?.url || "",
      };
    }),
  };
}

export function buildReviewsPatches(block: ReviewsBlockData) {
  return [
    {
      title: block.title,
      content: {
        items: block.items.map((item) => ({
          author: item.author,
          text: item.text,
          rating: item.rating,
          date: item.date,
          url: item.url || null,
        })),
      },
    },
  ] as Record<string, unknown>[];
}

