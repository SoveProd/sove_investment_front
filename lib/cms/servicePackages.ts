import type { CmsBlock, CmsStaticPage } from "./types";
import { getCmsMediaUrl } from "./mediaUrl";
import type { RequestsBlockData } from "@/app/(admin)/admin/content-tools/home/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

export async function getPublishedServicePackagesPage(): Promise<CmsStaticPage | null> {
  try {
    const response = await fetch(`${API_BASE}/static-pages/service_packages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-client-type": "web",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch service_packages page",
        response.status,
        await response.text().catch(() => ""),
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("service_packages fetch error", error);
    return null;
  }
}

export function findBlockByType<T extends CmsBlock>(
  blocks: CmsBlock[],
  blockType: string,
): T | undefined {
  return blocks.find((block) => block.block_type === blockType) as
    | T
    | undefined;
}

export function getServicePackagesHeaderBlock(
  page: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, "ceiling:pack");
}

export function getServicePackagesPackageBlock(
  page: CmsStaticPage | null,
  type: "s_package_1:pack" | "s_package_2:pack",
): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, type);
}

export function getServicePackagesOtherServicesBlock(
  page: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, "other_services:pack");
}

export function getServicePackagesQnaBlock(page: CmsStaticPage | null): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, "qna:pack");
}

export function getServicePackagesRequestsBlock(
  page: CmsStaticPage | null,
): CmsBlock | undefined {
  if (!page) return undefined;
  return findBlockByType<CmsBlock>(page.blocks, "last:pack");
}

type PackageBlockContent = {
  budget?: string | null;
  price_per_m2?: string | null;
  timeline?: string | null;
  roi?: string | null;
  included?: string[] | null;
  extra_services?: string[] | null;
};

function linesToArray(lines?: string[] | null) {
  return (lines || []).filter(Boolean);
}

function mediaByPosition(block: CmsBlock | undefined, position: number) {
  const sorted = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });
  return sorted[position];
}

export function mapPackageBlockToReadyConceptProps(block?: CmsBlock) {
  const content = (block?.content || null) as PackageBlockContent | null;

  const left = mediaByPosition(block, 0);
  const right = mediaByPosition(block, 1);

  const metrics = [
    { label: "Бюджет:", value: content?.budget || "" },
    { label: "Стоимость за м²:", value: content?.price_per_m2 || "" },
    { label: "Сроки цикла:", value: content?.timeline || "" },
    { label: "Средний ROI:", value: content?.roi || "" },
  ].filter((m) => (m.value || "").trim().length > 0);

  return {
    title: block?.title || "",
    description: block?.text || "",
    metricsTitle: "Параметры:",
    metrics,
    includedTitle: "Что включено",
    included: linesToArray(content?.included),
    alsoIncludedTitle: "Доп. услуги за доп. плату",
    alsoIncluded: linesToArray(content?.extra_services),
    primaryCtaLabel: "Выбрать пакет",
    primaryCtaHref: "/packages/select",
    secondaryCtaLabel: "Подробнее",
    secondaryCtaHref: "/packages",
    images: {
      left: {
        src: getCmsMediaUrl(left) || "/images/statsimg1.jpg",
        alt: left?.file_name || "Package image 1",
      },
      right: {
        src: getCmsMediaUrl(right) || "/images/statsimg1.jpg",
        alt: right?.file_name || "Package image 2",
      },
    },
  };
}

type OtherServicesContent = {
  items?: Array<{
    /** API / admin (new) */
    label?: string | null;
    description?: string | null;
    /** Often the link URL (string), not a nested object */
    button?: string | null;
    /** Legacy */
    title?: string | null;
    subtitle?: string | null;
    button_label?: string | null;
    href?: string | null;
  }>;
};

function otherServiceItemToZone(it: NonNullable<OtherServicesContent["items"]>[number]) {
  const title = (it.label ?? it.title ?? "").trim();
  const text = (it.description ?? it.subtitle ?? "").trim();
  const ctaHrefRaw =
    typeof it.button === "string" && it.button.trim()
      ? it.button.trim()
      : (it.href ?? "").trim();
  const ctaHref = ctaHrefRaw || "/homepage";
  const ctaLabel = (it.button_label ?? "").trim() || "Попробовать";
  return { title, text, ctaLabel, ctaHref };
}

export function mapOtherServicesToThreeHoverZones(block?: CmsBlock) {
  const content =
    block?.content && typeof block.content === "object"
      ? (block.content as OtherServicesContent)
      : null;

  const items = Array.isArray(content?.items) ? content?.items : [];

  const zones = Array.from({ length: Math.max(items.length, 3) }).map((_, i) => {
    const it = items[i];
    if (!it) {
      return {
        title: "",
        text: "",
        ctaLabel: "Попробовать",
        ctaHref: "/homepage",
      };
    }
    return otherServiceItemToZone(it);
  });

  const hero = mediaByPosition(block, 0);

  return {
    title: block?.title || "Другие наши услуги",
    imageSrc: getCmsMediaUrl(hero) || "/images/PageHero/packagesHero.png",
    zones,
  };
}

function getButtonLabel(block: CmsBlock | undefined, position: number) {
  const button = block?.button;
  const buttons = Array.isArray(button) ? button : button ? [button] : [];
  return buttons.find((b) => b.position === position)?.name || undefined;
}

export function mapRequestsPackToCtaProps(block?: CmsBlock) {
  const bgSrc = block?.media?.[0] ? getCmsMediaUrl(block.media[0]) : undefined;
  return {
    title: block?.title || undefined,
    bgSrc: bgSrc || undefined,
    primaryButtonLabel: getButtonLabel(block, 0),
    secondaryButtonLabel: block?.subtitle || undefined,
  };
}

export function hydrateRequestsPackToAdmin(block?: CmsBlock | null): RequestsBlockData {
  const firstMedia = Array.isArray(block?.media) ? block?.media?.[0] : undefined;
  const primary = getButtonLabel(block || undefined, 0) || "";
  return {
    title: block?.title || "",
    primaryButtonLabel: primary,
    secondaryButtonLabel: block?.subtitle || "",
    mediaId: firstMedia?.id,
    fileName: firstMedia?.file_name || "Фото.jpeg",
    preview:
      firstMedia?.url ||
      firstMedia?.large_url ||
      firstMedia?.thumbnail_url ||
      firstMedia?.file_url ||
      undefined,
  };
}

export function buildRequestsPackPatches(data: RequestsBlockData) {
  const mediaIds =
    typeof data.mediaId === "number" ? ([data.mediaId] as number[]) : [];

  const basePatch = {
    title: data.title,
    subtitle: data.secondaryButtonLabel,
    button: {
      name: data.primaryButtonLabel,
      position: 0,
    },
  };

  return [
    {
      ...basePatch,
      media_ids: mediaIds,
    },
    {
      ...basePatch,
      media:
        typeof data.mediaId === "number"
          ? [{ id: data.mediaId, position: 0 }]
          : [],
    },
  ] as Record<string, unknown>[];
}

