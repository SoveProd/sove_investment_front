import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";
import { ArrowButton } from "@/src/components/ui/ArrowBtn";
import type { CmsBlock, CmsButton } from "@/lib/cms/types";

function splitAccentText(raw: string): { primary: string; secondary: string } {
  const text = (raw || "").trim();
  if (!text) return { primary: "", secondary: "" };

  // Manual control from CMS: "black part || gray part"
  if (text.includes("||")) {
    const [primary, ...rest] = text.split("||");
    return { primary: (primary || "").trim(), secondary: rest.join("||").trim() };
  }

  // Fallback: keep first 2 sentences as primary, rest as secondary.
  // This matches common "headline + supporting line" style.
  const parts = text.split(/(?<=[.!?])\s+/);
  const primary = parts.slice(0, 2).join(" ").trim();
  const secondary = parts.slice(2).join(" ").trim();
  return { primary, secondary };
}

function getAccentParts(block: CmsBlock | undefined): {
  grayTop: string;
  blackMain: string;
  grayBottom: string;
} {
  const content =
    block?.content && typeof block.content === "object" ? block.content : null;

  // Preferred backend format:
  // content: { grey_1: string, dark: string, grey_2: string }
  if (content) {
    const grey1 =
      "grey_1" in content && typeof content.grey_1 === "string"
        ? content.grey_1
        : "";
    const dark =
      "dark" in content && typeof content.dark === "string" ? content.dark : "";
    const grey2 =
      "grey_2" in content && typeof content.grey_2 === "string"
        ? content.grey_2
        : "";

    if (grey1 || dark || grey2) {
      return { grayTop: grey1, blackMain: dark, grayBottom: grey2 };
    }
  }

  const rawText =
    block?.text ||
    "Мы меняем правила ремонта! Теперь вы сами решаете - доверить управление всеми процессами SOVE или использовать всех наших подрядчиков самостоятельно";
  const { primary, secondary } = splitAccentText(rawText);
  return { grayTop: "", blackMain: primary, grayBottom: secondary };
}

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

  const { grayTop, blackMain, grayBottom } = getAccentParts(block);

  return (
    <section className={clsx("w-full py-[140px] max-lg:py-[80px]", className)}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2
            className={clsx(
              "uppercase font-normal text-dark",
              "text-[45px] leading-[1.05] tracking-[0.01em]",
              "max-xl:text-[42px]",
              "max-lg:text-[28px] max-lg:leading-[1.15] px-4", 
            )}
          >
            {grayTop ? <span className="text-neutral-400">{grayTop} </span> : null}
            <span className="text-neutral-900">{blackMain}</span>
            {grayBottom ? <span className="text-neutral-400"> {grayBottom}</span> : null}
          </h2>

          <div className="mt-10 max-lg:mt-8">
            <ArrowButton label={buttonLabel} href={href} size="compact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
