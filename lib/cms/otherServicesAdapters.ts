import type { CmsBlock, CmsMedia } from "./types";
import { getCmsMediaUrl } from "./mediaUrl";
import type {
  OtherServicesBlockData,
  OtherServicesItemData,
} from "@/app/(admin)/admin/content-tools/service-packages/types";

type OtherServicesContent = {
  items?: Array<{
    // New API shape (required by backend validation)
    label?: string | null;
    description?: string | null;
    button?: string | null;

    // Legacy shape (keep for backward compatibility)
    title?: string | null;
    subtitle?: string | null;
    button_label?: string | null;
    href?: string | null;
  }>;
};

function sortMedia(media: CmsMedia[] | undefined) {
  return [...(media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });
}

const DEFAULT_ITEMS: OtherServicesItemData[] = [
  { id: 1, title: "", subtitle: "", buttonLabel: "Попробовать", href: "/objects" },
  { id: 2, title: "", subtitle: "", buttonLabel: "Попробовать", href: "/community" },
  { id: 3, title: "", subtitle: "", buttonLabel: "Попробовать", href: "/concepts" },
];

export function mapOtherServicesBlockToAdmin(block?: CmsBlock): OtherServicesBlockData {
  const content =
    block?.content && typeof block.content === "object"
      ? (block.content as OtherServicesContent)
      : null;

  const itemsFromCms = Array.isArray(content?.items) ? content?.items : [];
  const items: OtherServicesItemData[] = Array.from({
    length: Math.max(itemsFromCms.length, 3),
  }).map((_, idx) => {
    const fallback = DEFAULT_ITEMS[idx] || {
      id: idx + 1,
      title: "",
      subtitle: "",
      buttonLabel: "Попробовать",
      href: "/homepage",
    };
    const cmsItem = itemsFromCms[idx];
    return {
      id: idx + 1,
      title: cmsItem?.label || cmsItem?.title || fallback.title,
      subtitle: cmsItem?.description || cmsItem?.subtitle || fallback.subtitle,
      buttonLabel:
        cmsItem?.button_label || fallback.buttonLabel,
      href: cmsItem?.button || cmsItem?.href || fallback.href,
    };
  });

  const media = sortMedia(block?.media);
  const hero = media[0];

  return {
    title: block?.title || "",
    mediaId: hero?.id,
    fileName: hero?.file_name || "",
    preview: getCmsMediaUrl(hero),
    items,
  };
}

export function mapOtherServicesAdminToPatch(data: OtherServicesBlockData) {
  return {
    title: data.title,
    content: {
      items: data.items.map((it) => ({
        label: it.title,
        description: it.subtitle,
        // Backend expects a string here (see 422 validation errors)
        button: it.href,
      })),
    },
  } as Record<string, unknown>;
}

