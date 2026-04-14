"use client";

import clsx from "clsx";

export type PlanPeriodOption = { value: string; label: string };

export type MethodPricingPlan = {
  id: string;
  eyebrow: string; // "1 МЕСЯЦ"
  price: string; // "5000"
  priceSubtext?: string; // "500 руб./мес."
  periodLabel?: string;
  periodOptions?: PlanPeriodOption[];
  ctaLabel: string; // "Забронировать слот"
  description: string;
  onCta?: (payload: { planId: string }) => void;
};

export function MethodPricingCard({
  plan,
  tone = "default",
}: {
  plan: MethodPricingPlan;
  tone?: "default" | "warm";
}) {
  return (
    <article
      className={clsx(
        "w-full max-w-[343px]",
        "overflow-hidden rounded-[30px] bg-white",
        "border-4 border-[#ECECEC]",
        "shadow-[0_18px_50px_rgba(0,0,0,0.14)]",
        "lg:max-w-none lg:rounded-[33px] lg:border-[6px]",
      )}
    >
      <div className="px-4 pt-4 pb-5 lg:px-[21px] lg:pt-[18px] lg:pb-8">
        {/* top block */}
        <div
          className={clsx(
            "w-full rounded-[22px]",
            tone === "warm" ? "bg-[#F3ECE8]" : "bg-[#F3F3F3]",
            "px-5 pt-5 pb-6",
            "min-h-[190px]",
            "lg:min-h-[229px] lg:rounded-[20px] lg:px-[34px] lg:pt-[26px] lg:pb-[26px]",
          )}
        >
          <div className="text-[14px] font-medium uppercase text-[#1f1f1f] lg:text-[28px] lg:tracking-[0.04em]">
            {plan.eyebrow}
          </div>

          <div className="mt-[58px] text-[24px] font-semibold leading-none text-[#1f1f1f] lg:mt-[64px] lg:text-[44px]">
            {plan.price}
          </div>

          {plan.priceSubtext ? (
            <div className="mt-2 text-[14px] leading-none text-black/70 lg:text-[19px]">
              {plan.priceSubtext}
            </div>
          ) : null}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => plan.onCta?.({ planId: plan.id })}
          className={clsx(
            "mt-5 h-[54px] w-full rounded-full bg-graphite text-white transition hover:opacity-95",
            "text-[14px] font-medium",
            "lg:mt-[18px] lg:h-[70px] lg:text-[22px]",
          )}
        >
          {plan.ctaLabel}
        </button>

        {/* description */}
        <p className="mt-8 text-[14px] leading-[1.2] text-black/65 lg:mt-[18px] lg:text-[19px] lg:leading-[1.35]">
          {plan.description}
        </p>
      </div>
    </article>
  );
}
