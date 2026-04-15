import type {
  HeroBlockData,
  MetricsBlockData,
  RepeatableFeatureBlockData,
  TextButtonBlockData,
  FeaturedSelectionBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";
import type {
  CmsBlock,
  CmsHeroBlock,
  CmsMetricsBlock,
  CmsStaticPage,
} from "@/lib/cms/types";
import {
  mapDoItWithSoveBlockToAdmin,
  mapDiyBlockToAdmin,
  mapCapitalizedTextBlockToAdmin,
  mapFeaturedBlockToAdmin,
} from "@/lib/cms/homepageAdapters";
import { hydrateHeroBlock, HERO_BLOCK_TYPE } from "./blocks/hero";
import { hydrateMetricsBlock, METRICS_BLOCK_TYPE } from "./blocks/metrics";

function findBlockByType<T extends CmsBlock>(
  blocks: CmsBlock[],
  blockType: string,
): T | undefined {
  return blocks.find((block) => block.block_type === blockType) as
    | T
    | undefined;
}

type Params = {
  homepageDraft: CmsStaticPage;

  setHeroCmsBlockId: (value: number | null) => void;
  setMetricsCmsBlockId: (value: number | null) => void;
  setMakeWithSoveCmsBlockId: (value: number | null) => void;
  setDoItYourselfCmsBlockId: (value: number | null) => void;
  setCapitalizedTextCmsBlockId: (value: number | null) => void;
  setPopularConceptsCmsBlockId: (value: number | null) => void;
  setReadyProjectsCmsBlockId: (value: number | null) => void;

  setHeroBlock: React.Dispatch<React.SetStateAction<HeroBlockData>>;
  setMetricsBlock: React.Dispatch<React.SetStateAction<MetricsBlockData>>;
  setMakeWithSoveBlock: React.Dispatch<
    React.SetStateAction<RepeatableFeatureBlockData>
  >;
  setDoItYourselfBlock: React.Dispatch<
    React.SetStateAction<RepeatableFeatureBlockData>
  >;
  setCapitalizedTextBlock: React.Dispatch<
    React.SetStateAction<TextButtonBlockData>
  >;
  setPopularConceptsBlock: React.Dispatch<
    React.SetStateAction<FeaturedSelectionBlockData>
  >;
  setReadyProjectsBlock: React.Dispatch<
    React.SetStateAction<FeaturedSelectionBlockData>
  >;
};

export function hydrateHomepageBlocks({
  homepageDraft,
  setHeroCmsBlockId,
  setMetricsCmsBlockId,
  setMakeWithSoveCmsBlockId,
  setDoItYourselfCmsBlockId,
  setCapitalizedTextCmsBlockId,
  setPopularConceptsCmsBlockId,
  setReadyProjectsCmsBlockId,
  setHeroBlock,
  setMetricsBlock,
  setMakeWithSoveBlock,
  setDoItYourselfBlock,
  setCapitalizedTextBlock,
  setPopularConceptsBlock,
  setReadyProjectsBlock,
}: Params) {
  const heroCmsBlock = findBlockByType<CmsHeroBlock>(
    homepageDraft.blocks,
    HERO_BLOCK_TYPE,
  );

  const metricsCmsBlock = findBlockByType<CmsMetricsBlock>(
    homepageDraft.blocks,
    METRICS_BLOCK_TYPE,
  );

  const makeWithSoveCmsBlock = findBlockByType<CmsBlock>(
    homepageDraft.blocks,
    "do_it_with_sove:main",
  );

  const doItYourselfCmsBlock = findBlockByType<CmsBlock>(
    homepageDraft.blocks,
    "diy:main",
  );

  const capitalizedTextCmsBlock = findBlockByType<CmsBlock>(
    homepageDraft.blocks,
    "capitalized_text:main",
  );

  const popularConceptsCmsBlock = findBlockByType<CmsBlock>(
    homepageDraft.blocks,
    "featured_concepts:main",
  );

  const readyProjectsCmsBlock = findBlockByType<CmsBlock>(
    homepageDraft.blocks,
    "featured_cases:main",
  );

  if (heroCmsBlock) {
    setHeroCmsBlockId(heroCmsBlock.id);

    setHeroBlock((prev) => {
      const mapped = hydrateHeroBlock(heroCmsBlock);

      return {
        ...prev,
        mediaId: mapped.mediaId || prev.mediaId,
        title: mapped.title || prev.title,
        description: mapped.description || prev.description,
        videoName: mapped.videoName || prev.videoName,
        videoPreview: mapped.videoPreview || prev.videoPreview,
        primaryButtonLabel:
          mapped.primaryButtonLabel || prev.primaryButtonLabel,
        secondaryButtonLabel:
          mapped.secondaryButtonLabel || prev.secondaryButtonLabel,
      };
    });
  }

  if (metricsCmsBlock) {
    setMetricsCmsBlockId(metricsCmsBlock.id);

    setMetricsBlock((prev) => {
      const mapped = hydrateMetricsBlock(metricsCmsBlock);

      return {
        items: prev.items.map((item, index) => {
          const cmsItem = mapped.items[index];
          if (!cmsItem) return item;

          return {
            ...item,
            mediaId: cmsItem.mediaId || item.mediaId,
            title: cmsItem.title || item.title,
            value: cmsItem.value || item.value,
            fileName: cmsItem.fileName || item.fileName,
            preview: cmsItem.preview || item.preview,
          };
        }),
      };
    });
  }

  if (makeWithSoveCmsBlock) {
    setMakeWithSoveCmsBlockId(makeWithSoveCmsBlock.id);

    setMakeWithSoveBlock((prev) => {
      const mapped = mapDoItWithSoveBlockToAdmin(makeWithSoveCmsBlock);

      return {
        ...prev,
        title: mapped.title || prev.title,
        description: mapped.description || prev.description,
        buttonLabel: mapped.buttonLabel || prev.buttonLabel,
        items: mapped.items.length ? mapped.items : prev.items,
      };
    });
  }

  if (doItYourselfCmsBlock) {
    setDoItYourselfCmsBlockId(doItYourselfCmsBlock.id);

    setDoItYourselfBlock((prev) => {
      const mapped = mapDiyBlockToAdmin(doItYourselfCmsBlock);

      return {
        ...prev,
        title: mapped.title || prev.title,
        description: mapped.description || prev.description,
        buttonLabel: mapped.buttonLabel || prev.buttonLabel,
        items: mapped.items.length ? mapped.items : prev.items,
      };
    });
  }

  if (capitalizedTextCmsBlock) {
    setCapitalizedTextCmsBlockId(capitalizedTextCmsBlock.id);

    setCapitalizedTextBlock((prev) => {
      const mapped = mapCapitalizedTextBlockToAdmin(capitalizedTextCmsBlock);

      return {
        grayTextTop: mapped.grayTextTop || prev.grayTextTop,
        blackTextMain: mapped.blackTextMain || prev.blackTextMain,
        grayTextBottom: mapped.grayTextBottom || prev.grayTextBottom,
        buttonLabel: mapped.buttonLabel || prev.buttonLabel,
      };
    });
  }

  if (popularConceptsCmsBlock) {
    setPopularConceptsCmsBlockId(popularConceptsCmsBlock.id);

    setPopularConceptsBlock((prev) =>
      mapFeaturedBlockToAdmin(popularConceptsCmsBlock, prev.items),
    );
  }

  if (readyProjectsCmsBlock) {
    setReadyProjectsCmsBlockId(readyProjectsCmsBlock.id);

    setReadyProjectsBlock((prev) =>
      mapFeaturedBlockToAdmin(readyProjectsCmsBlock, prev.items),
    );
  }
}
