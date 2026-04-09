"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

export type SelfTryOption = {
  value: string;
  label: string;
};

export type SelfTryPlan = {
  id: string;
  title: string;
  term: string;
  price: string;
  conceptLabel: string;
  conceptOptions: SelfTryOption[];
  area: number;
  areaMin: number;
  areaMax: number;
  sizeLabel: string;
  ctaLabel: string;
  features: string[];
  onSubmit?: (payload: {
    planId: string;
    concept: string;
    area: number;
  }) => void;
};

export function SelfTryCard({
  plan,
  tone = "default",
}: {
  plan: SelfTryPlan;
  tone?: "default" | "warm";
}) {
  const initialConcept = plan.conceptOptions[0]?.value ?? "";
  const [concept, setConcept] = useState(initialConcept);
  const [area, setArea] = useState(plan.area);

  const conceptOptions = useMemo(
    () => plan.conceptOptions ?? [],
    [plan.conceptOptions],
  );

  return (
    <article
      className={clsx(
        "flex h-[1044px] w-[566px] flex-col overflow-hidden rounded-[34px] border border-black/8 bg-white p-[21px]",
        "shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
      )}
    >
      {/* TOP BLOCK */}
      <div
        className={clsx(
          "h-[229px] w-[524px] rounded-[24px] px-[28px] pt-[24px] pb-[22px]",
          tone === "warm" ? "bg-[#F4ECE8]" : "bg-[#F5F5F5]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="text-[28px] font-medium uppercase leading-none text-[#2F2F2F]">
            {plan.title}
          </div>

          <div className="text-[22px] font-medium uppercase leading-none text-black/60">
            {plan.term}
          </div>
        </div>

        <div className="mt-[92px] text-[45px] font-semibold leading-none text-[#1F1F1F]">
          {plan.price}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-[22px]">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[21px] leading-none text-black/60">
            {plan.conceptLabel}
          </div>

          <div className="relative shrink-0">
            <select
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className={clsx(
                "h-[52px] w-[168px] appearance-none rounded-full border border-black/30 bg-white px-5 pr-11 text-[21px] text-[#1f1f1f] outline-none",
                "focus:border-black/50",
              )}
            >
              {conceptOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black/50">
              <svg
                width="18"
                height="18"
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

        <div className="mt-[26px] flex items-center justify-between text-[21px] leading-none">
          <div className="font-semibold text-[#C15E3A]">
            {area}{" "}
            <span className="font-normal text-black/55">
              Квадратура объекта
            </span>
          </div>

          <div className="text-black/55">{plan.sizeLabel}</div>
        </div>

        <div className="mt-[16px]">
          <input
            type="range"
            min={plan.areaMin}
            max={plan.areaMax}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={clsx(
              "h-[3px] w-full cursor-pointer appearance-none rounded-full bg-[#D6D6D6]",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-[14px]",
              "[&::-webkit-slider-thumb]:w-[14px]",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-white",
              "[&::-webkit-slider-thumb]:border",
              "[&::-webkit-slider-thumb]:border-[#C15E3A]",
            )}
            style={{
              background: `linear-gradient(to right, #C15E3A 0%, #C15E3A ${
                ((area - plan.areaMin) / (plan.areaMax - plan.areaMin)) * 100
              }%, #D6D6D6 ${
                ((area - plan.areaMin) / (plan.areaMax - plan.areaMin)) * 100
              }%, #D6D6D6 100%)`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => plan.onSubmit?.({ planId: plan.id, concept, area })}
          className="mt-[28px] h-[84px] w-full rounded-full bg-[#363636] text-[21px] font-medium text-white transition hover:opacity-95"
        >
          {plan.ctaLabel}
        </button>
      </div>

      {/* FEATURES */}
      <div className="mt-[34px] flex-1">
        <ul className="space-y-[6px] text-[19px] leading-[1.2] text-black/55">
          {plan.features.map((feature, index) => (
            <li key={`${plan.id}-feature-${index}`} className="flex gap-3">
              <span className="mt-[10px] h-[4px] w-[4px] shrink-0 rounded-full bg-black/30" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
