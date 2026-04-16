import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWLIST = new Set<string>(["/", "/login", "/packages"]);

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function isPublicFile(pathname: string) {
  // e.g. /favicon.ico, /robots.txt, /sitemap.xml, /manifest.webmanifest
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export function middleware(req: NextRequest) {
  const pathname = normalizePathname(req.nextUrl.pathname);

  // Never interfere with Next internals / APIs / admin area.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  // Static files in /public
  if (isPublicFile(pathname)) {
    return NextResponse.next();
  }

  // Allow only these public pages for production launch.
  if (ALLOWLIST.has(pathname)) {
    return NextResponse.next();
  }

  // Avoid rewriting the stub page to itself.
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};

