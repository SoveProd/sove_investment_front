import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type Props = {
  title?: string;
  bgSrc?: string;
};

export function CtaBanner({
  title = "ГОТОВ НАЧАТЬ\nИНВЕСТИРОВАТЬ?",
  bgSrc = "/images/banner.png",
}: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <Container className="relative">
        <div className="flex min-h-screen flex-col justify-between py-32 max-lg:py-12">
          <h2 className="whitespace-pre-line text-[60px] font-medium leading-[1.05] tracking-[-0.02em] text-white max-lg:text-[60px]">
            {title}
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" variant="primary">
              ЗАПОЛНИТЬ ЗАЯВКУ
            </Button>

            <Button href="/consultation" variant="outline">
              ПРОКОНСУЛЬТИРОВАТЬСЯ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
