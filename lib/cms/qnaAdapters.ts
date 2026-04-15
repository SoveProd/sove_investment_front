import type { CmsBlock } from "./types";
import type { QnaBlockData } from "@/app/(admin)/admin/content-tools/service-packages/types";
import type { FaqItem } from "@/src/components/sections/PackagesFaq/PackagesFaqClient";

type QnaContent = {
  items?: Array<{
    question?: string | null;
    answer?: string | null;
  }>;
};

export function mapQnaBlockToAdmin(block?: CmsBlock): QnaBlockData {
  const content =
    block?.content && typeof block.content === "object"
      ? (block.content as QnaContent)
      : null;

  const items = Array.isArray(content?.items) ? content?.items : [];

  return {
    items: Array.from({ length: Math.max(items.length, 3) }).map((_, idx) => {
      const it = items[idx];
      return {
        id: idx + 1,
        question: it?.question || "",
        answer: it?.answer || "",
      };
    }),
  };
}

export function mapQnaAdminToPatch(data: QnaBlockData) {
  return {
    content: {
      items: data.items.map((it) => ({
        question: it.question,
        answer: it.answer,
      })),
    },
  } as Record<string, unknown>;
}

export function mapQnaBlockToFaqItems(block?: CmsBlock): FaqItem[] | undefined {
  const content =
    block?.content && typeof block.content === "object"
      ? (block.content as QnaContent)
      : null;

  const items = Array.isArray(content?.items) ? content?.items : [];
  const normalized = items
    .map((it, idx) => ({
      id: `qna-${idx + 1}`,
      question: (it?.question || "").trim(),
      answer: (it?.answer || "").trim(),
    }))
    .filter((it) => it.question && it.answer);

  return normalized.length ? normalized : undefined;
}

