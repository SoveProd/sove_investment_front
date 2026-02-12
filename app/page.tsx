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
          topLine="Мы работаем"
          middleLine="Только с проверенными объектами и опытными командами."
          bottomLine="Твой капитал всегда под контролем."
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
        <ThreeHoverZones />
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
