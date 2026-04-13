const API_ORIGIN_FALLBACK = "https://sove.app";

function getApiOrigin() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

  try {
    return new URL(apiBase).origin;
  } catch {
    return API_ORIGIN_FALLBACK;
  }
}

function getPublicMediaApiUrl(mediaId?: number | null) {
  if (!mediaId) return undefined;

  return `/api/media/public/${mediaId}`;
}

export function normalizeCmsMediaUrl(url?: string | null) {
  if (!url) return undefined;

  if (!url.startsWith("/") && !url.startsWith("http://") && !url.startsWith("https://")) {
    return `${getApiOrigin()}/${url.replace(/^\/+/, "")}`;
  }

  if (url.startsWith("/")) {
    return `${getApiOrigin()}${url}`;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

import type { CmsMedia } from "./types";

export function getCmsMediaUrl(media?: CmsMedia | null) {
  if (!media) return undefined;

  return (
    getPublicMediaApiUrl(media.id) ||
    normalizeCmsMediaUrl(media.url) ||
    normalizeCmsMediaUrl(media.large_url) ||
    normalizeCmsMediaUrl(media.medium_url) ||
    normalizeCmsMediaUrl(media.thumbnail_url) ||
    normalizeCmsMediaUrl(media.file_url)
  );
}
