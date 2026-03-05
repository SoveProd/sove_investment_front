import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

type Props = {
  index: number | string; // 1 / 2 / 3 ...
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean; // если true — картинка слева, текст справа
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
    <section className={clsx("w-full bg-white py-14", className)}>
      <Container>
        <div
          className={clsx(
            "grid grid-cols-12 items-stretch gap-6",
            reverse ? "lg:[&>*:first-child]:order-2" : "",
          )}
        >
          {/* TEXT CARD */}
          <div className="col-span-12 lg:col-span-6">
            <div
              className={clsx(
                "h-full rounded-[28px] bg-white",
                "px-12 py-12 max-lg:px-8 max-lg:py-10",
                // очень лёгкий бордер + мягкая тень как на скрине
                "border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.06)]",
              )}
            >
              <div className="text-[28px] font-medium text-black/10 max-lg:text-[24px]">
                [{index}]
              </div>

              <h3 className="mt-16 text-[38px] font-medium leading-[1.05] text-black max-lg:mt-10 max-lg:text-[30px]">
                {title}
              </h3>

              <p className="mt-5 max-w-[520px] whitespace-pre-line text-[18px] leading-[1.35] text-black/55 max-lg:text-[16px]">
                {text}
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-[28px] bg-black/[0.02] max-lg:min-h-[360px]">
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
