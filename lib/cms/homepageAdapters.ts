import type { CmsHeroBlock, CmsMetricsBlock, CmsMetricsContent } from "./types";
import { getCmsMediaUrl } from "./mediaUrl";
import type {
  HeroBlockData,
  MetricsBlockData,
  TextButtonBlockData,
  FeaturedSelectionBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

// ==============================
// Hero
// ==============================

export function mapHeroBlockToAdmin(block?: CmsHeroBlock): HeroBlockData {
  return {
    mediaId: block?.media?.[0]?.id || undefined,
    title: block?.title || "",
    description: block?.text || "",
    videoName: block?.media?.[0]?.file_name || "Видео.mp4",
    videoPreview: getCmsMediaUrl(block?.media?.[0]),
    primaryButtonLabel: block?.primary_button_label || "",
    secondaryButtonLabel: block?.secondary_button_label || "",
  };
}

export function mapHeroAdminToPatch(data: HeroBlockData) {
  return {
    title: data.title,
    text: data.description,
    primary_button_label: data.primaryButtonLabel,
    secondary_button_label: data.secondaryButtonLabel,
  };
}

// ==============================
// Metrics
// ==============================

function getMetricsFallbackPreview(index: number) {
  return index % 2 === 0 ? "/images/statsimg1.jpg" : "/images/statsimg2.jpg";
}

export function mapMetricsBlockToAdmin(
  block?: CmsMetricsBlock,
): MetricsBlockData {
  const content = block?.content as CmsMetricsContent | null;
  const items = content?.items || [];
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  return {
    items: items.map((item, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      label: `Карточка ${index + 1}`,
      title: item.label,
      value: item.value,
      fileName: "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || getMetricsFallbackPreview(index),
      fileName: media[index]?.file_name || `stats-image-${(index % 2) + 1}.jpg`,
    })),
  };
}

export function mapMetricsAdminToPatch(data: MetricsBlockData) {
  return {
    content: {
      items: data.items.map((item) => ({
        label: item.title,
        value: item.value,
      })),
    },
  };
}

import type { CmsBlock, CmsButton } from "./types";
import type { RepeatableFeatureBlockData } from "@/app/(admin)/admin/content-tools/home/types";

export function mapDoItWithSoveBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const fallbackTexts = [
    "Стратегия флип",
    "Концептуальный ремонт",
    "Стратегия аренда",
    "Подбор объекта",
  ];

  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: !block?.button
      ? "Попробовать"
      : Array.isArray(block.button)
        ? block.button[0]?.name || "Попробовать"
        : block.button.name || "Попробовать",
    items: fallbackTexts.map((text, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      text,
    })),
  };
}
// ==============================
// Capitalized Text
// ==============================

export function mapCapitalizedTextBlockToAdmin(
  block?: CmsBlock,
): TextButtonBlockData {
  const button = Array.isArray(block?.button)
    ? block.button[0]
    : block?.button || null;

  return {
    text: block?.text || "",
    buttonLabel: button?.name || "Посмотри наши кейсы",
  };
}

export function mapCapitalizedTextAdminToPatch(data: TextButtonBlockData) {
  return {
    text: data.text,
    button: {
      name: data.buttonLabel,
      position: 0,
    },
  };
}

export function mapDoItYourselfBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const fallbackTexts = ["Сценарий 1", "Сценарий 2", "Сценарий 3"];

  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: !block?.button
      ? "Начать"
      : Array.isArray(block.button)
        ? block.button[0]?.name || "Начать"
        : block.button.name || "Начать",
    items: fallbackTexts.map((text, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      text,
    })),
  };
}

export function mapDiyAdminToPatch(data: RepeatableFeatureBlockData) {
  return {
    title: data.title,
    text: data.description,
    button: {
      name: data.buttonLabel,
      position: 0,
    },
  };
}

export function mapFeaturedBlockToAdmin(
  block: CmsBlock | undefined,
  fallbackItems: FeaturedSelectionBlockData["items"],
): FeaturedSelectionBlockData {
  const selectedIds =
    block?.content &&
    typeof block.content === "object" &&
    "ids" in block.content &&
    Array.isArray((block.content as { ids?: number[] }).ids)
      ? (block.content as { ids: number[] }).ids
      : [];

  return {
    title: block?.title || "",
    subtitle: block?.subtitle || "",
    items: fallbackItems.map((item) => ({
      ...item,
      checked: selectedIds.includes(item.id),
    })),
  };
}

export function mapFeaturedAdminToPatch(data: FeaturedSelectionBlockData) {
  return {
    title: data.title,
    subtitle: data.subtitle,
    content: {
      ids: data.items.filter((item) => item.checked).map((item) => item.id),
    },
  };
}

export function mapManagePropertyToClient(block: CmsBlock) {
  return {
    title: block.title || "",
    subtitle: block.text || "",
    items:
      block.media?.map((m, index) => ({
        id: String(m.id || index),
        imageSrc: getCmsMediaUrl(m) || "/images/hero.jpg",
        imageAlt: m.file_name || "image",
        caption: m.caption || "",
      })) || [],
  };
}

export function mapDiyBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: Array<{ text?: string }> }).items)
      ? (block.content as { items: Array<{ text?: string }> }).items
      : [];

  const fallbackTexts = ["Сценарий 1", "Сценарий 2", "Сценарий 3"];

  const maxLength = Math.max(
    contentItems.length,
    media.length,
    fallbackTexts.length,
  );

  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: !block?.button
      ? "Начать"
      : Array.isArray(block.button)
        ? block.button[0]?.name || "Начать"
        : block.button.name || "Начать",
    items: Array.from({ length: maxLength }).map((_, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      text: contentItems[index]?.text || fallbackTexts[index] || "",
    })),
  };
}