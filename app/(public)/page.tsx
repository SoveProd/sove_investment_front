import { FindYourPathSection } from "@/src/components/home/FindYourPath";
import { Hero } from "@/src/components/home/Hero";
import PopularConcepts from "@/src/components/home/PopularConcepts/PopularConcepts";
import { StatsMosaic } from "@/src/components/home/StatsMosaic";
import TryItSection from "@/src/components/home/TryIt/TryItSection";
import { RealEstate } from "@/src/components/home/RealEstate/RealEstate";
import { CasesCtaSection } from "@/src/components/home/CasesCtaSection/CasesCtaSection";
import { DesignMosaicSection } from "@/src/components/home/DesignMosaicSection/DesignMosaicsection";
import HowItWorksSection from "@/src/components/home/HowItWorks/HowItWorksSection";
import { ThreeHoverZones } from "@/src/components/home/FeatureZone/FeatureZone";
import { TestimonialsSection } from "@/src/components/home/TestimonialsSection/TestimonialsSection";
import { CtaBanner } from "@/src/components/home/CtaBanner/CtaBanner";

import { SectionReveal } from "@/src/components/ui/SectionReveal";
import Image from "next/image";
import {
  getHomepageHeroBlock,
  getHomepageManagePropertyBlock,
  getHomepageMetricsBlock,
  getHomepageDoItWithSoveBlock,
  getPublishedHomepage,
  getHomepageDesignMosaicBlock,
} from "@/lib/cms/homepage";
import type { CmsBlock, CmsStaticPage } from "@/lib/cms/types";
import { getCmsMediaUrl } from "@/lib/cms/mediaUrl";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

type CaseStudyEntity = {
  id: number;
  project_id?: number | null;
  title: string;
  title_seo?: string | null;
  description_seo?: string | null;
  hero_media_id?: number | null;
  timeline?: string | null;
  roi_coeff?: number | null;
  budget?: number | null;
  city?: string | null;
  apartment_name?: string | null;
  square?: number | null;
  is_published?: boolean;
  published_at?: string | null;
};

function findBlockByType(
  homepage: CmsStaticPage | null | undefined,
  blockType: string,
): CmsBlock | undefined {
  return homepage?.blocks?.find((block) => block.block_type === blockType);
}

function mapSoveGroupToThreeHoverZones(block?: CmsBlock) {
  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              label?: string | null;
              value?: string | null;
              title?: string | null;
              subtitle?: string | null;
            }>;
          }
        ).items
      : [];

  const zones = contentItems.length
    ? contentItems.map((item) => ({
        title: item.label || item.title || "",
        text: item.value || item.subtitle || "",
      }))
    : [
        { title: "Современный дизайн", text: "Наши дизайнеры создают концепции..." },
        { title: "Профессиональное\nуправление", text: "Берём на себя процесс..." },
        { title: "Гарантированная ROI", text: "Работаем на результат..." },
      ];

  const firstMedia = Array.isArray(block?.media) ? block?.media?.[0] : undefined;
  const imageSrc = (firstMedia ? getCmsMediaUrl(firstMedia) : null) || "/images/hero.jpg";

  return { zones, imageSrc };
}

async function getPublishedCaseStudies(): Promise<CaseStudyEntity[]> {
  try {
    const response = await fetch(`${API_BASE}/case-studies/published`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as CaseStudyEntity[];
  } catch (error) {
    console.error("Failed to load published case studies", error);
    return [];
  }
}

export default async function Home() {
  const homepage = (await getPublishedHomepage()) as CmsStaticPage;
  const caseStudies = await getPublishedCaseStudies();

  const heroBlock = getHomepageHeroBlock(homepage);
  const metricsBlock = getHomepageMetricsBlock(homepage);
  const doItWithSoveBlock = getHomepageDoItWithSoveBlock(homepage);
  const managePropertyBlock = getHomepageManagePropertyBlock(homepage);
  const designMosaicBlock = getHomepageDesignMosaicBlock(homepage);
  const doItYourselfBlock = findBlockByType(homepage, "diy:main");
  const soveGroupBlock = findBlockByType(homepage, "sove_group:main");

  const casesCtaBlock = findBlockByType(homepage, "capitalized_text:main");
  const popularConceptsBlock = findBlockByType(
    homepage,
    "featured_concepts:main",
  );
  const readyProjectsBlock = findBlockByType(homepage, "featured_cases:main");
  const requestsBlock = findBlockByType(homepage, "requests:main");

  return (
    <>
      <SectionReveal>
        <Hero block={heroBlock} />
      </SectionReveal>

      <SectionReveal>
        <StatsMosaic block={metricsBlock} />
      </SectionReveal>

      <SectionReveal>
        <FindYourPathSection block={doItWithSoveBlock} />
      </SectionReveal>

      <SectionReveal>
        <CasesCtaSection block={casesCtaBlock} href="/cases" />
      </SectionReveal>

      <SectionReveal>
        <TryItSection block={doItYourselfBlock as CmsBlock} />
      </SectionReveal>

      <SectionReveal>
        <PopularConcepts
          popularBlock={popularConceptsBlock}
          readyBlock={readyProjectsBlock}
          popularItems={caseStudies}
          readyItems={caseStudies}
        />
      </SectionReveal>

      <SectionReveal>
        <RealEstate managePropertyBlock={managePropertyBlock} />
      </SectionReveal>

      <SectionReveal>
        <DesignMosaicSection designMosaicBlock={designMosaicBlock} />
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

          {(() => {
            const mapped = mapSoveGroupToThreeHoverZones(soveGroupBlock);
            return <ThreeHoverZones imageSrc={mapped.imageSrc} zones={mapped.zones} />;
          })()}
        </div>
      </SectionReveal>

      <SectionReveal>
        <TestimonialsSection />
      </SectionReveal>

      <SectionReveal>
        <CtaBanner
          title={requestsBlock?.title || undefined}
          bgSrc={
            requestsBlock?.media?.[0]
              ? getCmsMediaUrl(requestsBlock.media[0]) || undefined
              : undefined
          }
          primaryButtonLabel={
            (Array.isArray(requestsBlock?.button)
              ? requestsBlock?.button?.[0]?.name
              : requestsBlock?.button?.name) || undefined
          }
          secondaryButtonLabel={requestsBlock?.subtitle || undefined}
        />
      </SectionReveal>
    </>
  );
}
