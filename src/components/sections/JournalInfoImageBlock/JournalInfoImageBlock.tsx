import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";

type Props = {
  eyebrow?: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
  className?: string;

  // высота картинки как на макете
  imageHeightClassName?: string; // default ~460px
};

export function JournalInfoImageBlock({
  eyebrow,
  text,
  image,
  reverse = false,
  className,
  imageHeightClassName = "h-[460px] max-lg:h-[320px]",
}: Props) {
  return (
    <section className={clsx("py-14 max-lg:py-10", className)}>
      <Container>
        <div className="grid grid-cols-12 items-start gap-12 max-lg:gap-8">
          {/* TEXT */}
          <div
            className={clsx(
              "col-span-12 lg:col-span-6",
              reverse ? "lg:order-2" : "lg:order-1",
            )}
          >
            {eyebrow ? (
              <div className="mb-6 text-[12px] uppercase tracking-[0.16em] text-black/35">
                {eyebrow}
              </div>
            ) : null}

            <div
              className={clsx(
                "max-w-[520px] whitespace-pre-line",
                // как на скрине: читабельный текст, больше межстрочный
                "font-serif italic",
                "text-[16px] leading-[1.75] text-black/55",
                "max-lg:text-[14px] max-lg:leading-[1.7]",
              )}
            >
              {text}
            </div>
          </div>

          {/* IMAGE */}
          <div
            className={clsx(
              "col-span-12 lg:col-span-6",
              reverse ? "lg:order-1" : "lg:order-2",
            )}
          >
            <div
              className={clsx(
                "relative w-full overflow-hidden",
                // радиус как на скрине
                "rounded-[28px]",
                "bg-black/[0.04]",
                imageHeightClassName,
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
