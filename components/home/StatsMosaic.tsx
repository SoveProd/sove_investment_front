import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";

type NotchSide = "br" | "bl";

type StatNotchedCardProps = {
  value: string;
  label: string;
  notchSide: NotchSide;
  variant?: "dark" | "light";
  withArrow?: boolean;
};

function StatNotchedCard({
  value,
  label,
  notchSide,
  variant = "dark",
  withArrow = true,
}: StatNotchedCardProps) {
  const isDark = variant === "dark";

  const shapeFill = isDark ? "var(--color-graphite)" : "var(--color-surface)";
  const textClass = isDark ? "text-white" : "text-text";
  const labelClass = isDark ? "text-white/80" : "text-text-secondary";

  const pathBR =
    "M0 35C0 15.67 15.67 0 35 0H387C406.33 0 422 15.67 422 35V263C422 282.33 406.33 298 387 298H380C352.938 298 331 319.938 331 347V354C331 373.33 315.33 389 296 389H35C15.67 389 0 373.33 0 354V35Z";

  const pathBL =
    "M422 35C422 15.67 406.33 0 387 0H35C15.67 0 0 15.67 0 35V263C0 282.33 15.67 298 35 298H42C69.062 298 91 319.938 91 347V354C91 373.33 106.67 389 126 389H387C406.33 389 422 373.33 422 354V35Z";

  const arrowPos =
    notchSide === "br"
      ? "absolute z-[3] bottom-2 right-2 sm:bottom-3 sm:right-3"
      : "absolute z-[3] bottom-2 left-2 sm:bottom-3 sm:left-3";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        viewBox="0 0 422 389"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path d={notchSide === "br" ? pathBR : pathBL} fill={shapeFill} />
      </svg>

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-4 sm:px-5 md:px-6 text-center">
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
          <Link
            href="#"
            aria-label="Open"
            className={[
              "grid place-items-center rounded-full bg-surface border border-border",
              "shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
              "transition-transform duration-200 hover:scale-[1.03]",
              "h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10",
              "lg:h-[64px] lg:w-[64px] min-[1536px]:h-[81px] min-[1536px]:w-[81px]",
            ].join(" ")}
          >
            <img
              src="/objects/Arrow.svg"
              alt=""
              width={14}
              height={14}
              className="block h-3.5 w-3.5 opacity-70 sm:h-4 sm:w-4 md:h-5 md:w-5"
            />
          </Link>
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
        sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 900px"
        className="object-cover"
      />
    </div>
  );
}

function LightInfoCard() {
  return (
    <div className="h-full w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[48px] bg-surface border border-border px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="font-medium text-text leading-none text-[24px] sm:text-[30px] md:text-[36px]">
          6 мес.
        </div>
        <div className="mt-2 text-[11px] sm:text-[12px] md:text-[14px] leading-[1.15] text-text-secondary whitespace-pre-line">
          {"От ремонта\nдо выхода на рынок"}
        </div>
      </div>
    </div>
  );
}

export function StatsMosaic() {
  return (
    <section className="w-full bg-bg py-[56px] sm:py-[70px] lg:py-[110px] min-[1536px]:py-[150px]">
      <Container>
        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="1–5"
              label={"Показов до сделки \nили аренды"}
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="200K"
              label={"Средняя цена аренды \nквартиры SOVE"}
              notchSide="bl"
              variant="dark"
            />
          </div>

          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <div className="h-full w-full rounded-[48px] bg-surface border border-border px-6 min-[1440px]:px-10 min-[1536px]:px-12 py-7 min-[1440px]:py-10 min-[1536px]:py-12">
              <div className="flex h-full flex-col justify-center">
                <div className="font-medium text-text text-[30px] lg:text-[44px] min-[1440px]:text-[52px] min-[1536px]:text-[62px]">
                  6 мес.
                </div>
                <div className="mt-2 min-[1440px]:mt-3 text-[14px] lg:text-[15px] min-[1536px]:text-[18px] text-text-secondary">
                  От ремонта до выхода на рынок
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="35%"
              label={"Средний ROI \nреализованных кейсов"}
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          <div className="h-[150px] sm:h-[180px] md:h-[210px]">
            <StatNotchedCard
              value="1–5"
              label={"Показов до сделки\nили аренды"}
              notchSide="br"
              variant="dark"
              withArrow
            />
          </div>

          <div className="h-[150px] sm:h-[180px] md:h-[210px]">
            <StatNotchedCard
              value="200K"
              label={"Средняя цена аренды\nквартиры SOVE"}
              notchSide="br"
              variant="dark"
              withArrow
            />
          </div>

          <div className="col-span-2 h-[150px] sm:h-[190px] md:h-[240px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="h-[150px] sm:h-[180px] md:h-[210px]">
            <LightInfoCard />
          </div>

          <div className="h-[150px] sm:h-[180px] md:h-[210px]">
            <StatNotchedCard
              value="35%"
              label={"Средний ROI\nреализованных кейсов"}
              notchSide="br"
              variant="dark"
              withArrow
            />
          </div>

          <div className="col-span-2 h-[150px] sm:h-[190px] md:h-[240px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
