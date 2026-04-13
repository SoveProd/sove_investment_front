import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/layout/Container";

type TextCard = {
  type: "text";
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  href: string;
};

type ImageCard = {
  type: "image";
  id: string;
  imageSrc: string;
  imageAlt: string;
};

type MosaicItem = TextCard | ImageCard;

const items: MosaicItem[] = [
  {
    type: "text",
    id: "t1",
    indexLabel: "[1]",
    title: "ТЕХНОЛОГИЧНОСТЬ",
    description:
      "Платформа объединяет все этапы от выбора инвестиционного объекта до сдачи в аренду и обслуживания управляющей.",
    href: "#",
  },
  { type: "image", id: "i1", imageSrc: "/images/statsimg1.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t2",
    indexLabel: "[2]",
    title: "БЕЗОПАСНОСТЬ",
    description:
      "Вы видите реальную смету и расписание платежей. Юридические решения, техническая и финансовая система без серых зон.",
    href: "#",
  },
  { type: "image", id: "i2", imageSrc: "/images/hero.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t3",
    indexLabel: "[3]",
    title: "СТАНДАРТ",
    description:
      "SOVE работает как операционная система в девелопменте, исключающая хаос, двойную бухгалтерию и зависимость от случайных решений.",
    href: "#",
  },
  { type: "image", id: "i3", imageSrc: "/images/pathimg.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t4",
    indexLabel: "[4]",
    title: "КОНТРОЛЬ",
    description:
      "Используйте готовые регламентированные решения SOVE в закупке, логистике, ремонте, финансировании и масштабировании.",
    href: "#",
  },
  { type: "image", id: "i4", imageSrc: "/images/statsimg2.jpg", imageAlt: "" },
];

export function DesignMosaicSection() {
  return (
    <section className="w-full bg-bg py-[56px] sm:py-[80px] lg:py-[150px]">
      <Container>
        <h2 className="text-center text-[28px] font-medium leading-[1.08] tracking-[-0.02em] text-dark sm:text-[34px] lg:text-[55px]">
          Инвестируйте в дизайн
          <br className="sm:hidden" /> недвижимости под ключ
        </h2>

        {/* MOBILE */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:hidden">
          {items.map((item) => {
            if (item.type === "image") {
              return (
                <MobileImageCard
                  key={item.id}
                  src={item.imageSrc}
                  alt={item.imageAlt}
                />
              );
            }

            return (
              <MobileTextFeatureCard
                key={item.id}
                indexLabel={item.indexLabel}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            );
          })}
        </div>

        {/* TABLET / DESKTOP */}
        <div className="mt-12 hidden sm:grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => {
            if (item.type === "image") {
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[36px] lg:rounded-[48px] bg-white"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              );
            }

            return (
              <TextFeatureCard
                key={item.id}
                indexLabel={item.indexLabel}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function MobileImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] bg-white">
      <div className="relative h-[257px] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="343px"
          className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
function MobileTextFeatureCard({
  indexLabel,
  title,
  description,
  href,
}: {
  indexLabel: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block" aria-label={title}>
      <div className="relative h-[257px] w-full rounded-[28px] bg-graphite p-6">
        <span className="text-[12px] text-white/70">{indexLabel}</span>

        <h3 className="mt-4 text-[18px] font-medium text-white">{title}</h3>

        <p className="mt-6 max-w-[240px] text-[12px] leading-[1.4] text-white/70">
          {description}
        </p>

        {/* SPACE FOR ARROW */}
        <div className="absolute bottom-0 right-0 h-[90px] w-[90px]" />

        {/* ARROW */}
        <div className="absolute bottom-3 right-3 grid h-[52px] w-[52px] place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
}

function MobileMaskedPanel({ children }: { children: React.ReactNode }) {
  const shapeFill = "var(--color-graphite)";

  return (
    <div className="relative h-[257px] w-full">
      <svg
        viewBox="0 0 343 257"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C0 10.7452 10.7452 0 24 0H319C332.255 0 343 10.7452 343 24V196C343 209.255 332.255 220 319 220H302C283.775 220 269 234.775 269 253V257H24C10.7452 257 0 246.255 0 233V24Z"
          fill={shapeFill}
        />
      </svg>

      <div className="relative z-[2] h-full w-full">{children}</div>
    </div>
  );
}
function TextFeatureCard({
  indexLabel,
  title,
  description,
  href,
}: {
  indexLabel: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block" aria-label={title}>
      <div className="relative h-full w-full">
        <MaskedPanel>
          <div className="flex h-full flex-col p-8">
            <span className="text-[14px] text-white/70">{indexLabel}</span>

            <h3 className="mt-4 whitespace-pre-line text-[20px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              {title}
            </h3>

            <p className="mt-auto max-w-[260px] text-[13px] leading-5 text-white/70">
              {description}
            </p>
          </div>
        </MaskedPanel>

        <div className="absolute bottom-4 right-4 z-[3] grid h-[52px] w-[52px] place-items-center rounded-full bg-white text-dark shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:scale-[1.03]">
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
}

function MaskedPanel({ children }: { children: React.ReactNode }) {
  const shapeFill = "var(--color-graphite)";

  return (
    <div className="relative aspect-[4/5] w-full">
      <svg
        viewBox="0 0 419 546"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M0 35C0 15.6701 15.67 0 35 0H384C403.33 0 419 15.67 419 35V420C419 439.33 403.33 455 384 455H377C349.938 455 328 476.938 328 504V511C328 530.33 312.33 546 293 546H35C15.67 546 0 530.33 0 511V35Z"
          fill={shapeFill}
        />
      </svg>

      <div className="relative z-[2] h-full w-full">{children}</div>
    </div>
  );
}

function ArrowIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      width={small ? "14" : "18"}
      height={small ? "14" : "18"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
