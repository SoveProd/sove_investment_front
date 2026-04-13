import { PageHero } from "@/src/components/sections/PageHero/PageHero";
import { PopularConceptsSection } from "@/src/components/sections/PopularConcepts/PopularConceptsSection";
import { CasesCtaSection } from "@/src/components/home/CasesCtaSection/CasesCtaSection";
import TryItSection from "@/src/components/home/TryIt/TryItSection";
import { SectionReveal } from "@/src/components/ui/SectionReveal";

export function ConceptsPage() {
  return (
    <main className="bg-white text-black">
      {/* Hero — можно анимировать мягко при первом рендере */}
      <SectionReveal delay={0}>
        <PageHero
          title={["КОНЦЕПЦИИ"]}
          subtitle={`Выберите готовые решения для вашего
проекта из ограниченных дропов`}
          imageSrc="/images/PageHero/packagesHero.png"
        />
      </SectionReveal>

      {/* Список концептов */}
      <SectionReveal delay={0.05} className="mt-6">
        <PopularConceptsSection />
      </SectionReveal>

      {/* CTA кейсов */}
      <SectionReveal delay={0.08} className="mt-10">
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

      {/* Try it */}
      <SectionReveal delay={0.1} className="mt-10">
        <TryItSection />
      </SectionReveal>
    </main>
  );
}
