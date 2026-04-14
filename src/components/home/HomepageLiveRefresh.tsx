"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "sove:homepage:lastSaveTs";
const CHANNEL_NAME = "sove:homepage";

export function HomepageLiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      router.refresh();
    };

    window.addEventListener("storage", onStorage);

    let bc: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = () => router.refresh();
    }

    return () => {
      window.removeEventListener("storage", onStorage);
      bc?.close();
    };
  }, [router]);

  return null;
}

