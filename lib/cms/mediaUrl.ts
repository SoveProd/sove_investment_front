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

export function isLikelyVideoUrl(url?: string | null) {
  const u = (url || "").toLowerCase();
  return (
    u.endsWith(".mp4") ||
    u.endsWith(".webm") ||
    u.endsWith(".mov") ||
    u.endsWith(".m4v") ||
    u.endsWith(".ogg") ||
    u.endsWith(".ogv")
  );
}

export function getCmsMediaUrl(media?: CmsMedia | null) {
  if (!media) return undefined;

  return (
    // Prefer a stable same-origin URL (works with `next/image` without remotePatterns).
    // The API route redirects to the real file location for streaming/CDN.
    getPublicMediaApiUrl(media.id) ||
    normalizeCmsMediaUrl(media.url) ||
    normalizeCmsMediaUrl(media.large_url) ||
    normalizeCmsMediaUrl(media.medium_url) ||
    normalizeCmsMediaUrl(media.thumbnail_url) ||
    normalizeCmsMediaUrl(media.file_url)
  );
}
