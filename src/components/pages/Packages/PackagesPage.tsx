import { ThreeHoverZones } from "@/src/components/home/FeatureZone/FeatureZone";
import { PageHero } from "@/src/components/sections/PageHero/PageHero";
import { ReadyConceptSection } from "@/src/components/sections/ReadyConcept/ReadyConceptSection";
import { PackagesFaqSection } from "@/src/components/sections/PackagesFaq/PackagesFaqSection";
import { CtaBanner } from "@/src/components/home/CtaBanner/CtaBanner";
import { SectionReveal } from "@/src/components/ui/SectionReveal";
import {
  getPublishedServicePackagesPage,
  getServicePackagesHeaderBlock,
  getServicePackagesPackageBlock,
  getServicePackagesOtherServicesBlock,
  getServicePackagesQnaBlock,
  getServicePackagesRequestsBlock,
  mapOtherServicesToThreeHoverZones,
  mapPackageBlockToReadyConceptProps,
  mapRequestsPackToCtaProps,
} from "@/lib/cms/servicePackages";
import { mapQnaBlockToFaqItems } from "@/lib/cms/qnaAdapters";

function pickHeroImage(
  block:
    | { media?: Array<{ large_url?: string | null; file_url?: string }> }
    | undefined,
) {
  const media0 = block?.media?.[0];
  return (
    media0?.large_url || media0?.file_url || "/images/PageHero/packagesHero.png"
  );
}

export async function PackagesPage() {
  const cmsPage = await getPublishedServicePackagesPage();
  const headerBlock = getServicePackagesHeaderBlock(cmsPage);
  const package1Block = getServicePackagesPackageBlock(
    cmsPage,
    "s_package_1:pack",
  );
  const package2Block = getServicePackagesPackageBlock(
    cmsPage,
    "s_package_2:pack",
  );
  const otherServicesBlock = getServicePackagesOtherServicesBlock(cmsPage);
  const qnaBlock = getServicePackagesQnaBlock(cmsPage);
  const requestsBlock = getServicePackagesRequestsBlock(cmsPage);

  const package1Props = mapPackageBlockToReadyConceptProps(package1Block);
  const package2Props = mapPackageBlockToReadyConceptProps(package2Block);
  const otherServices = mapOtherServicesToThreeHoverZones(otherServicesBlock);
  const faqItems = mapQnaBlockToFaqItems(qnaBlock);
  const requestsCta = mapRequestsPackToCtaProps(requestsBlock);

  return (
    <main className="bg-[#f3f3f3] text-black">
      <SectionReveal delay={0}>
        <PageHero
          title={["ПАКЕТЫ РЕАЛИЗАЦИИ", "Твой путь к ликвидной недвижимости"]}
          subtitle={
            headerBlock?.subtitle?.trim() ||
            "Выбери комплексное решение под свои задачи"
          }
          imageSrc={pickHeroImage(headerBlock)}
        />
      </SectionReveal>

      <SectionReveal delay={0.05} className="mt-6">
        <ReadyConceptSection {...package1Props} />
      </SectionReveal>

      <SectionReveal delay={0.08} className="mt-6">
        <ReadyConceptSection reverse {...package2Props} />
      </SectionReveal>

      <SectionReveal delay={0.1} className="mt-[80px] bg-[#f3f3f3]">
        <div className="hidden lg:block py-10 text-center text-[50px] font-medium text-[#1f1f1f]">
          {otherServices.title}
        </div>

        <ThreeHoverZones
          imageSrc={otherServices.imageSrc}
          heightClassName="h-screen"
          overlayClassName="bg-black/35"
          zones={otherServices.zones}
        />
      </SectionReveal>

      <SectionReveal delay={0.12} className="mt-6">
        <PackagesFaqSection items={faqItems} />
      </SectionReveal>

      <SectionReveal delay={0.14} className="mt-6">
        <CtaBanner
          title={requestsCta.title || "Найди свой путь вперед с SOVE"}
          bgSrc={requestsCta.bgSrc}
          primaryButtonLabel={requestsCta.primaryButtonLabel}
          secondaryButtonLabel={requestsCta.secondaryButtonLabel}
        />
      </SectionReveal>
    </main>
  );
}
