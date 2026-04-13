import { notFound } from "next/navigation";
import { ConceptHeroSection } from "@/src/components/sections/ConeptHero/ConceptHeroSection";
import { CONCEPTS } from "@/src/components/sections/ConeptHero/data";
import { GalleryCarousel } from "@/src/components/sections/GalleryCarousel/GalleryCarousel";
import { FinishingOptionsBanner } from "@/src/components/sections/FinishingOptionsBanner/FinishingOptionsBanner";
import { MaterialsSection } from "@/src/components/sections/MaterialsSection/MaterialsSection";
import { InfoImageBlock } from "@/src/components/sections/InfoImageBlock/InfoImageBlock";
import { TwoHoverZonesBanner } from "@/src/components/sections/TwoHoverZonesBanner/TwoHoverZonesBanner";
import { RealizedCasesSection } from "@/src/components/sections/RealizedCasesSection/RealizedCasesSection";
import { CASES } from "@/src/components/sections/CasesCatalog/CasesCatalogSection";
import { Container } from "@/src/components/layout/Container";
import { SectionReveal } from "@/src/components/ui/SectionReveal";

type Props = {
  slug: string;
};

export function ConceptDetailPage({ slug }: Props) {
  const concept = CONCEPTS.find((c) => c.slug === slug);
  if (!concept) return notFound();

  const fallbackGallery = [
    concept.image,
    { src: "/images/hero.jpg", alt: "Hero" },
    { src: "/images/statsimg1.jpg", alt: "Stats 1" },
    { src: "/images/statsimg2.jpg", alt: "Stats 2" },
    { src: "/images/pathimg.jpg", alt: "Path" },
    { src: "/images/banner.png", alt: "Banner" },
    { src: "/images/banner.png", alt: "Banner" },
  ];

  const images = (
    concept.gallery?.length ? concept.gallery : fallbackGallery
  ).map((i) => ({ src: i.src, alt: i.alt }));

  const finishingIntroText =
    "Концепция Modern Loft создана для молодых профессионалов, IT-специалистов, креативных предпринимателей и всех, кто ценит открытое пространство с брутальными материалами и современным комфортом. Идеально подходит IT-фрилансерам, которым нужна интегрированная рабочая зона в общей гостиной, молодым парам без детей, предпочитающим просторную кухню-гостиную со спальней на галерее, а также креативным личностям, любящим акцентные кирпичные стены, металл, бетон и индустриальные светильники. Инвесторам в премиум-аренду стиль даёт среднюю ставку на 25% выше стандартных квартир.";

  return (
    <main className="bg-white text-black">
      <ConceptHeroSection concept={concept} />

      <SectionReveal delay={0.05}>
        <section className="py-14">
          <GalleryCarousel images={images} />
        </section>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <section className="bg-white">
          <Container>
            <p className="mx-auto max-w-[980px] text-center text-[14px] leading-[1.65] text-black/70">
              {finishingIntroText}
            </p>
          </Container>
        </section>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <FinishingOptionsBanner
          title="Варианты отделки"
          buttonLabel="Base / Select"
          buttonHref="/packages"
          subtitle="Описание ценовых категорий отделки"
          bgSrc="/images/concept.jpg"
        />
      </SectionReveal>

      <SectionReveal delay={0.12}>
        <MaterialsSection />
      </SectionReveal>

      <SectionReveal delay={0.14}>
        <InfoImageBlock
          index={1}
          title="Целевая аудитория"
          text="Концепция Modern Loft создана для молодых профессионалов, IT-специалистов, креативных предпринимателей и всех, кто ценит открытое пространство с брутальными материалами и современным комфортом."
          image={{
            src: "/images/concept.jpg",
            alt: "Target audience interior",
          }}
        />
      </SectionReveal>

      <SectionReveal delay={0.16}>
        <InfoImageBlock
          index={2}
          title="Образ жизни"
          text="..."
          image={{ src: "/images/concept.jpg", alt: "Lifestyle interior" }}
          reverse
        />
      </SectionReveal>

      <SectionReveal delay={0.18}>
        <TwoHoverZonesBanner
          imageSrc="/images/hero.jpg"
          left={{
            logoSrc: "/logo.svg",
            logoAlt: "SOVEGROUP",
            ctaLabel: "Подобрать объект",
            ctaHref: "/packages",
          }}
          right={{
            logoSrc: "/metod_logo.svg",
            logoAlt: "METOD ремонта",
            ctaLabel: "Подробнее",
            ctaHref: "/method",
          }}
        />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <RealizedCasesSection items={CASES} />
      </SectionReveal>
    </main>
  );
}
