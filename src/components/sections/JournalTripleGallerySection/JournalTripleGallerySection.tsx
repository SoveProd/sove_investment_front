import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";

type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: [GalleryImage, GalleryImage, GalleryImage]; // ровно 3
  text: string; // 2 абзаца через пустую строку
  className?: string;
};

export function JournalTripleGallerySection({
  images,
  text,
  className,
}: Props) {
  return (
    <section className={clsx("py-14 max-lg:py-10", className)}>
      <Container>
        {/* 3 images */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-lg:gap-6">
          {images.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              className={clsx(
                "relative w-full overflow-hidden bg-black/5",
                "rounded-[35px]",
                // ✅ как в фигме: H 644 (desktop)
                "h-[644px] max-lg:h-[380px] max-md:h-[320px]",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={false}
              />
            </div>
          ))}
        </div>

        {/* text (2 paragraphs) */}
        <div className="mx-auto mt-10 max-w-[980px] text-center max-lg:mt-8">
          <p
            className={clsx(
              "whitespace-pre-line",
              // ✅ как на скрине: журнальный стиль
              "font-serif italic",
              "text-[16px] leading-[1.75] text-black/55",
              "max-lg:text-[14px] max-lg:leading-[1.7]",
            )}
          >
            {text}
          </p>
        </div>
      </Container>
    </section>
  );
}
