import Image from "next/image";
import { Container } from "@/src/components/layout/Container";

type Props = {
  kicker?: string;
  kickerLogoSrc?: string;
  kickerLogoAlt?: string;
  title: string | string[];
  subtitle?: string;
  imageSrc: string;
  overlayClassName?: string;
};

export function PageHero({
  kicker,
  kickerLogoSrc,
  kickerLogoAlt = "",
  title,
  subtitle,
  imageSrc,
  overlayClassName = "bg-black/35",
}: Props) {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <section className="relative mb-[48px] overflow-hidden sm:mb-[60px] lg:mb-[80px]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
      </div>

      {/* Height */}
      <div className="relative h-[620px] sm:h-[680px] md:h-[660px] lg:h-[717px]">
        <Container className="relative h-full">
          {/* MOBILE */}
          <div className="flex h-full flex-col justify-end pb-10 sm:pb-12 md:hidden">
            <div className="max-w-[340px] text-left">
              {kickerLogoSrc && (
                <div className="mb-3">
                  <Image
                    src={kickerLogoSrc}
                    alt={kickerLogoAlt}
                    width={303}
                    height={29}
                    className="h-[18px] w-auto opacity-90"
                  />
                </div>
              )}
              {kicker && (
                <div className="mb-3 text-[12px] font-normal uppercase tracking-[0.22em] text-white/80">
                  {kicker}
                </div>
              )}
              <h1 className="text-[28px] font-normal uppercase leading-[1.02] tracking-[-0.02em] text-white">
                {titleLines.map((line, idx) => (
                  <span key={`${line}-${idx}`}>
                    {line}
                    {idx !== titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {subtitle && (
                <p className="mt-3 whitespace-pre-line text-[12px] leading-[1.35] text-white/85">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* TABLET / DESKTOP */}
          <div className="hidden h-full md:flex md:flex-col md:items-center md:justify-center md:text-center">
            <div className="max-w-[1800px]">
              {kickerLogoSrc && (
                <div className="mb-5 flex justify-center">
                  <Image
                    src={kickerLogoSrc}
                    alt={kickerLogoAlt}
                    width={303}
                    height={29}
                    className="h-[22px] w-auto opacity-90 lg:h-[26px]"
                  />
                </div>
              )}
              {kicker && (
                <div className="mb-5 text-[12px] font-normal uppercase tracking-[0.28em] text-white/80 md:text-[13px] lg:text-[14px]">
                  {kicker}
                </div>
              )}
              <h1 className="text-[40px] font-normal uppercase leading-[1.08] tracking-[-0.02em] text-white md:text-[52px] lg:text-[60px]">
                {titleLines.map((line, idx) => (
                  <span key={`${line}-${idx}`}>
                    {line}
                    {idx !== titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {subtitle && (
                <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.35] text-white/80 md:text-[20px] lg:mt-[22px] lg:text-[23px]">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
