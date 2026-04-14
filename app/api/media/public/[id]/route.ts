import https from "node:https";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

type MediaMetadata = {
  mime_type?: string | null;
  url?: string | null;
  large_url?: string | null;
  medium_url?: string | null;
  thumbnail_url?: string | null;
};

function getSourceUrl(media: MediaMetadata) {
  return (
    media.large_url ||
    media.medium_url ||
    media.thumbnail_url ||
    media.url ||
    null
  );
}

function downloadInsecure(url: string) {
  return new Promise<{
    body: ArrayBuffer;
    contentType: string | null;
    statusCode: number;
  }>((resolve, reject) => {
    const request = https.get(
      url,
      {
        rejectUnauthorized: false,
      },
      (response) => {
        const statusCode = response.statusCode ?? 500;

        if (statusCode < 200 || statusCode >= 300) {
          response.resume();
          reject(new Error(`Failed to load media file: ${statusCode}`));
          return;
        }

        const chunks: Buffer[] = [];

        response.on("data", (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        response.on("end", () => {
          resolve({
            body: Uint8Array.from(Buffer.concat(chunks)).buffer,
            contentType: response.headers["content-type"] || null,
            statusCode,
          });
        });
      },
    );

    request.on("error", reject);
  });
}

export async function GET(
  _request: Request,
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

    const fileResponse = await downloadInsecure(sourceUrl);

    return new Response(fileResponse.body, {
      status: 200,
      headers: {
        "Content-Type":
          fileResponse.contentType ||
          media.mime_type ||
          "application/octet-stream",
        "Cache-Control": "no-store",
      },
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
