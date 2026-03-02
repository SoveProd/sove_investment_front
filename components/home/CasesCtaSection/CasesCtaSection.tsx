import clsx from "clsx";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";

type Props = {
  // серое/чёрное/серое/чёрное/серое
  beforeAccent1: string;
  accent1: string;
  betweenAccents: string;
  accent2: string;
  afterAccent2: string;

  buttonLabel: string;
  href: string;
  className?: string;
};

export function CasesCtaSection({
  beforeAccent1,
  accent1,
  betweenAccents,
  accent2,
  afterAccent2,
  buttonLabel,
  href,
  className = "",
}: Props) {
  return (
    <section className={clsx("w-full bg-white py-[140px] max-lg:py-[80px]", className)}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2
            className={clsx(
              "max-w-5xl uppercase font-normal",
              "text-[55px] leading-[1.15] tracking-[0.02em]",
              "max-lg:text-[28px]"
            )}
          >
            <span className="text-text/40">{beforeAccent1} </span>
            <span className="text-dark">{accent1} </span>
            <span className="text-text/40">{betweenAccents} </span>
            <span className="text-dark">{accent2} </span>
            <span className="text-text/40">{afterAccent2}</span>
          </h2>

          <div className="mt-10">
            <ArrowButton label={buttonLabel} href={href} />
          </div>
        </div>
      </Container>
    </section>
  );
}