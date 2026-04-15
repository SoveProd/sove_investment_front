"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CmsBlock } from "@/lib/cms/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

type Options = {
  blockType: string;
  initialBlock?: CmsBlock;
  refreshIntervalMs?: number;
};

export function usePublishedHomepageBlock({
  blockType,
  initialBlock,
  refreshIntervalMs = 0,
}: Options) {
  const [block, setBlock] = useState<CmsBlock | undefined>(initialBlock);
  const blockTypeRef = useRef(blockType);

  const stableBlockType = useMemo(() => {
    blockTypeRef.current = blockType;
    return blockType;
  }, [blockType]);

  useEffect(() => {
    let cancelled = false;

    // If we already have server-provided data and polling is disabled,
    // avoid extra client fetches (and avoid StrictMode double-fetch noise in dev).
    if (initialBlock && (!refreshIntervalMs || refreshIntervalMs <= 0)) {
      return () => {
        cancelled = true;
      };
    }

    async function loadOnce() {
      try {
        const response = await fetch(`${API_BASE}/static-pages/homepage`, {
          headers: {
            Accept: "application/json",
            "x-client-type": "web",
          },
          cache: "no-store",
        });

        if (!response.ok) return;

        const homepage = (await response.json()) as { blocks?: CmsBlock[] };
        const next = homepage.blocks?.find((b) => b.block_type === blockTypeRef.current);
        if (!cancelled) setBlock(next);
      } catch {
        // ignore
      }
    }

    loadOnce();

    if (!refreshIntervalMs || refreshIntervalMs <= 0) {
      return () => {
        cancelled = true;
      };
    }

    const tick = () => {
      if (document.visibilityState !== "visible") return;
      void loadOnce();
    };

    const id = window.setInterval(tick, refreshIntervalMs);
    const handleVisibility = () => tick();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [stableBlockType, refreshIntervalMs, initialBlock]);

  return block;
}

