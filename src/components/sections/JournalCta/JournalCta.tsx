import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/layout/Container";

type Props = {
  image: { src: string; alt: string };
  title?: string;
  buttonLabel?: string;
  href?: string;
};

export function JournalCtaSection({
  image,
  title = "Получи полезные материалы",
  buttonLabel = "Перейти в MiniApp",
  href = "/miniapp",
}: Props) {
  return (
    <section className="w-full pt-10 pb-16">
      {/* ✅ full width image with fixed height 506 */}
      <div className="w-full px-6 max-lg:px-4">
        <div className="relative mx-auto w-full overflow-hidden rounded-[28px] bg-black/5">
          <div className="relative h-[506px] w-full max-lg:h-[320px] max-md:h-[240px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* centered content */}
      <Container className="mt-10">
        <div className="text-center">
          <h3 className="text-[22px] font-medium text-black/80 max-lg:text-[18px]">
            {title}
          </h3>

          <div className="mt-5 flex justify-center">
            <MiniCtaButton href={href} label={buttonLabel} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function MiniCtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-3",
        "h-[56px] rounded-full",
        "bg-primary px-7",
        "text-[16px] font-medium text-white",
        "transition hover:bg-primaryHover",
      ].join(" ")}
      aria-label={label}
    >
      <span className="whitespace-nowrap">{label}</span>

      <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-surface text-primary">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 17L17 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M10 7h7v7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
