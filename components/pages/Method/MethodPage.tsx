import { MethodHero } from "@/components/sections/MethodHero/MethodHero";
import { CasesCtaSection } from "@/components/home/CasesCtaSection/CasesCtaSection"; // поправь путь на свой реальный
import { MethodStatsSection } from "@/components/sections/MethodStats/MethodStatsSection";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import {  MethodAccordionSection } from "@/components/sections/MethodAccordion/MethodAccordion";
import { METHOD_ACCORDION_ITEMS } from "@/components/sections/MethodAccordion/data";
import { MethodPricingSection } from "@/components/sections/MethodPricing/MethodPricingSection";
import { METHOD_PRICING_PLANS } from "@/components/sections/MethodPricing/data";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";
import { PackagesFaqSection } from "@/components/sections/PackagesFaq/PackagesFaqSection";


export function MethodPage() {
  return (
    <main className="bg-white text-black">
      <MethodHero />

      <CasesCtaSection
        beforeAccent1="МЫ РАБОТАЕМ"
        accent1="ТОЛЬКО С ПРОВЕРЕННЫМИ"
        betweenAccents="ОБЪЕКТАМИ И ОПЫТНЫМИ КОМАНДАМИ."
        accent2="ТВОЙ КАПИТАЛ"
        afterAccent2="ВСЕГДА ПОД КОНТРОЛЕМ."
        buttonLabel="Подробнее"
        href="/cases"
      />

      <MethodStatsSection
        stats={[
          { value: "150", label: "Реализованных проектов" },
          { value: "6 месяцев", label: "Среднее время" },
          { value: "35%", label: "Средний ROI" },
          { value: "150", label: "Активных клиентов" },
        ]}
        image={{ src: "/images/statsimg1.jpg", alt: "Interior" }}
      />
      <PopularConcepts />
      <MethodAccordionSection
        title="Или попробуй сам"
        subtitle="“SOVE — это полный сервис управления real estate инвестициями.”"
        items={METHOD_ACCORDION_ITEMS}
      />
      <MethodPricingSection title="Тарифы" plans={METHOD_PRICING_PLANS} />

      <div className="text-center text-[22px] font-normal text-black/70 max-lg:text-[18px]">
        Или попробуй сам
      </div>

      <MethodPricingSection
        className="pt-6" // или pt-8
        title="Тарифы"
        plans={METHOD_PRICING_PLANS}
      />

      <TestimonialsSection/>
      <PackagesFaqSection/>
    </main>
  );
}
