import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";

type Props = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  bgSrc?: string;
  className?: string;
};

export function FinishingOptionsBanner({
  title = "Варианты отделки",
  subtitle = "Описание ценовых категорий отделки",
  buttonLabel = "Base / Select",
  buttonHref = "/packages",
  bgSrc = "/images/banner.png",
  className = "",
}: Props) {
  return (
    <section className={clsx("w-full bg-white py-14", className)}>
      <Container className="max-w-[1742px]">
        <div
          className={clsx("relative w-full overflow-hidden", "rounded-[50px]")}
        >
          {/* BG */}
          <div className="absolute inset-0">
            <Image
              src={bgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />

            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div
            className={clsx(
              "relative flex w-full flex-col items-center justify-center text-center text-white",
              "min-h-[554px]",
              "px-6 py-14",
              "max-lg:min-h-[320px]",
            )}
          >
            <h2 className="text-[44px] font-medium leading-[1.05] tracking-[-0.02em] max-lg:text-[28px]">
              {title}
            </h2>

            <div className="mt-6">
              <ArrowButton
                label={buttonLabel}
                href={buttonHref}
                variant="light"
                className="h-[52px] pl-7 pr-2"
              />
            </div>

            <div className="mt-5 text-[13px] text-white/70 max-lg:text-[12px]">
              {subtitle}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
