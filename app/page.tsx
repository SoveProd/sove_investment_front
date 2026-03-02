import { FindYourPathSection } from "@/components/home/FindYourPath";
import { Hero } from "@/components/home/Hero";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import { StatsMosaic } from "@/components/home/StatsMosaic";
import TryItSection from "@/components/home/TryIt/TryItSection";
import { RealEstate } from "@/components/home/RealEstate/RealEstate";
import { CasesCtaSection } from "@/components/home/CasesCtaSection/CasesCtaSection";
import { DesignMosaicSection } from "@/components/home/DesignMosaicSection/DesignMosaicsection";
import HowItWorksSection from "@/components/home/HowItWorks/HowItWorksSection";
import WhyInvestAccordionSection from "@/components/home/WhyIvest/WhyInvestAccordionSection";
import { ThreeHoverZones } from "@/components/home/FeatureZone/FeatureZone";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner/CtaBanner";

import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <>
      <SectionReveal>
        <Hero />
      </SectionReveal>

      <SectionReveal>
        <StatsMosaic />
      </SectionReveal>

      <SectionReveal>
        <FindYourPathSection />
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
        <CasesCtaSection
          beforeAccent1="Мы меняем правила ремонта!"
          accent1="Теперь вы сами решаете -"
          betweenAccents="доверить управление всеми процессами SOVE"
          accent2="или использовать всех"
          afterAccent2="наших подрядчиков самостоятельно"
          buttonLabel="Посмотри наши кейсы"
          href="/cases"
        />
      </SectionReveal>


      <SectionReveal>
        <DesignMosaicSection />
      </SectionReveal>

      <SectionReveal>
        <HowItWorksSection />
      </SectionReveal>

      <SectionReveal>
        <WhyInvestAccordionSection />
      </SectionReveal>

      <SectionReveal>
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
