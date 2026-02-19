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
      ? "absolute z-[3] -bottom-2 -right-2"
      : "absolute z-[3] -bottom-2 -left-2";

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 422 389"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path d={notchSide === "br" ? pathBR : pathBL} fill={shapeFill} />
      </svg>

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 sm:px-8 lg:px-6 2xl:px-10 text-center">
        <div
          className={[
            "font-medium leading-none tracking-[-0.03em]",
            "text-[40px] sm:text-[48px] md:text-[56px]",
            "lg:text-[64px] min-[1440px]:text-[74px] min-[1536px]:text-[86px]",
            textClass,
          ].join(" ")}
        >
          {value}
        </div>

        <div
          className={[
            "whitespace-pre-line leading-tight",
            "mt-3 sm:mt-4 lg:mt-5",
            "text-[14px] sm:text-[15px] md:text-[16px]",
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
              "grid place-items-center rounded-full",
              "bg-surface",
              "shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
              "border border-border",
              "transition-transform duration-200 hover:scale-[1.03]",
              "h-[56px] w-[56px] sm:h-[60px] sm:w-[60px]",
              "lg:h-[64px] lg:w-[64px] min-[1536px]:h-[81px] min-[1536px]:w-[81px]",
            ].join(" ")}
          >
            <img
              src="/objects/Arrow.svg"
              alt=""
              width={20}
              height={20}
              className="block opacity-70"
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
    <div className="relative h-full w-full overflow-hidden rounded-[48px] bg-surface">
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

export function StatsMosaic() {
  return (
    <section className="w-full bg-bg py-[90px] sm:py-[100px] lg:py-[110px] min-[1536px]:py-[150px]">
      <Container>
        <div className="hidden lg:grid grid-cols-12 gap-6">
          {/* ROW 1 */}
          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="150"
              label={"Реализованных\nпроектов"}
              notchSide="br"
              variant="dark"
            />
          </div>

          {/* ✅ Фото чуть ниже на lg, чтобы визуально совпадало */}
          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="150"
              label={"Активных\nклиентов"}
              notchSide="bl"
              variant="dark"
            />
          </div>

          {/* ROW 2 */}
          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <div className="h-full w-full rounded-[48px] bg-surface border border-border px-6 min-[1440px]:px-10 min-[1536px]:px-12 py-7 min-[1440px]:py-10 min-[1536px]:py-12">
              <div className="flex h-full flex-col justify-center">
                <div className="font-medium text-text text-[30px] lg:text-[44px] min-[1440px]:text-[52px] min-[1536px]:text-[62px]">
                  6 месяцев
                </div>
                <div className="mt-2 min-[1440px]:mt-3 text-[14px] lg:text-[15px] min-[1536px]:text-[18px] text-text-secondary">
                  Среднее время
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-[280px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <StatNotchedCard
              value="35%"
              label="Средний ROI"
              notchSide="br"
              variant="dark"
            />
          </div>

          {/* ✅ второе фото тоже ниже на lg */}
          <div className="col-span-6 h-[250px] min-[1280px]:h-[300px] min-[1440px]:h-[340px] min-[1536px]:h-[389px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid lg:hidden grid-cols-1 gap-4 sm:gap-5">
          <div className="h-[210px] sm:h-[230px] md:h-[250px]">
            <StatNotchedCard
              value="150"
              label={"Реализованных\nпроектов"}
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="h-[200px] sm:h-[220px] md:h-[240px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="h-[210px] sm:h-[230px] md:h-[250px]">
            <StatNotchedCard
              value="150"
              label={"Активных\nклиентов"}
              notchSide="bl"
              variant="dark"
            />
          </div>

          <div className="h-[210px] sm:h-[230px] md:h-[250px] rounded-[48px] bg-surface border border-border px-6 sm:px-8 py-7 sm:py-8">
            <div className="flex h-full flex-col justify-center">
              <div className="font-medium text-text text-[28px] sm:text-[34px] md:text-[38px]">
                6 месяцев
              </div>
              <div className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] text-text-secondary">
                Среднее время
              </div>
            </div>
          </div>

          <div className="h-[210px] sm:h-[230px] md:h-[250px]">
            <StatNotchedCard
              value="35%"
              label="Средний ROI"
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="h-[200px] sm:h-[220px] md:h-[240px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
