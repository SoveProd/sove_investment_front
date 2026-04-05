import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ArrowButton } from "@/components/ui/ArrowBtn";
import { Button } from "@/components/ui/Button";

type Metric = {
  label: string;
  value: string;
};

type Props = {
  reverse?: boolean;

  title: string;
  description: string;

  metricsTitle: string;
  metrics: Metric[];

  includedTitle: string;
  included: string[];

  alsoIncludedTitle: string;
  alsoIncluded: string[];

  primaryCtaLabel: string;
  primaryCtaHref: string;

  secondaryCtaLabel: string;
  secondaryCtaHref: string;

  images: {
    left: { src: string; alt: string };
    right: { src: string; alt: string };
  };
};

export function ReadyConceptSection({
  reverse = false,
  title,
  description,
  metricsTitle,
  metrics,
  includedTitle,
  included,
  alsoIncludedTitle,
  alsoIncluded,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  images,
}: Props) {
  return (
    <section className="bg-[#f3f3f3] pt-0 pb-[56px] md:pb-[80px]">
      <Container>
        {/* MOBILE */}
        <div className="rounded-[24px] bg-white p-4 lg:hidden">
          <div>
            <h2 className="text-[16px] font-medium leading-[1.1] text-[#1f1f1f]">
              {title}
            </h2>

            <p className="mt-2 text-[10px] leading-[1.35] text-black/60">
              {description}
            </p>

            {/* Metrics */}
            <div className="mt-4">
              <p className="text-[12px] font-medium text-[#1f1f1f]">
                {metricsTitle}
              </p>

              <div className="mt-2 space-y-1">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/10 py-1.5 text-[10px]"
                  >
                    <span className="text-black/65">{m.label}</span>
                    <span className="text-right font-medium text-black/70">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div className="mt-4">
              <p className="text-[12px] font-medium text-[#1f1f1f]">
                {includedTitle}
              </p>

              <ul className="mt-2 space-y-1 text-[10px] leading-[1.3] text-black/65">
                {included.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-black/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Also included */}
            <div className="mt-4">
              <p className="text-[12px] font-medium text-[#1f1f1f]">
                {alsoIncludedTitle}
              </p>

              <ul className="mt-2 space-y-1 text-[10px] leading-[1.3] text-black/65">
                {alsoIncluded.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-black/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Images */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div
                className="relative overflow-hidden rounded-[16px] bg-black/5"
                style={{ aspectRatio: "150 / 189" }}
              >
                <Image
                  src={images.left.src}
                  alt={images.left.alt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              <div
                className="relative overflow-hidden rounded-[16px] bg-black/5"
                style={{ aspectRatio: "150 / 189" }}
              >
                <Image
                  src={images.right.src}
                  alt={images.right.alt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 flex items-center gap-2">
              <ArrowButton
                href={primaryCtaHref}
                label={primaryCtaLabel}
                mobile
                className="w-[151px] shrink-0"
              />

              <Button
                href={secondaryCtaHref}
                variant="secondaryLight"
                size="sm"
                maxWidth={false}
                className="h-[45px] w-[129px] shrink-0 rounded-full border border-[#E3E3E3] bg-[#F7F7F7] px-0 text-[12px] font-medium normal-case text-[#1f1f1f] hover:bg-black/5"
              >
                {secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden rounded-[40px] bg-white p-8 md:p-12 lg:block">
          <div
            className={[
              "grid gap-10 lg:items-start",
              reverse
                ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,559px)]"
                : "lg:grid-cols-[minmax(0,559px)_minmax(0,1fr)]",
            ].join(" ")}
          >
            {reverse && <ImagesBlock images={images} />}

            <div className="lg:max-w-[559px]">
              <h2 className="text-[34px] font-medium leading-tight text-[#1f1f1f]">
                {title}
              </h2>

              <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-black/60">
                {description}
              </p>

              <div className="mt-7">
                <p className="text-[16px] font-medium text-[#1f1f1f]">
                  {metricsTitle}
                </p>

                <div className="mt-3 space-y-2">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between gap-6 border-b border-black/10 py-2 text-[14px]"
                    >
                      <span className="text-black/65">{m.label}</span>
                      <span className="font-medium text-black/70">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="text-[16px] font-medium text-[#1f1f1f]">
                  {includedTitle}
                </p>

                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-black/65">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[8px] h-[4px] w-[4px] rounded-full bg-black/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p className="text-[16px] font-medium text-[#1f1f1f]">
                  {alsoIncludedTitle}
                </p>

                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-black/65">
                  {alsoIncluded.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[8px] h-[4px] w-[4px] rounded-full bg-black/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-[22px] sm:flex-nowrap">
                <div className="shrink-0">
                  <ArrowButton href={primaryCtaHref} label={primaryCtaLabel} />
                </div>

                <div className="shrink-0">
                  <Button
                    href={secondaryCtaHref}
                    variant="secondaryLight"
                    size="sm"
                    className="h-[71px] w-[235px] max-w-none rounded-[62px] border border-[#E3E3E3] bg-[#F7F7F7] px-0 text-[18px] font-medium normal-case text-[#1f1f1f] hover:bg-black/5"
                  >
                    {secondaryCtaLabel}
                  </Button>
                </div>
              </div>
            </div>

            {!reverse && <ImagesBlock images={images} />}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ImagesBlock({ images }: { images: Props["images"] }) {
  return (
    <div className="flex flex-wrap justify-start gap-[22px] xl:flex-nowrap xl:items-start">
      <div
        className="relative w-full max-w-[536px] overflow-hidden rounded-[40px] bg-black/5"
        style={{ aspectRatio: "536 / 825" }}
      >
        <Image
          src={images.left.src}
          alt={images.left.alt}
          fill
          className="object-cover"
        />
      </div>

      <div
        className="relative w-full max-w-[536px] overflow-hidden rounded-[40px] bg-black/5"
        style={{ aspectRatio: "536 / 737" }}
      >
        <Image
          src={images.right.src}
          alt={images.right.alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
