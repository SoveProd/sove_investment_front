import type { CmsBlock } from "./types";
import type { QnaBlockData } from "@/app/(admin)/admin/content-tools/service-packages/types";
import type { FaqItem } from "@/src/components/sections/PackagesFaq/PackagesFaqClient";

type QnaItemRow = {
  /** API (Pydantic) */
  q?: string | null;
  a?: string | null;
  /** Legacy / admin UI */
  question?: string | null;
  answer?: string | null;
};

function parseBlockContent(
  content: CmsBlock["content"],
): Record<string, unknown> | null {
  if (content == null) return null;
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as unknown;
      return typeof parsed === "object" && parsed !== null
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  }
  if (typeof content === "object") {
    return content as Record<string, unknown>;
  }
  return null;
}

/** API иногда отдаёт не массив: один объект, dict по ключам, и т.п. */
function coerceQnaItems(raw: unknown): QnaItemRow[] {
  if (raw == null) return [];

  // Частый кейс: передали весь content `{ id, items: [...] }` вместо массива
  if (typeof raw === "object" && !Array.isArray(raw) && "items" in raw) {
    return coerceQnaItems((raw as { items: unknown }).items);
  }

  if (Array.isArray(raw)) {
    return raw
      .map((x): QnaItemRow | null => {
        if (x == null) return null;
        if (typeof x === "string") return { q: x, a: "" };
        if (typeof x === "object") return x as QnaItemRow;
        return null;
      })
      .filter((x): x is QnaItemRow => x != null);
  }

  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    if ("q" in o || "question" in o || "a" in o || "answer" in o) {
      return [o as QnaItemRow];
    }
    const vals = Object.values(o).filter(
      (v): v is QnaItemRow =>
        v != null && typeof v === "object" && !Array.isArray(v),
    );
    if (vals.length) return vals;
  }
  return [];
}

function strField(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  return String(v).trim();
}

export function mapQnaBlockToAdmin(block?: CmsBlock): QnaBlockData {
  const contentObj = parseBlockContent(block?.content ?? null);
  const items = coerceQnaItems(contentObj?.items);

  return {
    items: Array.from({ length: Math.max(items.length, 3) }).map((_, idx) => {
      const it = items[idx];
      return {
        id: idx + 1,
        question: strField(it?.q ?? it?.question),
        answer: strField(it?.a ?? it?.answer),
      };
    }),
  };
}

export function mapQnaAdminToPatch(data: QnaBlockData) {
  return {
    content: {
      items: data.items.map((it) => ({
        q: it.question,
        a: it.answer,
      })),
    },
  } as Record<string, unknown>;
}

export function mapQnaBlockToFaqItems(block?: CmsBlock): FaqItem[] | undefined {
  const contentObj = parseBlockContent(block?.content ?? null);
  const items = coerceQnaItems(contentObj?.items);
  const normalized = items
    .map((it, idx) => ({
      id: `qna-${idx + 1}`,
      question: strField(it?.q ?? it?.question),
      answer: strField(it?.a ?? it?.answer),
    }))
    // Показываем все пары, где задан вопрос. Раньше требовали и ответ —
    // из‑за этого часть пунктов из CMS пропадала на сайте.
    .filter((it) => it.question.length > 0);

  return normalized.length ? normalized : undefined;
}

