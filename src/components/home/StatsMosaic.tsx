import Image from "next/image";
import { Container } from "../layout/Container";
import type { CmsMetricsBlock, CmsMetricsContent } from "@/lib/cms/types";
import { getCmsMediaUrl, isLikelyVideoUrl } from "@/lib/cms/mediaUrl";

type StatNotchedCardProps = {
  value: string;
  label: string;
  variant?: "dark" | "light";
  withArrow?: boolean;
  arrowTone?: "default" | "muted";
};

function StatNotchedCard({
  value,
  label,
  variant = "dark",
  withArrow = true,
  arrowTone = "muted",
}: StatNotchedCardProps) {
  const isDark = variant === "dark";

  const shapeFill = isDark ? "var(--color-graphite)" : "var(--color-surface)";
  const textClass = isDark ? "text-white" : "text-text";
  const labelClass = isDark ? "text-white/80" : "text-text-secondary";

  // Shape from `public/objects/Rectangle.svg` (notch bottom-right).
  const rectPath =
    "M0 35C0 15.67 15.67 0 35 0H387C406.33 0 422 15.67 422 35V263C422 282.33 406.33 298 387 298H380C352.938 298 331 319.938 331 347V354C331 373.33 315.33 389 296 389H35C15.67 389 0 373.33 0 354V35Z";

  const arrowPos = "absolute z-10 bottom-2 right-2 sm:bottom-3 sm:right-3";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[22px]">
      <svg
        viewBox="0 0 422 389"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d={rectPath} fill={shapeFill} />
      </svg>

      <div className="relative z-2 flex h-full flex-col items-center justify-center px-4 sm:px-5 md:px-6 text-center">
        <div
          className={[
            "font-medium leading-none tracking-[-0.03em]",
            "text-[24px] sm:text-[30px] md:text-[36px]",
            "lg:text-[64px] min-[1440px]:text-[74px] min-[1536px]:text-[86px]",
            textClass,
          ].join(" ")}
        >
          {value}
        </div>

        <div
          className={[
            "whitespace-pre-line leading-[1.15]",
            "mt-2 sm:mt-2.5 md:mt-3",
            "text-[11px] sm:text-[12px] md:text-[14px]",
            "lg:text-[17px] min-[1536px]:text-[20px]",
          ].join(" ")}
        >
          <span className={labelClass}>{label}</span>
        </div>
      </div>

      {withArrow && (
        <div className={arrowPos}>
          <button
            type="button"
            aria-label="Открыть"
            className={[
              "grid place-items-center rounded-full bg-surface border border-border",
              "shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
              "transition-transform duration-200 hover:scale-[1.03]",
              "h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10",
              "lg:h-[64px] lg:w-[64px] min-[1536px]:h-[81px] min-[1536px]:w-[81px]",
            ].join(" ")}
          >
            <Image
              src="/objects/Arrow.svg"
              alt=""
              width={20}
              height={20}
              className={[
                "block h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5",
                arrowTone === "muted"
                  ? "opacity-70 filter-[grayscale(1)_saturate(0)_brightness(0.55)]"
                  : "opacity-70",
              ].join(" ")}
            />
          </button>
        </div>
      )}
    </div>
  );
}

type ImageTileProps = {
  src: string;
  alt?: string;
};

function ImageTile({ src, alt = "" }: ImageTileProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[48px] bg-surface">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 900px"
        className="object-cover"
      />
    </div>
  );
}

function LightInfoCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="h-full w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[48px] bg-surface border border-border px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="font-medium text-text leading-none text-[24px] sm:text-[30px] md:text-[36px]">
          {value}
        </div>
        <div className="mt-2 text-[11px] sm:text-[12px] md:text-[14px] leading-[1.15] text-text-secondary whitespace-pre-line">
          {label}
        </div>
      </div>
    </div>
  );
}

type MetricsItem = {
  label: string;
  value: string;
};

type Props = {
  block?: CmsMetricsBlock;
};

const fallbackItems: MetricsItem[] = [
  {
    value: "1–5",
    label: "Показов до сделки \nили аренды",
  },
  {
    value: "200K",
    label: "Средняя цена аренды \nквартиры SOVE",
  },
  {
    value: "6 мес.",
    label: "От ремонта до выхода на рынок",
  },
  {
    value: "35%",
    label: "Средний ROI \nреализованных кейсов",
  },
];

const fallbackMetricImages = [
  "/images/statsimg1.jpg",
  "/images/statsimg2.jpg",
];

export function StatsMosaic({ block }: Props) {
  const content = block?.content as CmsMetricsContent | null;
  const items = content?.items?.length ? content.items : fallbackItems;
  const firstCms = getCmsMediaUrl(block?.media?.[0]);
  const secondCms = getCmsMediaUrl(block?.media?.[1]);
  const metricImages = [
    firstCms && !isLikelyVideoUrl(firstCms) ? firstCms : fallbackMetricImages[0],
    secondCms && !isLikelyVideoUrl(secondCms) ? secondCms : fallbackMetricImages[1],
  ];

  const first = items[0] || fallbackItems[0];
  const second = items[1] || fallbackItems[1];
  const third = items[2] || fallbackItems[2];
  const fourth = items[3] || fallbackItems[3];

  const safe = (item: { label?: string | null; value?: string | null }) => ({
    label: item.label ?? "",
    value: item.value ?? "",
  });

  const firstSafe = safe(first);
  const secondSafe = safe(second);
  const thirdSafe = safe(third);
  const fourthSafe = safe(fourth);

  return (
    <section className="w-full bg-bg py-[56px] sm:py-[70px] lg:py-[110px] min-[1536px]:py-[150px]">
      <Container>
        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          <div className="col-span-3 aspect-422/389">
            <StatNotchedCard
              value={firstSafe.value}
              label={firstSafe.label}
              variant="dark"
            />
          </div>

          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src={metricImages[0]} />
          </div>

          <div className="col-span-3 aspect-422/389">
            <StatNotchedCard
              value={secondSafe.value}
              label={secondSafe.label}
              variant="dark"
              arrowTone="muted"
            />
          </div>

          <div className="col-span-3 aspect-422/389">
            <LightInfoCard value={thirdSafe.value} label={thirdSafe.label} />
          </div>

          <div className="col-span-3 aspect-422/389">
            <StatNotchedCard
              value={fourthSafe.value}
              label={fourthSafe.label}
              variant="dark"
            />
          </div>

          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src={metricImages[1]} />
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          <div className="aspect-422/389">
            <StatNotchedCard
              value={firstSafe.value}
              label={firstSafe.label}
              variant="dark"
              withArrow
            />
          </div>

          <div className="aspect-422/389">
            <StatNotchedCard
              value={secondSafe.value}
              label={secondSafe.label}
              variant="dark"
              withArrow
            />
          </div>

          <div className="col-span-2 h-[150px] sm:h-[190px] md:h-[240px]">
            <ImageTile src={metricImages[0]} />
          </div>

          <div className="aspect-422/389">
            <LightInfoCard value={thirdSafe.value} label={thirdSafe.label} />
          </div>

          <div className="aspect-422/389">
            <StatNotchedCard
              value={fourthSafe.value}
              label={fourthSafe.label}
              variant="dark"
              withArrow
            />
          </div>

          <div className="col-span-2 h-[150px] sm:h-[190px] md:h-[240px]">
            <ImageTile src={metricImages[1]} />
          </div>
        </div>
      </Container>
    </section>
  );
}
