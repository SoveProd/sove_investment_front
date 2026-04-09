import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

type Props = {
  index: number | string;
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
  className?: string;
};

export function InfoImageBlock({
  index,
  title,
  text,
  image,
  reverse = false,
  className = "",
}: Props) {
  return (
    <section className={clsx("w-full bg-white py-8 lg:py-14", className)}>
      <Container>
        <div
          className={clsx(
            "grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6",
            reverse ? "lg:[&>*:first-child]:order-2" : "",
          )}
        >
          {/* TEXT CARD */}
          <div className="lg:col-span-6">
            <div
              className={clsx(
                "h-full rounded-[24px] border border-black/5 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]",
                "px-7 py-7",
                "lg:rounded-[28px] lg:px-12 lg:py-12",
              )}
            >
              <div className="text-[18px] font-medium text-black/10 lg:text-[28px]">
                [{index}]
              </div>

              <h3
                className={clsx(
                  "mt-6 text-[18px] font-medium leading-[1.15] text-black italic",
                  "lg:mt-16 lg:text-[38px] lg:leading-[1.05]",
                )}
              >
                {title}
              </h3>

              <p
                className={clsx(
                  "mt-4 max-w-[520px] whitespace-pre-line text-[12px] leading-[1.3] text-black/60",
                  "lg:mt-5 lg:text-[18px] lg:leading-[1.35] lg:text-black/55",
                )}
              >
                {text}
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="lg:col-span-6">
            <div
              className={clsx(
                "relative overflow-hidden rounded-[24px] bg-black/[0.02]",
                "min-h-[360px]",
                "lg:min-h-[520px] lg:rounded-[28px]",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
