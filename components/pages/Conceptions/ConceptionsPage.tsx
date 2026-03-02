import { PageHero } from "@/components/sections/PageHero/PageHero";
import { CtaBanner } from "@/components/home/CtaBanner/CtaBanner";
import { PopularConceptsSection } from "@/components/sections/PopularConcepts/PopularConceptsSection";
import { CasesCtaSection } from "@/components/home/CasesCtaSection/CasesCtaSection";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import TryItSection from "@/components/home/TryIt/TryItSection";

export function ConceptsPage() {
  return (
    <main className="bg-white text-black">
      <PageHero
        title={["КОНЦЕПЦИИ"]}
        subtitle="Выберите готовые решения для вашего проекта из ограниченных дропов"
        imageSrc="/images/PageHero/packagesHero.png" // поставь сюда нужную картинку
      />
<PopularConceptsSection />

      <CtaBanner />
      <CasesCtaSection
  beforeAccent1="Мы меняем правила ремонта!"
  accent1="Теперь вы сами решаете -"
  betweenAccents="доверить управление всеми процессами SOVE"
  accent2="или использовать всех"
  afterAccent2="наших подрядчиков самостоятельно"
  buttonLabel="Посмотри наши кейсы"
  href="/cases"
/>
  <TryItSection />
    </main>
  );
}