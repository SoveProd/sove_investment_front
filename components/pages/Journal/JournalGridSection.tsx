"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import type { JournalPost } from "./types";
import { JournalCard } from "./ui/JournalCard";

const FILTERS = ["Проекты", "Тренды", "Инсайты", "Интервью", "Гайды"] as const;
type Filter = (typeof FILTERS)[number];

export function JournalGridSection({ posts }: { posts: JournalPost[] }) {
  const [active, setActive] = useState<Filter>("Проекты");

  const filtered = useMemo(() => {
    if (active === "Проекты") return posts;
    const needle = active.toLowerCase();
    return posts.filter((p) => p.category.toLowerCase().includes(needle));
  }, [active, posts]);

  return (
    <section className="pb-16">
      <Container>
        {/* ✅ больше отступ сверху как на скрине */}
        <div className="pt-20 max-lg:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-5">
            {/* ✅ “Материалов” крупнее */}
            <div className="text-[35px] font-medium text-black/65 max-lg:text-[15px]">
              Материалов: {filtered.length}
            </div>

            {/* ✅ tabs bigger */}
            <div className="flex flex-wrap items-center justify-end gap-3">
              {FILTERS.map((f) => {
                const isActive = f === active;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActive(f)}
                    className={[
                      // size
                      "h-[51px] rounded-full px-10 text-[19px] font-medium transition",
                      // border
                      "border border-black/15",
                      // states
                      isActive
                        ? "bg-[#2f2f2f] text-white"
                        : "bg-white text-black/60 hover:text-black",
                    ].join(" ")}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ✅ чуть больше воздуха между верхней строкой и карточками */}
          <div className="mt-8 grid gap-10 md:grid-cols-2 max-lg:mt-7">
            {filtered.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
