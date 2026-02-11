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

  // SVG нельзя нормально стилизовать tailwind-классами, поэтому оставляем fill через CSS-переменные (токены)
  const shapeFill = isDark ? "var(--color-graphite)" : "var(--color-surface)";

  const textClass = isDark ? "text-white" : "text-text";
  const labelClass = isDark ? "text-white/80" : "text-text-secondary";

  return (
    <div className="relative h-full w-full">
      {/* SVG SHAPE */}
      <svg
        viewBox="0 0 422 389"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M0 35C0 15.67 15.67 0 35 0H387C406.33 0 422 15.67 422 35V263C422 282.33 406.33 298 387 298H380C352.938 298 331 319.938 331 347V354C331 373.33 315.33 389 296 389H35C15.67 389 0 373.33 0 354V35Z"
          fill={shapeFill}
        />
      </svg>

      {/* CONTENT */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-10 text-center">
        <div
          className={[
            "text-[86px] font-medium leading-none tracking-[-0.03em]",
            textClass,
          ].join(" ")}
        >
          {value}
        </div>

        <div className="mt-6 whitespace-pre-line text-[20px] leading-tight">
          <span className={labelClass}>{label}</span>
        </div>
      </div>

      {/* ARROW BUTTON */}
      {withArrow && (
        <div className="absolute z-[3] -bottom-2 -right-2">
          <Link
            href="#"
            aria-label="Open"
            className={[
              "grid h-[81px] w-[81px] place-items-center rounded-full",
              "bg-surface",
              "shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
              "border border-border",
              "transition-transform duration-200 hover:scale-[1.03]",
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
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover"
      />
    </div>
  );
}

export function StatsMosaic() {
  return (
    <section className="w-full bg-bg py-[150px] max-lg:py-[80px]">
      <Container>
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          {/* ROW 1 */}
          <div className="col-span-3 h-[389px] flex justify-start">
            <div className="h-[389px] w-[422px] shrink-0">
              <StatNotchedCard
                value="150"
                label={"Реализованных\nпроектов"}
                notchSide="br"
                variant="dark"
              />
            </div>
          </div>

          <div className="col-span-6 h-[389px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="col-span-3 h-[389px] flex justify-end">
            <div className="h-[389px] w-[422px] shrink-0">
              <StatNotchedCard
                value="150"
                label={"Активных\nклиентов"}
                notchSide="bl"
                variant="dark"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="col-span-3 h-[389px] flex justify-start">
            <div className="h-[389px] w-[422px] shrink-0">
              <div className="h-full w-full rounded-[48px] bg-surface px-12 py-12 border border-border">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[62px] font-medium text-text">
                    6 месяцев
                  </div>
                  <div className="mt-4 text-[18px] text-text-secondary">
                    Среднее время
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-[389px] flex justify-center">
            <div className="h-[389px] w-[422px] shrink-0">
              <StatNotchedCard
                value="35%"
                label="Средний ROI"
                notchSide="br"
                variant="dark"
              />
            </div>
          </div>

          <div className="col-span-6 h-[389px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="grid lg:hidden grid-cols-1 gap-5">
          <div className="h-[280px]">
            <StatNotchedCard
              value="150"
              label={"Реализованных\nпроектов"}
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="h-[280px]">
            <ImageTile src="/images/statsimg1.jpg" />
          </div>

          <div className="h-[280px]">
            <StatNotchedCard
              value="150"
              label={"Активных\nклиентов"}
              notchSide="bl"
              variant="dark"
            />
          </div>

          <div className="h-[280px] rounded-[48px] bg-surface px-10 py-10 border border-border">
            <div className="flex h-full flex-col justify-center">
              <div className="text-[44px] font-medium text-text">6 месяцев</div>
              <div className="mt-3 text-[16px] text-text-secondary">
                Среднее время
              </div>
            </div>
          </div>

          <div className="h-[280px]">
            <StatNotchedCard
              value="35%"
              label="Средний ROI"
              notchSide="br"
              variant="dark"
            />
          </div>

          <div className="h-[280px]">
            <ImageTile src="/images/statsimg2.jpg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
