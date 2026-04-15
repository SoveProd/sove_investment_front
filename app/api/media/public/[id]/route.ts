import { NextResponse } from "next/server";
import https from "node:https";
import { Readable } from "node:stream";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";
const API_ORIGIN_FALLBACK = "https://sove.app";

function getApiOrigin() {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return API_ORIGIN_FALLBACK;
  }
}

function normalizeUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${getApiOrigin()}${url}`;
  return `${getApiOrigin()}/${url.replace(/^\/+/, "")}`;
}

type MediaMetadata = {
  mime_type?: string | null;
  url?: string | null;
  large_url?: string | null;
  medium_url?: string | null;
  thumbnail_url?: string | null;
  file_url?: string | null;
};

function getSourceUrl(media: MediaMetadata) {
  return (
    normalizeUrl(media.url) ||
    normalizeUrl(media.large_url) ||
    normalizeUrl(media.medium_url) ||
    normalizeUrl(media.thumbnail_url) ||
    normalizeUrl(media.file_url) ||
    null
  );
}

type StreamResult = {
  statusCode: number;
  headers: Record<string, string>;
  body: Readable;
};

function streamFromUrl(url: string, rangeHeader?: string, redirectsLeft = 3) {
  return new Promise<StreamResult>((resolve, reject) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: false,
        headers: rangeHeader ? { Range: rangeHeader } : undefined,
      },
      (res) => {
        const statusCode = res.statusCode ?? 500;

        // Follow redirects (common for CDN/storage).
        if (
          redirectsLeft > 0 &&
          [301, 302, 303, 307, 308].includes(statusCode) &&
          typeof res.headers.location === "string"
        ) {
          res.resume();
          const nextUrl = normalizeUrl(res.headers.location) || res.headers.location;
          streamFromUrl(nextUrl, rangeHeader, redirectsLeft - 1).then(resolve, reject);
          return;
        }

        if (statusCode < 200 || statusCode >= 300) {
          res.resume();
          reject(new Error(`Upstream media request failed: ${statusCode}`));
          return;
        }

        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) {
          if (typeof v === "string") headers[k.toLowerCase()] = v;
        }

        resolve({
          statusCode,
          headers,
          body: res,
        });
      },
    );

    req.on("error", reject);
  });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const metadataResponse = await fetch(`${API_BASE}/media/file/${id}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!metadataResponse.ok) {
      return NextResponse.json(
        { detail: `Failed to load media metadata: ${metadataResponse.status}` },
        { status: metadataResponse.status },
      );
    }

    const media = (await metadataResponse.json()) as MediaMetadata;
    const sourceUrl = getSourceUrl(media);

    if (!sourceUrl) {
      return NextResponse.json(
        { detail: "Media source url not found" },
        { status: 404 },
      );
    }

    const range = request.headers.get("range") || undefined;
    const upstream = await streamFromUrl(sourceUrl, range);

    const headers = new Headers();
    headers.set(
      "Content-Type",
      upstream.headers["content-type"] || media.mime_type || "application/octet-stream",
    );
    headers.set("Cache-Control", "public, max-age=3600");

    const passThrough = [
      "accept-ranges",
      "content-range",
      "content-length",
      "etag",
      "last-modified",
    ] as const;

    for (const key of passThrough) {
      const value = upstream.headers[key];
      if (value) headers.set(key, value);
    }

    return new Response(Readable.toWeb(upstream.body) as unknown as ReadableStream, {
      status: upstream.statusCode,
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error ? error.message : "Failed to proxy media",
      },
      { status: 500 },
    );
  }
}
