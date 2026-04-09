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
    <section className={clsx("w-full bg-white py-8 lg:py-14", className)}>
      <Container className="max-w-[1742px]">
        <div
          className={clsx(
            "relative overflow-hidden mx-auto",

            // MOBILE exact
            "w-full max-w-[343px] h-[255px] rounded-[24px]",

            // TABLET
            "sm:max-w-none sm:h-[360px] sm:rounded-[32px]",

            // DESKTOP
            "lg:h-[554px] lg:rounded-[50px]",
          )}
        >
          {/* BG */}
          <div className="absolute inset-0">
            <Image
              src={bgSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Content */}
          <div
            className={clsx(
              "relative flex h-full w-full flex-col items-center justify-center text-center text-white",

              // MOBILE padding 16
              "px-4 py-6",

              // DESKTOP
              "lg:px-6 lg:py-14",
            )}
          >
            {/* TITLE */}
            <h2
              className={clsx(
                "font-medium leading-[1.05] tracking-[-0.02em]",

                // mobile exact
                "text-[24px]",

                // desktop
                "lg:text-[44px]",
              )}
            >
              {title}
            </h2>

            {/* BUTTON */}
            <div className="mt-4 lg:mt-6">
              <ArrowButton
                label={buttonLabel}
                href={buttonHref}
                variant="light"
                className={clsx(
                  // mobile exact size
                  "w-[163px] h-[40px] text-[14px] pl-4 pr-2",

                  // desktop
                  "lg:w-auto lg:h-[52px] lg:text-[16px] lg:pl-7",
                )}
              />
            </div>

            {/* SUBTITLE */}
            <div
              className={clsx(
                "mt-3 text-white/75 leading-[1.25]",

                // mobile exact
                "text-[12px] max-w-[200px]",

                // desktop
                "lg:text-[13px] lg:max-w-none",
              )}
            >
              {subtitle}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
