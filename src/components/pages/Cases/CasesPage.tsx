import { PageHero } from "@/src/components/sections/PageHero/PageHero";
import { CasesCatalogSection } from "@/src/components/sections/CasesCatalog/CasesCatalogSection";
import { SectionReveal } from "@/src/components/ui/SectionReveal";

export function CasesPage() {
  return (
    <main className="bg-white text-black">
      <SectionReveal delay={0}>
        <PageHero
          title={["ОЗНАКОМТЕСЬ СО ВСЕМИ", "ПРОЕКТАМИ В НАШЕМ ПОРТФОЛИО"]}
          subtitle="Вот какие инвестиции в недвижимость приносят доход нашим клиентам"
          imageSrc="/images/hero.jpg"
        />
      </SectionReveal>

      <SectionReveal delay={0.06} className="mt-6">
        <CasesCatalogSection />
      </SectionReveal>
    </main>
  );
}
