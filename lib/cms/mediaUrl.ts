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

  // Disabled: in production `/api` is owned by backend and this path 404s.
  return undefined;
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
      // Yandex Object Storage: bucket names with dots break TLS in virtual-hosted style:
      // https://my.bucket.storage.yandexcloud.net/... => ERR_CERT_COMMON_NAME_INVALID
      // Rewrite to path-style: https://storage.yandexcloud.net/my.bucket/...
      if (parsed.hostname.endsWith(".storage.yandexcloud.net")) {
        const suffix = ".storage.yandexcloud.net";
        const bucketHost = parsed.hostname.slice(0, -suffix.length); // e.g. "sove.pub.bucket"
        // If bucketHost contains a dot, wildcard cert won't match -> rewrite.
        if (bucketHost.includes(".")) {
          return `https://storage.yandexcloud.net/${bucketHost}${parsed.pathname}${parsed.search}`;
        }
      }

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
    normalizeCmsMediaUrl(media.url) ||
    normalizeCmsMediaUrl(media.large_url) ||
    normalizeCmsMediaUrl(media.medium_url) ||
    normalizeCmsMediaUrl(media.thumbnail_url) ||
    normalizeCmsMediaUrl(media.file_url)
  );
}
