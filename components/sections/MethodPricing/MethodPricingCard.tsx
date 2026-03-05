"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

export type PlanPeriodOption = { value: string; label: string };

export type MethodPricingPlan = {
  id: string;
  eyebrow: string; // "МЕТОД РЕМОНТА"
  price: string; // "5000"
  periodLabel: string; // "Период подписки:"
  periodOptions: PlanPeriodOption[];
  ctaLabel: string; // "Оформить подписку"
  description: string;
  onCta?: (payload: { planId: string; period: string }) => void;
};

export function MethodPricingCard({
  plan,
  tone = "default",
}: {
  plan: MethodPricingPlan;
  tone?: "default" | "warm";
}) {
  const initialPeriod = plan.periodOptions[0]?.value ?? "default";
  const [period, setPeriod] = useState<string>(initialPeriod);

  const options = useMemo(() => plan.periodOptions ?? [], [plan.periodOptions]);

  return (
    <article
      className={clsx(
        "w-full",
        "rounded-[26px] sm:rounded-[30px] lg:rounded-[33px] overflow-hidden",
        "bg-white border-[4px] sm:border-[5px] lg:border-[6px] border-[#ECECEC]",
        "shadow-[0_18px_50px_rgba(0,0,0,0.25)]",
      )}
    >
      {/* internal layout */}
      <div className="flex h-full flex-col">
        {/* TOP RECT */}
        <div className="px-4 pt-4 sm:px-5 sm:pt-5 lg:px-[21px] lg:pt-[18px]">
          <div
            className={clsx(
              "w-full",
              "h-[190px] sm:h-[210px] lg:h-[229px]",
              "rounded-[18px] sm:rounded-[20px] overflow-hidden",
              tone === "warm" ? "bg-[#F3ECE8]" : "bg-[#F3F3F3]",
              "px-5 py-5 sm:px-7 sm:py-6 lg:px-[34px] lg:py-[26px]",
            )}
          >
            {/* eyebrow */}
            <div className="text-[20px] sm:text-[24px] lg:text-[28px] font-medium tracking-[0.04em] text-black/80">
              {plan.eyebrow}
            </div>

            {/* price */}
            <div className="mt-10 sm:mt-12 lg:mt-[64px] text-[34px] sm:text-[40px] lg:text-[44px] font-semibold leading-none text-[#1f1f1f]">
              {plan.price}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="px-5 pt-4 sm:px-7 sm:pt-5 lg:px-[34px] lg:pt-[18px] pb-6 sm:pb-7 lg:pb-8">
          {/* PERIOD ROW */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-[14px] sm:text-[16px] lg:text-[19px] text-black/60">
              {plan.periodLabel}
            </div>

            <div className="relative shrink-0">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={clsx(
                  "h-[36px] sm:h-[38px] lg:h-[40px]",
                  "w-[140px] sm:w-[150px] lg:w-[164px]",
                  "appearance-none rounded-full",
                  "border border-black/45 bg-white",
                  "px-4 sm:px-5 pr-10",
                  "text-[14px] sm:text-[16px] lg:text-[18px] text-[#1f1f1f] outline-none",
                  "focus:border-black/70",
                )}
              >
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/55">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => plan.onCta?.({ planId: plan.id, period })}
            className={clsx(
              "mt-4 sm:mt-5 lg:mt-[18px]",
              "h-[54px] sm:h-[62px] lg:h-[70px] w-full rounded-full",
              "bg-[#2F2F2F] text-white/90",
              "text-[16px] sm:text-[18px] lg:text-[22px] font-medium",
              "transition hover:opacity-95",
            )}
          >
            {plan.ctaLabel}
          </button>

          {/* divider */}
          <div className="mt-4 sm:mt-5 lg:mt-[18px] h-px w-full bg-black/10" />

          {/* description */}
          <p className="mt-4 sm:mt-5 lg:mt-[18px] text-[14px] sm:text-[16px] lg:text-[19px] leading-[1.45] lg:leading-[1.35] text-black/55">
            {plan.description}
          </p>
        </div>
      </div>
    </article>
  );
}
