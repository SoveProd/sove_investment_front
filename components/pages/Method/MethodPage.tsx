import { MethodHero } from "@/components/sections/MethodHero/MethodHero";
import { CasesCtaSection } from "@/components/home/CasesCtaSection/CasesCtaSection";
import { MethodStatsSection } from "@/components/sections/MethodStats/MethodStatsSection";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import { MethodAccordionSection } from "@/components/sections/MethodAccordion/MethodAccordion";
import { METHOD_ACCORDION_ITEMS } from "@/components/sections/MethodAccordion/data";
import { MethodPricingSection } from "@/components/sections/MethodPricing/MethodPricingSection";
import { METHOD_PRICING_PLANS } from "@/components/sections/MethodPricing/data";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";
import { PackagesFaqSection } from "@/components/sections/PackagesFaq/PackagesFaqSection";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SELF_TRY_PLANS } from "@/components/sections/SelfTrySection/data";
import { SelfTrySection } from "@/components/sections/SelfTrySection/SelfTrySection";

export function MethodPage() {
  return (
    <main className="bg-white text-black">
      {/* Hero (можно оставить без reveal — но если хочешь, будет мягкий fade-in) */}
      <SectionReveal delay={0}>
        <MethodHero />
      </SectionReveal>

      <SectionReveal delay={0.05} className="mt-6">
        <CasesCtaSection
          beforeAccent1="МЫ РАБОТАЕМ"
          accent1="ТОЛЬКО С ПРОВЕРЕННЫМИ"
          betweenAccents="ОБЪЕКТАМИ И ОПЫТНЫМИ КОМАНДАМИ."
          accent2="ТВОЙ КАПИТАЛ"
          afterAccent2="ВСЕГДА ПОД КОНТРОЛЕМ."
          buttonLabel="Подробнее"
          href="/cases"
        />
      </SectionReveal>

      <SectionReveal delay={0.07} className="mt-6">
        <MethodStatsSection
          stats={[
            { value: "150", label: "Реализованных проектов" },
            { value: "6 месяцев", label: "Среднее время" },
            { value: "35%", label: "Средний ROI" },
            { value: "150", label: "Активных клиентов" },
          ]}
          image={{ src: "/images/statsimg1.jpg", alt: "Interior" }}
        />
      </SectionReveal>

      <SectionReveal delay={0.09} className="mt-6">
        <PopularConcepts />
      </SectionReveal>

      <SectionReveal delay={0.11} className="mt-6">
        <MethodAccordionSection
          title="Или попробуй сам"
          subtitle="“SOVE — это полный сервис управления real estate инвестициями.”"
          items={METHOD_ACCORDION_ITEMS}
        />
      </SectionReveal>

      <SectionReveal delay={0.13} className="mt-6">
        <MethodPricingSection title="Тарифы" plans={METHOD_PRICING_PLANS} />
      </SectionReveal>

      <SectionReveal delay={0.15} className="mt-10">
        <div className="text-center text-[22px] font-normal text-black/70 max-lg:text-[18px]">
          Или попробуй сам
        </div>
      </SectionReveal>

      <SectionReveal delay={0.17} className="mt-6">
<SelfTrySection plans={SELF_TRY_PLANS} />
      </SectionReveal>

      <SectionReveal delay={0.19} className="mt-6">
        <TestimonialsSection />
      </SectionReveal>

      <SectionReveal delay={0.21} className="mt-6">
        <PackagesFaqSection />
      </SectionReveal>
    </main>
  );
}
