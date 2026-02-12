import { Container } from "@/components/layout/Container";
import { ArrowButton } from "../../ui/ArrowBtn";

type CasesCtaSectionProps = {
  topLine: string; // "МЫ РАБОТАЕМ"
  middleLine: string; // "ТОЛЬКО С ПРОВЕРЕННЫМИ ОБЪЕКТАМИ И ОПЫТНЫМИ КОМАНДАМИ."
  bottomLine: string; // "ТВОЙ КАПИТАЛ ВСЕГДА ПОД КОНТРОЛЕМ."
  buttonLabel: string;
  href: string;
  className?: string;
};

export function CasesCtaSection({
  topLine,
  middleLine,
  bottomLine,
  buttonLabel,
  href,
  className = "",
}: CasesCtaSectionProps) {
  return (
    <section
      className={[
        "w-full bg-white py-[140px] max-lg:py-[80px]",
        className,
      ].join(" ")}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2
            className={[
              "max-w-5xl uppercase",
              "text-[55px] leading-[1.15] tracking-[0.02em]",
              "max-lg:text-[28px]",
              "font-normal",
            ].join(" ")}
          >
            <span className="text-text/70">{topLine}</span>
           
            <span className="text-dark">{middleLine}</span>

            <span className="text-text/70">{bottomLine}</span>
          </h2>

          <div className="mt-10">
            <ArrowButton label={buttonLabel} href={href} />
          </div>
        </div>
      </Container>
    </section>
  );
}
