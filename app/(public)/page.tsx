import { FindYourPathSection } from "@/components/home/FindYourPath";
import { Hero } from "@/components/home/Hero";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import { StatsMosaic } from "@/components/home/StatsMosaic";
import TryItSection from "@/components/home/TryIt/TryItSection";
import { RealEstate } from "@/components/home/RealEstate/RealEstate";
import { CasesCtaSection } from "@/components/home/CasesCtaSection/CasesCtaSection";
import { DesignMosaicSection } from "@/components/home/DesignMosaicSection/DesignMosaicsection";
import HowItWorksSection from "@/components/home/HowItWorks/HowItWorksSection";
import { ThreeHoverZones } from "@/components/home/FeatureZone/FeatureZone";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner/CtaBanner";

import { SectionReveal } from "@/components/ui/SectionReveal";
import Image from "next/image";
import {
  getHomepageHeroBlock,
  getHomepageMetricsBlock,
  getPublishedHomepage,
} from "@/lib/cms/homepage";

export default async function Home() {
  const homepage = await getPublishedHomepage();

  const heroBlock = getHomepageHeroBlock(homepage);
  const metricsBlock = getHomepageMetricsBlock(homepage);

  return (
    <>
      <SectionReveal>
        <Hero block={heroBlock} />
      </SectionReveal>

      <SectionReveal>
        <StatsMosaic block={metricsBlock} />
      </SectionReveal>

      <SectionReveal>
        <FindYourPathSection />
      </SectionReveal>

      <SectionReveal>
        <CasesCtaSection buttonLabel="Посмотри наши кейсы" href="/cases" />
      </SectionReveal>

      <SectionReveal>
        <TryItSection />
      </SectionReveal>

      <SectionReveal>
        <PopularConcepts />
      </SectionReveal>

      <SectionReveal>
        <RealEstate />
      </SectionReveal>

      <SectionReveal>
        <DesignMosaicSection />
      </SectionReveal>

      <SectionReveal>
        <HowItWorksSection />
      </SectionReveal>

      <SectionReveal>
        <div className="bg-white">
          <div className="flex justify-center pt-10 pb-6">
            <Image
              src="/logo_dark.svg"
              alt="SOVE GROUP"
              width={443}
              height={42}
              priority
              className="opacity-90"
            />
          </div>

          <ThreeHoverZones
            imageSrc="/images/hero.jpg"
            zones={[
              {
                title: "Современный дизайн",
                text: "Наши дизайнеры создают концепции...",
              },
              {
                title: "Профессиональное\nуправление",
                text: "Берём на себя процесс...",
              },
              {
                title: "Гарантированная ROI",
                text: "Работаем на результат...",
              },
            ]}
          />
        </div>
      </SectionReveal>

      <SectionReveal>
        <TestimonialsSection />
      </SectionReveal>

      <SectionReveal>
        <CtaBanner />
      </SectionReveal>
    </>
  );
}
