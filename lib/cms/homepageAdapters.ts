import type { CmsHeroBlock, CmsMetricsBlock, CmsMetricsContent } from "./types";
import type {
  HeroBlockData,
  MetricsBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

// ==============================
// Hero
// ==============================

export function mapHeroBlockToAdmin(block?: CmsHeroBlock): HeroBlockData {
  return {
    title: block?.title || "",
    description: block?.text || "",
    videoName: block?.media?.[0]?.file_name || "Видео.mp4",
    videoPreview: block?.media?.[0]?.file_url || undefined,
  };
}

export function mapHeroAdminToPatch(data: HeroBlockData) {
  return {
    title: data.title,
    text: data.description,
  };
}

// ==============================
// Metrics
// ==============================

export function mapMetricsBlockToAdmin(
  block?: CmsMetricsBlock,
): MetricsBlockData {
  const content = block?.content as CmsMetricsContent | null;
  const items = content?.items || [];

  return {
    items: items.map((item, index) => ({
      id: index + 1,
      label: `Карточка ${index + 1}`,
      title: item.label,
      value: item.value,
      fileName: "Фото.jpeg",
      preview: undefined,
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
  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: !block?.button
      ? "Попробовать"
      : Array.isArray(block.button)
        ? block.button[0]?.name || "Попробовать"
        : block.button.name || "Попробовать",
    items: [
      {
        id: 1,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Стратегия флип",
      },
      {
        id: 2,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Концептуальный ремонт",
      },
      {
        id: 3,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Стратегия аренда",
      },
      {
        id: 4,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Подбор объекта",
      },
    ],
  };
}

export function mapDoItWithSoveAdminToPatch(data: RepeatableFeatureBlockData) {
  return {
    title: data.title,
    text: data.description,
    button: {
      name: data.buttonLabel,
      position: 0,
    },
  };
}

export function mapDiyBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: !block?.button
      ? "Начать"
      : Array.isArray(block.button)
        ? block.button[0]?.name || "Начать"
        : block.button.name || "Начать",
    items: [
      {
        id: 1,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Сценарий 1",
      },
      {
        id: 2,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Сценарий 2",
      },
      {
        id: 3,
        fileName: "Фото.jpeg",
        preview: undefined,
        text: "Сценарий 3",
      },
    ],
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