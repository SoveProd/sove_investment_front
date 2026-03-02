import { PageHero } from "@/components/sections/PageHero/PageHero";
import { CasesGridSection } from "@/components/sections/CasesGrid/CasesGridSection";
import { CtaBanner } from "@/components/home/CtaBanner/CtaBanner";
import { CasesCatalogSection } from "@/components/sections/CasesCatalog/CasesCatalogSection";

export function CasesPage() {
  return (
    <main className="bg-white text-black">
      <PageHero
        title={["ОЗНАКОМТЕСЬ СО ВСЕМИ", "ПРОЕКТАМИ В НАШЕМ ПОРТФОЛИО"]}
        subtitle="Вот какие инвестиции в недвижимость приносят доход нашим клиентам"
        imageSrc="/images/hero.jpg" 
      />

      <CasesCatalogSection />

    </main>
  );
}