import Image from "next/image";
import { Container } from "@/components/layout/Container";

type Props = {
  title: string | string[];
  subtitle?: string;
  imageSrc: string;
  overlayClassName?: string;
};

export function PageHero({

  title,
  subtitle,
  imageSrc,
  overlayClassName = "bg-black/45",
}: Props) {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <section className="relative overflow-hidden mb-[80px]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={imageSrc} alt="" fill priority className="object-cover" />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Exact desktop height */}
      <div className="relative h-[520px] sm:h-[600px] md:h-[660px] lg:h-[717px]">
        <Container className="relative h-full">
          <div className="flex h-full flex-col items-center justify-center text-center">
            {/* Main Title */}
            <h1 className="text-[40px] font-regular leading-[1.08] tracking-wide text-white md:text-[52px] lg:text-[60px]">
              {titleLines.map((line, idx) => (
                <span key={`${line}-${idx}`}>
                  {line}
                  {idx !== titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-[22px] text-[18px] text-white/80 md:text-[20px] lg:text-[23px] whitespace-pre-line">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}