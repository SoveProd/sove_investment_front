import type { CmsBlock, CmsMedia } from "./types";
import { getCmsMediaUrl } from "./mediaUrl";
import type { ServicePackageCardData } from "@/app/(admin)/admin/content-tools/service-packages/types";

type PackageBlockContent = {
  budget?: string | null;
  price_per_m2?: string | null;
  timeline?: string | null;
  roi?: string | null;
  included?: string[] | null;
  extra_services?: string[] | null;
  popup_document_media_id?: number | null;
};

function getMediaByPosition(media: CmsMedia[] | undefined, position: number) {
  const sorted = [...(media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });
  return sorted[position];
}

function splitLines(lines?: string[] | null) {
  return (lines || []).filter(Boolean).join("\n");
}

function toLines(text: string) {
  return text
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function mapServicePackageBlockToAdmin(block?: CmsBlock): ServicePackageCardData {
  const content = (block?.content || null) as PackageBlockContent | null;

  const left = getMediaByPosition(block?.media, 0);
  const right = getMediaByPosition(block?.media, 1);

  const popupDocByContent = content?.popup_document_media_id
    ? (block?.media || []).find((m) => m.id === content.popup_document_media_id)
    : undefined;
  const popupDoc = popupDocByContent || getMediaByPosition(block?.media, 2);

  return {
    title: block?.title || "",
    description: block?.text || "",

    budget: content?.budget || "",
    pricePerM2: content?.price_per_m2 || "",
    timeline: content?.timeline || "",
    roi: content?.roi || "",

    included: splitLines(content?.included),
    extraServices: splitLines(content?.extra_services),

    imageLeftMediaId: left?.id,
    imageLeftFileName: left?.file_name || "",
    imageLeftPreview: getCmsMediaUrl(left),

    imageRightMediaId: right?.id,
    imageRightFileName: right?.file_name || "",
    imageRightPreview: getCmsMediaUrl(right),

    popupDocumentMediaId: popupDoc?.id,
    popupDocumentFileName: popupDoc?.file_name || "",
    popupDocumentPreview: getCmsMediaUrl(popupDoc),
  };
}

export function mapServicePackageAdminToPatch(data: ServicePackageCardData) {
  const popupId = data.popupDocumentMediaId ?? null;

  return {
    title: data.title,
    text: data.description,
    content: {
      budget: data.budget,
      price_per_m2: data.pricePerM2,
      timeline: data.timeline,
      roi: data.roi,
      included: toLines(data.included),
      extra_services: toLines(data.extraServices),
      popup_document_media_id: popupId,
    },
  } as Record<string, unknown>;
}

