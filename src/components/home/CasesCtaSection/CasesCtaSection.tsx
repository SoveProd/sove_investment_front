import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";
import { ArrowButton } from "@/src/components/ui/ArrowBtn";
import type { CmsBlock, CmsButton } from "@/lib/cms/types";

type Props = {
  block?: CmsBlock;
  href: string;
  className?: string;
};

export function CasesCtaSection({ block, href, className = "" }: Props) {
  const buttons: CmsButton[] = Array.isArray(block?.button)
    ? block.button
    : block?.button
      ? [block.button]
      : [];

  const buttonLabel =
    buttons.find((button) => button.position === 0)?.name ||
    "Посмотри наши кейсы";

  const text =
    block?.text ||
    "Мы меняем правила ремонта! Теперь вы сами решаете - доверить управление всеми процессами SOVE или использовать всех наших подрядчиков самостоятельно";

  return (
    <section className={clsx("w-full py-[140px] max-lg:py-[80px]", className)}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2
            className={clsx(
              "uppercase font-normal text-dark",
              "text-[52px] leading-[1.05] tracking-[0.01em]",
              "max-xl:text-[42px]",
              "max-lg:text-[28px] max-lg:leading-[1.15]",
            )}
          >
            {text}
          </h2>

          <div className="mt-10 max-lg:mt-8">
            <ArrowButton label={buttonLabel} href={href} />
          </div>
        </div>
      </Container>
    </section>
  );
}
