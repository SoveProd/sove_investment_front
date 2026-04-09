import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "../ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { CmsHeroBlock } from "@/lib/cms/types";

type Props = {
  block?: CmsHeroBlock;
};

export function Hero({ block }: Props) {
  const title = block?.title || "SOVE. PROPTECH\nPLATFORM & DESIGN.";
  const text =
    block?.text ||
    "Инвестиционный ремонт по новым правилам. Технологии, прозрачность, контроль.";

  const mediaSrc = block?.media?.[0]?.file_url || "/images/hero.jpg";

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={mediaSrc}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-end pb-12 sm:pb-14 lg:pb-16">
        <div className="grid w-full items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <h1 className="whitespace-pre-line font-light leading-[1.02] tracking-wide text-white text-[34px] sm:text-[44px] lg:text-[52px] xl:text-[60px]">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-[620px] leading-relaxed text-white/75 text-[12px] sm:text-[13px] lg:text-[13px] xl:text-[14px]">
                {text}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="flex w-full flex-col gap-3 sm:gap-4 sm:max-w-[420px]">
              <Reveal delay={0.22}>
                <Button
                  href="/packages"
                  variant="primary"
                  size="md"
                  fullWidth
                  maxWidth={false}
                  className="rounded-full"
                >
                  НАЧАТЬ ИНВЕСТ-РЕМОНТ
                </Button>
              </Reveal>

              <Reveal delay={0.32}>
                <Button
                  href="/concepts"
                  variant="outlineDark"
                  size="md"
                  fullWidth
                  maxWidth={false}
                  className="rounded-full border-white/40 hover:border-white/70"
                >
                  ПОСМОТРЕТЬ КОНЦЕПЦИИ
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
