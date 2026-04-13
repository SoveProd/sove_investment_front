import Image from "next/image";
import { Container } from "@/src/components/layout/Container";
import { Button } from "@/src/components/ui/Button";

type Props = {
  image: {
    src: string;
    alt: string;
  };
  text: string;
  buttonLabel: string;
  buttonHref: string;
};

export function JournalContinueSection({
  image,
  text,
  buttonLabel,
  buttonHref,
}: Props) {
  return (
    <section className="py-12 max-lg:py-10">
      <Container>
        {/* IMAGE */}
        <div className="relative h-[420px] w-full overflow-hidden rounded-[24px] max-lg:h-[300px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1120px, 100vw"
          />
        </div>

        {/* TEXT */}
        <div className="mx-auto mt-8 max-w-[820px] text-center">
          <p className="whitespace-pre-line text-[12px] leading-6 text-black/60">
            {text}
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-center">
          <Button href={buttonHref} variant="primary" size="md">
            {buttonLabel}
          </Button>
        </div>

        {/* TITLE BELOW */}
        <h2 className="mt-14 text-center text-[22px] font-medium text-black">
          Похожие материалы
        </h2>
      </Container>
    </section>
  );
}
