import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

type TextCard = {
  type: "text";
  id: string;
  indexLabel: string; // "[1]"
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
    title: "Персональное\nсопровождение",
    description:
      "Наш опытный менеджер проведет вас через каждый этап инвестиций. Мы предоставляем детальные консультации, помогаем выбрать лучший объект и поддерживаем на протяжении всего проекта.",
    href: "#",
  },
  { type: "image", id: "i1", imageSrc: "/images/statsimg1.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t3",
    indexLabel: "[3]",
    title: "Гарантированная\nбезопасность",
    description:
      "Мы гарантируем, что каждый проект безопасен и защищен. Все объекты проходят тщательную проверку, привлекаются эксперты и страхование, чтобы защитить ваши интересы.",
    href: "#",
  },
  { type: "image", id: "i2", imageSrc: "/images/hero.jpg", imageAlt: "" },

  { type: "image", id: "i3", imageSrc: "/images/statsimg1.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t2",
    indexLabel: "[2]",
    title: "Экспертиза\nи опыт",
    description:
      "Нет времени становиться экспертом в сфере недвижимости? Это хорошо, мы здесь. Наша команда имеет многолетний опыт в подборе, управлении и оптимизации инвестиционных проектов.",
    href: "#",
  },

  { type: "image", id: "i4", imageSrc: "/images/statsimg1.jpg", imageAlt: "" },

  {
    type: "text",
    id: "t4",
    indexLabel: "[4]",
    title: "Максимальная\nдоходность",
    description:
      "Наш опытный менеджер проводит вас через каждый этап инвестиций. Мы предоставляем детальные консультации, помогаем выбрать лучший объект и поддерживаем на протяжении всего проекта.",
    href: "#",
  },
];

export function DesignMosaicSection() {
  return (
    <section className="w-full bg-bg py-[150px] max-lg:py-[80px]">
      <Container>
        <h2 className="text-center text-[55px] font-medium tracking-[-0.02em] text-dark max-lg:text-[34px]">
          Инвестируйте в дизайн недвижимости под ключ
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            if (item.type === "image") {
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[48px] bg-white"
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
        {/* SVG SHAPE + CONTENT */}
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

        {/* Arrow in notch */}
        <div className="absolute bottom-4 right-4 z-[3] grid h-[52px] w-[52px] place-items-center rounded-full bg-white text-dark shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:scale-[1.03]">
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
}

function MaskedPanel({ children }: { children: React.ReactNode }) {
  // ВАЖНО: чтобы использовать ваши токены — лучше fill через CSS-переменную как в StatsMosaic
  // Если у тебя bg-dark === var(--color-graphite), то так будет идеально.
  const shapeFill = "var(--color-graphite)";

  return (
    <div className="relative aspect-[4/5] w-full">
      {/* SVG SHAPE */}
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

      {/* CONTENT */}
      <div className="relative z-[2] h-full w-full">{children}</div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
