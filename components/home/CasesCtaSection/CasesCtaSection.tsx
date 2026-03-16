import clsx from "clsx";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";

type Props = {
  buttonLabel: string;
  href: string;
  className?: string;
};

export function CasesCtaSection({ buttonLabel, href, className = "" }: Props) {
  return (
    <section
      className={clsx("w-full  py-[140px] max-lg:py-[80px]", className)}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2
            className={clsx(
              "uppercase font-normal",
              "text-[52px] leading-[1.05] tracking-[0.01em]",
              "max-xl:text-[42px]",
              "max-lg:text-[28px] max-lg:leading-[1.15]",
            )}
          >
            <span className="block">
              <span className="text-text/35">Мы меняем правила ремонта!</span>{" "}
              <span className="text-dark">Теперь вы сами</span>
            </span>

            <span className="block text-dark">
              решаете - доверить управление всеми
            </span>

            <span className="block">
              <span className="text-dark">процессами SOVE</span>{" "}
              <span className="text-text/35">или использовать всех</span>
            </span>

            <span className="block text-text/35">
              наших подрядчиков самостоятельно
            </span>
          </h2>

          <div className="mt-10 max-lg:mt-8">
            <ArrowButton label={buttonLabel} href={href} />
          </div>
        </div>
      </Container>
    </section>
  );
}
