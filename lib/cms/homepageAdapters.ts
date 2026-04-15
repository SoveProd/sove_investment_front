import type {
  CmsHeroBlock,
  CmsMetricsBlock,
  CmsMetricsContent,
  CmsBlock,
} from "./types";
import { getCmsMediaUrl } from "./mediaUrl";
import type {
  HeroBlockData,
  MetricsBlockData,
  TextButtonBlockData,
  FeaturedSelectionBlockData,
  RepeatableFeatureBlockData,
  MediaTextCardsBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

// ==============================
// Hero
// ==============================

export function mapHeroBlockToAdmin(block?: CmsHeroBlock): HeroBlockData {
  const buttons = Array.isArray(block?.button)
    ? block.button
    : block?.button
      ? [block.button]
      : [];

  const primaryFromButtons = buttons.find((btn) => btn.position === 0)?.name || "";
  const secondaryFromButtons = buttons.find((btn) => btn.position === 1)?.name || "";

  return {
    mediaId: block?.media?.[0]?.id || undefined,
    title: block?.title || "",
    description: block?.text || "",
    videoName: block?.media?.[0]?.file_name || "Видео.mp4",
    videoPreview: getCmsMediaUrl(block?.media?.[0]),
    primaryButtonLabel: block?.primary_button_label || primaryFromButtons,
    secondaryButtonLabel: block?.secondary_button_label || secondaryFromButtons,
  };
}

export function mapHeroAdminToPatch(data: HeroBlockData) {
  return {
    title: data.title,
    text: data.description,
    button: [
      { name: data.primaryButtonLabel, position: 0 },
      { name: data.secondaryButtonLabel, position: 1 },
    ].filter((btn) => Boolean(btn.name?.trim())),
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
      title: item.label ?? "",
      value: item.value ?? "",
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

// ==============================
// Repeatable helpers
// ==============================

function getButtonLabel(button: CmsBlock["button"], fallback: string): string {
  if (!button) return fallback;
  if (Array.isArray(button)) return button[0]?.name || fallback;
  return button.name || fallback;
}

// ==============================
// Do it with SOVE
// ==============================

export function mapDoItWithSoveBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    if (aPos !== bPos) return aPos - bPos;
    // If backend keeps multiple media with same position, prefer the newest one.
    return (b.id ?? 0) - (a.id ?? 0);
  });

  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: Array<{ text?: string }> }).items)
      ? (block.content as { items: Array<{ text?: string }> }).items
      : [];

  const fallbackTexts = [
    "Стратегия флип",
    "Концептуальный ремонт",
    "Стратегия аренда",
    "Подбор объекта",
  ];

  const maxLength = Math.max(
    contentItems.length,
    fallbackTexts.length,
  );

  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: getButtonLabel(block?.button ?? null, "Попробовать"),
    items: Array.from({ length: maxLength }).map((_, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      text: contentItems[index]?.text || fallbackTexts[index] || "",
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

  const content =
    block?.content && typeof block.content === "object" ? block.content : null;

  // Preferred backend format:
  // content: { grey_1: string, dark: string, grey_2: string }
  const backendParts = content
    ? {
        grayTextTop:
          "grey_1" in content && typeof content.grey_1 === "string"
            ? content.grey_1
            : "",
        blackTextMain:
          "dark" in content && typeof content.dark === "string"
            ? content.dark
            : "",
        grayTextBottom:
          "grey_2" in content && typeof content.grey_2 === "string"
            ? content.grey_2
            : "",
      }
    : null;

  // Legacy format we previously wrote:
  // content: { accent_text: { grayTop, blackMain, grayBottom } }
  const legacyParts =
    content &&
    "accent_text" in content &&
    content.accent_text &&
    typeof content.accent_text === "object"
      ? (content.accent_text as {
          grayTop?: unknown;
          blackMain?: unknown;
          grayBottom?: unknown;
        })
      : null;

  const fromContent =
    backendParts &&
    (backendParts.grayTextTop || backendParts.blackTextMain || backendParts.grayTextBottom)
      ? backendParts
      : legacyParts
        ? {
            grayTextTop:
              typeof legacyParts.grayTop === "string" ? legacyParts.grayTop : "",
            blackTextMain:
              typeof legacyParts.blackMain === "string"
                ? legacyParts.blackMain
                : "",
            grayTextBottom:
              typeof legacyParts.grayBottom === "string"
                ? legacyParts.grayBottom
                : "",
          }
        : null;

  const rawText = block?.text || "";

  const splitLegacy = (raw: string) => {
    const text = (raw || "").trim();
    if (!text) return { primary: "", secondary: "" };
    if (text.includes("||")) {
      const [primary, ...rest] = text.split("||");
      return {
        primary: (primary || "").trim(),
        secondary: rest.join("||").trim(),
      };
    }
    const sentences = text.split(/(?<=[.!?])\s+/);
    return {
      primary: sentences.slice(0, 2).join(" ").trim(),
      secondary: sentences.slice(2).join(" ").trim(),
    };
  };

  const legacy = splitLegacy(rawText);

  return {
    grayTextTop: fromContent?.grayTextTop || "",
    blackTextMain: fromContent?.blackTextMain || legacy.primary || rawText,
    grayTextBottom: fromContent?.grayTextBottom || legacy.secondary || "",
    buttonLabel: button?.name || "Посмотри наши кейсы",
  };
}

export function mapCapitalizedTextAdminToPatch(data: TextButtonBlockData) {
  const grayTop = (data.grayTextTop || "").trim();
  const blackMain = (data.blackTextMain || "").trim();
  const grayBottom = (data.grayTextBottom || "").trim();

  const combinedText = [grayTop, blackMain, grayBottom].filter(Boolean).join(" ");

  return {
    text: combinedText,
    content: {
      // Backend-agreed structure
      grey_1: data.grayTextTop,
      dark: data.blackTextMain,
      grey_2: data.grayTextBottom,
    },
    button: {
      name: data.buttonLabel,
      position: 0,
    },
  };
}

// ==============================
// DIY
// ==============================

export function mapDiyBlockToAdmin(
  block?: CmsBlock,
): RepeatableFeatureBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    if (aPos !== bPos) return aPos - bPos;
    // If backend keeps multiple media with same position, prefer the newest one.
    return (b.id ?? 0) - (a.id ?? 0);
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
    fallbackTexts.length,
  );

  return {
    title: block?.title || "",
    description: block?.text || "",
    buttonLabel: getButtonLabel(block?.button ?? null, "Начать"),
    items: Array.from({ length: maxLength }).map((_, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      text: contentItems[index]?.text || fallbackTexts[index] || "",
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

// ==============================
// Featured blocks
// ==============================

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

  // If we don't yet have a fallback list (e.g. first load),
  // preserve the selection by creating placeholder items from selected ids.
  const baseItems =
    fallbackItems.length > 0
      ? fallbackItems
      : selectedIds.map((id) => ({ id, label: `Элемент #${id}`, checked: true }));

  return {
    title: block?.title || "",
    subtitle: block?.subtitle || "",
    items: baseItems.map((item) => ({
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

// ==============================
// Manage Property client
// ==============================

export function mapManagePropertyToClient(block: CmsBlock) {
  const content =
    block.content && typeof block.content === "object"
      ? (block.content as CmsManagePropertyContent)
      : null;

  const contentItems = Array.isArray(content?.items) ? content.items : [];

  const media = [...(block.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const maxLength = Math.max(media.length, contentItems.length, 3);

  return {
    title: block.title || "",
    subtitle: block.text || "",
    items:
      Array.from({ length: maxLength }).map((_, index) => {
        const m = media[index];
        const c = contentItems[index];

        return {
          id: String(m?.id ?? index),
          imageSrc: (m ? getCmsMediaUrl(m) : null) || "/images/hero.jpg",
          imageAlt: c?.subtitle || m?.file_name || "image",
          caption: c?.title || m?.caption || "",
          description: c?.subtitle || "",
        };
      }) || [],
  };
}

// ==============================
// Manage Property admin
// ==============================

type CmsManagePropertyContentItem = {
  title?: string;
  subtitle?: string;
};

type CmsManagePropertyContent = {
  items?: CmsManagePropertyContentItem[];
};

export function mapManagePropertyBlockToAdmin(
  block?: CmsBlock,
): MediaTextCardsBlockData {
  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const content =
    block?.content && typeof block.content === "object"
      ? (block.content as CmsManagePropertyContent)
      : null;

  const contentItems = Array.isArray(content?.items) ? content.items : [];

  const maxLength = Math.max(media.length, contentItems.length, 3);

  return {
    title: block?.title || "",
    description: block?.text || "",
    items: Array.from({ length: maxLength }).map((_, index) => ({
      id: index + 1,
      mediaId: media[index]?.id || undefined,
      fileName: media[index]?.file_name || "Фото.jpeg",
      preview: getCmsMediaUrl(media[index]) || undefined,
      title: contentItems[index]?.title || "",
      subtitle: contentItems[index]?.subtitle || "",
    })),
  };
}

export function mapManagePropertyAdminToPatch(data: MediaTextCardsBlockData) {
  return {
    title: data.title,
    text: data.description,
    content: {
      items: data.items.map((item) => ({
        title: item.title,
        subtitle: item.subtitle,
      })),
    },
  };
}
