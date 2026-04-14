"use client";

import { useEffect, useState } from "react";
import { HeroBlockEditor } from "@/src/components/admin/content-tools/home/HeroBlockEditor";
import { MetricsBlockEditor } from "@/src/components/admin/content-tools/home/MetricsBlockEditor";
import { MakeWithSoveBlockEditor } from "@/src/components/admin/content-tools/home/MakeWithSoveBlockEditor";
import { DoItYourselfBlockEditor } from "@/src/components/admin/content-tools/home/DoItYourselfBlockEditor";
import { PopularConceptsBlockEditor } from "@/src/components/admin/content-tools/home/PopularConceptsBlockEditor";
import { ReadyProjectsBlockEditor } from "@/src/components/admin/content-tools/home/ReadyProjectsBlockEditor";
import { WeTakeCareBlockEditor } from "@/src/components/admin/content-tools/home/WeTakeCareBlockEditor";
import { CapitalizedTextBlockEditor } from "@/src/components/admin/content-tools/home/CapitalizedTextBlockEditor";
import { ManagePropertyBlockEditor } from "@/src/components/admin/content-tools/home/ManagePropertyBlockEditor";
import { DesignMosaicBlockEditor } from "@/src/components/admin/content-tools/home/DesignMosaicBlockEditor";
import { HowItWorksBlockEditor } from "@/src/components/admin/content-tools/home/HowItWorksBlockEditor";
import { SoveGroupBlockEditor } from "@/src/components/admin/content-tools/home/SoveGroupBlockEditor";
import { ReviewsBlockEditor } from "@/src/components/admin/content-tools/home/ReviewsBlockEditor";
import { RequestsBlockEditor } from "@/src/components/admin/content-tools/home/RequestsBlockEditor";
import { loadHomepageDraft } from "@/app/(admin)/admin/content-tools/home/loadHomepageDraft";
import {
  initialHeroBlock,
  initialMetricsBlock,
  initialMakeWithSoveBlock,
  initialDoItYourselfBlock,
  initialCapitalizedTextBlock,
  initialPopularConceptsBlock,
  initialReadyProjectsBlock,
  initialWeTakeCareBlock,
  initialManagePropertyBlock,
  initialDesignMosaicBlock,
  initialHowItWorksBlock,
  initialSoveGroupBlock,
  initialReviewsBlock,
  initialRequestsBlock,
} from "@/app/(admin)/admin/content-tools/home/defaults";

import type {
  HeroBlockData,
  MetricsBlockData,
  RepeatableFeatureBlockData,
  FeaturedSelectionBlockData,
  MediaListBlockData,
  TextButtonBlockData,
  MediaTextCardsBlockData,
  DesignMosaicBlockData,
  HowItWorksBlockData,
  SoveGroupBlockData,
  ReviewsBlockData,
  RequestsBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

import { hydrateHomepageBlocks } from "./hydrateHomepageBlocks";
import { createHomepageBlurHandlers } from "./createHomepageBlurHandlers";
import { uploadMedia } from "./uploadMedia";
import type { CmsBlock, CmsMedia } from "@/lib/cms/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";

type CaseStudyShort = {
  id: number;
  title: string;
};

async function patchBlockWithFallback({
  apiBase,
  blockId,
  token,
  patches,
}: {
  apiBase: string;
  blockId: number | null;
  token: string | null;
  patches: Record<string, unknown>[];
}) {
  if (!blockId || !token) {
    throw new Error("Missing block id or token");
  }

  let lastError: Error | null = null;

  for (const patch of patches) {
    const response = await fetch(`${apiBase}/blocks/${blockId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });

    if (response.ok) {
      return;
    }

    lastError = new Error(`Failed to patch block: ${response.status}`);
  }

  throw lastError ?? new Error("Failed to patch block");
}

function buildMetricsMediaPatches(metricsBlock: MetricsBlockData) {
  const mediaIds = metricsBlock.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = metricsBlock.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  return [
    {
      content: {
        items: metricsBlock.items.map((item) => ({
          label: item.title,
          value: item.value,
        })),
      },
      media_ids: mediaIds,
    },
    {
      content: {
        items: metricsBlock.items.map((item) => ({
          label: item.title,
          value: item.value,
        })),
      },
      media: positionedMedia,
    },
  ];
}

function buildRepeatableFeaturePatches(block: RepeatableFeatureBlockData) {
  const mediaIds = block.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  return [
    {
      title: block.title,
      text: block.description,
      button: {
        name: block.buttonLabel,
        position: 0,
      },
      content: {
        items: block.items.map((item) => ({
          text: item.text,
        })),
      },
      media_ids: mediaIds,
    },
    {
      title: block.title,
      text: block.description,
      button: {
        name: block.buttonLabel,
        position: 0,
      },
      content: {
        items: block.items.map((item) => ({
          text: item.text,
        })),
      },
      media: positionedMedia,
    },
  ];
}

function buildManagePropertyPatches(block: MediaTextCardsBlockData) {
  const mediaIds = block.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  return [
    {
      title: block.title,
      text: block.description,
      content: {
        items: block.items.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
        })),
      },
      media_ids: mediaIds,
    },
    {
      title: block.title,
      text: block.description,
      content: {
        items: block.items.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
        })),
      },
      media: positionedMedia,
    },
  ];
}

function buildDesignMosaicPatches(block: DesignMosaicBlockData) {
  const mediaIds = block.items
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.items
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  const basePatch = {
    title: block.title,
    content: {
      items: block.items.map((item) => ({
        title: item.title,
        subtitle: item.description,
        text: item.description,
      })),
    },
  };

  return [
    {
      ...basePatch,
      media_ids: mediaIds,
    },
    {
      ...basePatch,
      media: positionedMedia,
    },
  ];
}

function buildHowItWorksPatches(block: HowItWorksBlockData) {
  const mediaIds = block.steps
    .map((item) => item.mediaId)
    .filter((value): value is number => typeof value === "number");

  const positionedMedia = block.steps
    .filter(
      (item): item is typeof item & { mediaId: number } =>
        typeof item.mediaId === "number",
    )
    .map((item, index) => ({
      id: item.mediaId,
      position: index,
    }));

  const contentPatch = {
    content: {
      items: block.steps.map((step) => ({
        title: step.stepLabel,
        subtitle: step.title,
        text: step.shortDescription,
        button: step.buttonLabel,
      })),
    },
  };

  const basePatchA = {
    title: block.title,
    subtitle: block.subtitle,
    ...contentPatch,
  };

  const basePatchB = {
    title: block.title,
    text: block.subtitle,
    ...contentPatch,
  };

  return [
    {
      ...basePatchA,
      media_ids: mediaIds,
    },
    {
      ...basePatchA,
      media: positionedMedia,
    },
    {
      ...basePatchB,
      media_ids: mediaIds,
    },
    {
      ...basePatchB,
      media: positionedMedia,
    },
  ];
}

function buildSoveGroupPatches(block: SoveGroupBlockData) {
  const contentPatch = {
    content: {
      items: block.zones.map((zone) => ({
        label: zone.title,
        value: zone.subtitle,
      })),
    },
  };

  const mediaIds =
    typeof block.mediaId === "number" ? ([block.mediaId] as number[]) : [];

  return [
    {
      ...contentPatch,
      media_ids: mediaIds,
    },
    {
      ...contentPatch,
      media: typeof block.mediaId === "number" ? [{ id: block.mediaId, position: 0 }] : [],
    },
  ];
}

function buildReviewsPatches(block: ReviewsBlockData) {
  return [
    {
      title: block.title,
      content: {
        items: block.items.map((item) => ({
          author: item.author,
          text: item.text,
          rating: item.rating,
          date: item.date,
          url: item.url || null,
        })),
      },
    },
  ];
}

function buildRequestsPatches(block: RequestsBlockData) {
  const mediaIds =
    typeof block.mediaId === "number" ? ([block.mediaId] as number[]) : [];

  const basePatch = {
    title: block.title,
    subtitle: block.secondaryButtonLabel,
    button: {
      name: block.primaryButtonLabel,
      position: 0,
    },
  };

  return [
    {
      ...basePatch,
      media_ids: mediaIds,
    },
    {
      ...basePatch,
      media: typeof block.mediaId === "number" ? [{ id: block.mediaId, position: 0 }] : [],
    },
  ];
}

function mergeFeaturedItems(
  currentValue: FeaturedSelectionBlockData,
  shortList: CaseStudyShort[],
): FeaturedSelectionBlockData {
  const selectedIds = currentValue.items
    .filter((item) => item.checked)
    .map((item) => item.id);

  return {
    ...currentValue,
    items: shortList.map((item) => ({
      id: item.id,
      label: item.title,
      checked: selectedIds.includes(item.id),
    })),
  };
}

async function loadCaseStudiesShort(token: string): Promise<CaseStudyShort[]> {
  const response = await fetch(`${API_BASE}/case-studies/`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load case studies: ${response.status}`);
  }

  const data = (await response.json()) as Array<{
    id: number;
    title: string;
  }>;

  return data.map((item) => ({
    id: item.id,
    title: item.title,
  }));
}

function hydrateManagePropertyBlock(
  block?: CmsBlock | null,
): MediaTextCardsBlockData {
  if (!block) {
    return initialManagePropertyBlock;
  }

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{ title?: string; subtitle?: string }>;
          }
        ).items
      : [];

  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];

  const maxLength = Math.max(contentItems.length, media.length, 0);

  if (maxLength === 0) {
    return {
      ...initialManagePropertyBlock,
      title: block.title || initialManagePropertyBlock.title,
      description: block.text || initialManagePropertyBlock.description,
      items: initialManagePropertyBlock.items,
    };
  }

  return {
    title: block.title || "",
    description: block.text || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        title: contentItem?.title || "",
        subtitle: contentItem?.subtitle || "",
        fileName: mediaItem?.file_name || "Фото.jpeg",
        preview:
          mediaItem?.url ||
          mediaItem?.large_url ||
          mediaItem?.thumbnail_url ||
          undefined,
        mediaId: mediaItem?.id,
      };
    }),
  };
}

function hydrateDesignMosaicBlock(block?: CmsBlock | null): DesignMosaicBlockData {
  if (!block) {
    return initialDesignMosaicBlock;
  }

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{ title?: string | null; text?: string | null }>;
          }
        ).items
      : [];

  const media = [...(Array.isArray(block.media) ? (block.media as CmsMedia[]) : [])].sort(
    (a, b) => {
      const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
      const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
      return aPos - bPos;
    },
  );

  const maxLength = Math.max(contentItems.length, media.length, 4);

  return {
    title: block.title || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        title: contentItem?.title || "",
        description: contentItem?.text || "",
        fileName: mediaItem?.file_name || "Фото.jpeg",
        preview:
          mediaItem?.url ||
          mediaItem?.large_url ||
          mediaItem?.thumbnail_url ||
          undefined,
        mediaId: mediaItem?.id,
      };
    }),
  };
}

function hydrateHowItWorksBlock(block?: CmsBlock | null): HowItWorksBlockData {
  if (!block) {
    return initialHowItWorksBlock;
  }

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              title?: string | null;
              subtitle?: string | null;
              text?: string | null;
              button?: string | null;
            }>;
          }
        ).items
      : [];

  const media = [...(Array.isArray(block.media) ? (block.media as CmsMedia[]) : [])].sort(
    (a, b) => {
      const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
      const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
      return aPos - bPos;
    },
  );

  const maxLength = Math.max(contentItems.length, media.length, 4);

  return {
    title: block.title || "",
    subtitle: block.subtitle || block.text || "",
    steps: Array.from({ length: maxLength }).map((_, index) => {
      const contentItem = contentItems[index];
      const mediaItem = media[index];

      return {
        id: index + 1,
        stepLabel: contentItem?.title || "",
        title: contentItem?.subtitle || "",
        shortDescription: contentItem?.text || "",
        buttonLabel: contentItem?.button || "",
        fileName: mediaItem?.file_name || "Фото.jpeg",
        preview:
          mediaItem?.url ||
          mediaItem?.large_url ||
          mediaItem?.thumbnail_url ||
          undefined,
        mediaId: mediaItem?.id,
      };
    }),
  };
}

function hydrateSoveGroupBlock(block?: CmsBlock | null): SoveGroupBlockData {
  if (!block) {
    return initialSoveGroupBlock;
  }

  const contentItems =
    block.content &&
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

  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];
  const firstMedia = media[0];

  const zones = Array.from({ length: Math.max(contentItems.length, 3) }).map(
    (_, index) => {
      const item = contentItems[index];
      return {
        id: index + 1,
        title: item?.label || item?.title || "",
        subtitle: item?.value || item?.subtitle || "",
      };
    },
  );

  return {
    zones,
    mediaId: firstMedia?.id,
    fileName: firstMedia?.file_name || "Фото.jpeg",
    preview:
      firstMedia?.url ||
      firstMedia?.large_url ||
      firstMedia?.thumbnail_url ||
      undefined,
  };
}

function hydrateReviewsBlock(block?: CmsBlock | null): ReviewsBlockData {
  if (!block) {
    return initialReviewsBlock;
  }

  const contentItems =
    block.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: unknown[] }).items)
      ? (
          block.content as {
            items: Array<{
              author?: string | null;
              text?: string | null;
              rating?: number | null;
              date?: string | null;
              url?: string | null;
            }>;
          }
        ).items
      : [];

  const maxLength = Math.max(contentItems.length, 3);

  return {
    title: block.title || "",
    items: Array.from({ length: maxLength }).map((_, index) => {
      const item = contentItems[index];
      return {
        id: index + 1,
        author: item?.author || "",
        text: item?.text || "",
        rating: typeof item?.rating === "number" ? item.rating : 5,
        date: item?.date || "",
        url: item?.url || "",
      };
    }),
  };
}

function hydrateRequestsBlock(block?: CmsBlock | null): RequestsBlockData {
  if (!block) {
    return initialRequestsBlock;
  }

  const button = Array.isArray(block.button) ? block.button[0] : block.button;
  const media = Array.isArray(block.media) ? (block.media as CmsMedia[]) : [];
  const firstMedia = media[0];

  return {
    title: block.title || "",
    primaryButtonLabel: button?.name || "",
    secondaryButtonLabel: block.subtitle || "",
    mediaId: firstMedia?.id,
    fileName: firstMedia?.file_name || "Фото.jpeg",
    preview:
      firstMedia?.url ||
      firstMedia?.large_url ||
      firstMedia?.thumbnail_url ||
      undefined,
  };
}

export default function ContentToolsHomePage() {
  const [homepageId, setHomepageId] = useState<number | null>(1);

  const [heroBlock, setHeroBlock] = useState<HeroBlockData>(initialHeroBlock);
  const [metricsBlock, setMetricsBlock] =
    useState<MetricsBlockData>(initialMetricsBlock);
  const [makeWithSoveBlock, setMakeWithSoveBlock] =
    useState<RepeatableFeatureBlockData>(initialMakeWithSoveBlock);
  const [doItYourselfBlock, setDoItYourselfBlock] =
    useState<RepeatableFeatureBlockData>(initialDoItYourselfBlock);
  const [capitalizedTextBlock, setCapitalizedTextBlock] =
    useState<TextButtonBlockData>(initialCapitalizedTextBlock);
  const [popularConceptsBlock, setPopularConceptsBlock] =
    useState<FeaturedSelectionBlockData>(initialPopularConceptsBlock);
  const [readyProjectsBlock, setReadyProjectsBlock] =
    useState<FeaturedSelectionBlockData>(initialReadyProjectsBlock);
  const [weTakeCareBlock, setWeTakeCareBlock] = useState<MediaListBlockData>(
    initialWeTakeCareBlock,
  );
  const [managePropertyBlock, setManagePropertyBlock] =
    useState<MediaTextCardsBlockData>(initialManagePropertyBlock);
  const [designMosaicBlock, setDesignMosaicBlock] =
    useState<DesignMosaicBlockData>(initialDesignMosaicBlock);
  const [howItWorksBlock, setHowItWorksBlock] =
    useState<HowItWorksBlockData>(initialHowItWorksBlock);
  const [soveGroupBlock, setSoveGroupBlock] =
    useState<SoveGroupBlockData>(initialSoveGroupBlock);
  const [reviewsBlock, setReviewsBlock] =
    useState<ReviewsBlockData>(initialReviewsBlock);
  const [requestsBlock, setRequestsBlock] =
    useState<RequestsBlockData>(initialRequestsBlock);

  const [heroCmsBlockId, setHeroCmsBlockId] = useState<number | null>(null);
  const [metricsCmsBlockId, setMetricsCmsBlockId] = useState<number | null>(
    null,
  );
  const [makeWithSoveCmsBlockId, setMakeWithSoveCmsBlockId] = useState<
    number | null
  >(null);
  const [doItYourselfCmsBlockId, setDoItYourselfCmsBlockId] = useState<
    number | null
  >(null);
  const [capitalizedTextCmsBlockId, setCapitalizedTextCmsBlockId] = useState<
    number | null
  >(null);
  const [popularConceptsCmsBlockId, setPopularConceptsCmsBlockId] = useState<
    number | null
  >(null);
  const [readyProjectsCmsBlockId, setReadyProjectsCmsBlockId] = useState<
    number | null
  >(null);
  const [managePropertyCmsBlockId, setManagePropertyCmsBlockId] = useState<
    number | null
  >(null);
  const [designMosaicCmsBlockId, setDesignMosaicCmsBlockId] = useState<
    number | null
  >(null);
  const [howItWorksCmsBlockId, setHowItWorksCmsBlockId] = useState<number | null>(
    null,
  );
  const [soveGroupCmsBlockId, setSoveGroupCmsBlockId] = useState<number | null>(
    null,
  );
  const [reviewsCmsBlockId, setReviewsCmsBlockId] = useState<number | null>(null);
  const [requestsCmsBlockId, setRequestsCmsBlockId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isSavingMetrics, setIsSavingMetrics] = useState(false);
  const [isSavingMakeWithSove, setIsSavingMakeWithSove] = useState(false);
  const [isSavingDoItYourself, setIsSavingDoItYourself] = useState(false);
  const [isSavingCapitalizedText, setIsSavingCapitalizedText] = useState(false);
  const [isSavingPopularConcepts, setIsSavingPopularConcepts] = useState(false);
  const [isSavingReadyProjects, setIsSavingReadyProjects] = useState(false);
  const [isSavingManageProperty, setIsSavingManageProperty] = useState(false);
  const [isSavingDesignMosaic, setIsSavingDesignMosaic] = useState(false);
  const [isSavingHowItWorks, setIsSavingHowItWorks] = useState(false);
  const [isSavingSoveGroup, setIsSavingSoveGroup] = useState(false);
  const [isSavingReviews, setIsSavingReviews] = useState(false);
  const [isSavingRequests, setIsSavingRequests] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function loadDraft() {
      try {
        setIsLoading(true);
        setError(null);

        const [homepageDraft, caseStudiesShort] = await Promise.all([
          loadHomepageDraft({
            apiBase: API_BASE,
            token: token as string,
            pageId: 1,
          }),
          loadCaseStudiesShort(token as string),
        ]);

        setHomepageId(homepageDraft.id);

        hydrateHomepageBlocks({
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
        });

        const managePropertySourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "manage_your_property:main",
        );

        if (managePropertySourceBlock) {
          setManagePropertyCmsBlockId(managePropertySourceBlock.id);
          setManagePropertyBlock(
            hydrateManagePropertyBlock(managePropertySourceBlock),
          );
        }

        const designMosaicSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "end_to_end_investment:main",
        );

        if (designMosaicSourceBlock) {
          setDesignMosaicCmsBlockId(designMosaicSourceBlock.id);
          setDesignMosaicBlock(hydrateDesignMosaicBlock(designMosaicSourceBlock));
        }

        const howItWorksSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "how_it_works:main",
        );

        if (howItWorksSourceBlock) {
          setHowItWorksCmsBlockId(howItWorksSourceBlock.id);
          setHowItWorksBlock(hydrateHowItWorksBlock(howItWorksSourceBlock));
        }

        const soveGroupSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "sove_group:main",
        );

        if (soveGroupSourceBlock) {
          setSoveGroupCmsBlockId(soveGroupSourceBlock.id);
          setSoveGroupBlock(hydrateSoveGroupBlock(soveGroupSourceBlock));
        }

        const reviewsSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "reviews:main",
        );

        if (reviewsSourceBlock) {
          setReviewsCmsBlockId(reviewsSourceBlock.id);
          setReviewsBlock(hydrateReviewsBlock(reviewsSourceBlock));
        }

        const requestsSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === "requests:main",
        );

        if (requestsSourceBlock) {
          setRequestsCmsBlockId(requestsSourceBlock.id);
          setRequestsBlock(hydrateRequestsBlock(requestsSourceBlock));
        }

        setPopularConceptsBlock((prev) =>
          mergeFeaturedItems(prev, caseStudiesShort),
        );
        setReadyProjectsBlock((prev) =>
          mergeFeaturedItems(prev, caseStudiesShort),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    loadDraft();
  }, [token]);

  const {
    handleHeroTitleBlur,
    handleHeroDescriptionBlur,
    handleHeroPrimaryButtonBlur,
    handleHeroSecondaryButtonBlur,
    handleMakeWithSoveTitleBlur,
    handleMakeWithSoveDescriptionBlur,
    handleMakeWithSoveButtonBlur,
    handleDiyTitleBlur,
    handleDiyDescriptionBlur,
    handleDiyButtonBlur,
    handleCapitalizedTextBlur,
    handleCapitalizedTextButtonBlur,
    handlePopularConceptsTitleBlur,
    handleReadyProjectsTitleBlur,
    handlePopularConceptsSelectionChange,
    handleReadyProjectsSelectionChange,
  } = createHomepageBlurHandlers({
    apiBase: API_BASE,
    token,
    setError,

    heroCmsBlockId,
    metricsCmsBlockId,
    makeWithSoveCmsBlockId,
    doItYourselfCmsBlockId,
    capitalizedTextCmsBlockId,
    popularConceptsCmsBlockId,
    readyProjectsCmsBlockId,

    heroBlock,
    metricsBlock,
    makeWithSoveBlock,
    doItYourselfBlock,
    capitalizedTextBlock,
    popularConceptsBlock,
    readyProjectsBlock,

    setIsSavingHero,
    setIsSavingMetrics,
    setIsSavingMakeWithSove,
    setIsSavingDoItYourself,
    setIsSavingCapitalizedText,
    setIsSavingPopularConcepts,
    setIsSavingReadyProjects,
  });

  async function saveHeroMedia(nextMediaIds: number[]) {
    const firstMediaId = nextMediaIds[0];

    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: heroCmsBlockId,
      token,
      patches: [
        { media_ids: nextMediaIds },
        { media_id: firstMediaId ?? null },
        {
          media: firstMediaId ? [{ id: firstMediaId, position: 0 }] : [],
        },
      ],
    });
  }

  async function saveMetricsBlock(nextValue: MetricsBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: metricsCmsBlockId,
      token,
      patches: buildMetricsMediaPatches(nextValue),
    });
  }

  async function saveMakeWithSoveBlock(nextValue: RepeatableFeatureBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: makeWithSoveCmsBlockId,
      token,
      patches: buildRepeatableFeaturePatches(nextValue),
    });
  }

  async function saveDoItYourselfBlock(nextValue: RepeatableFeatureBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: doItYourselfCmsBlockId,
      token,
      patches: buildRepeatableFeaturePatches(nextValue),
    });
  }

  async function saveManagePropertyBlock(nextValue: MediaTextCardsBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: managePropertyCmsBlockId,
      token,
      patches: buildManagePropertyPatches(nextValue),
    });
  }

  async function saveDesignMosaicBlock(nextValue: DesignMosaicBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: designMosaicCmsBlockId,
      token,
      patches: buildDesignMosaicPatches(nextValue),
    });
  }

  async function saveHowItWorksBlock(nextValue: HowItWorksBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: howItWorksCmsBlockId,
      token,
      patches: buildHowItWorksPatches(nextValue),
    });
  }

  async function saveSoveGroupBlock(nextValue: SoveGroupBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: soveGroupCmsBlockId,
      token,
      patches: buildSoveGroupPatches(nextValue),
    });
  }

  async function saveReviewsBlock(nextValue: ReviewsBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: reviewsCmsBlockId,
      token,
      patches: buildReviewsPatches(nextValue),
    });
  }

  async function saveRequestsBlock(nextValue: RequestsBlockData) {
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: requestsCmsBlockId,
      token,
      patches: buildRequestsPatches(nextValue),
    });
  }

  async function handleMetricsBlur() {
    if (!token || !metricsCmsBlockId) return;

    try {
      setIsSavingMetrics(true);
      setError(null);
      await saveMetricsBlock(metricsBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save metrics block",
      );
    } finally {
      setIsSavingMetrics(false);
    }
  }

  async function handleHeroMediaUpload(file: File) {
    if (!token || !heroCmsBlockId) return;

    try {
      setIsSavingHero(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: heroCmsBlockId,
      });

      setHeroBlock((prev) => ({
        ...prev,
        mediaId: uploadedMedia.id,
        videoName: uploadedMedia.file_name || file.name,
        videoPreview: uploadedMedia.file_url,
      }));

      await saveHeroMedia([uploadedMedia.id]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload hero media",
      );
    } finally {
      setIsSavingHero(false);
    }
  }

  async function handleHeroMediaRemove() {
    if (!token || !heroCmsBlockId) return;

    setHeroBlock((prev) => ({
      ...prev,
      mediaId: undefined,
      videoName: "",
      videoPreview: undefined,
    }));

    await saveHeroMedia([]);
  }

  async function handleMetricsMediaUpload(id: number, file: File) {
    if (!token || !metricsCmsBlockId) return;

    try {
      setIsSavingMetrics(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: metricsCmsBlockId,
      });

      const nextMetricsBlock: MetricsBlockData = {
        ...metricsBlock,
        items: metricsBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview: uploadedMedia.file_url,
              }
            : item,
        ),
      };

      setMetricsBlock(nextMetricsBlock);
      await saveMetricsBlock(nextMetricsBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload metrics media",
      );
    } finally {
      setIsSavingMetrics(false);
    }
  }

  async function handleMetricsMediaRemove(id: number) {
    if (!token || !metricsCmsBlockId) return;

    try {
      setIsSavingMetrics(true);
      setError(null);

      const nextMetricsBlock: MetricsBlockData = {
        ...metricsBlock,
        items: metricsBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : item,
        ),
      };

      setMetricsBlock(nextMetricsBlock);
      await saveMetricsBlock(nextMetricsBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove metrics media",
      );
    } finally {
      setIsSavingMetrics(false);
    }
  }

  async function handleMakeWithSoveMediaUpload(id: number, file: File) {
    if (!token || !makeWithSoveCmsBlockId) return;

    try {
      setIsSavingMakeWithSove(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: makeWithSoveCmsBlockId,
      });

      const nextMakeWithSoveBlock: RepeatableFeatureBlockData = {
        ...makeWithSoveBlock,
        items: makeWithSoveBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview: uploadedMedia.file_url,
              }
            : item,
        ),
      };

      setMakeWithSoveBlock(nextMakeWithSoveBlock);
      await saveMakeWithSoveBlock(nextMakeWithSoveBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload make-with-sove media",
      );
    } finally {
      setIsSavingMakeWithSove(false);
    }
  }

  async function handleMakeWithSoveMediaRemove(id: number) {
    if (!token || !makeWithSoveCmsBlockId) return;

    try {
      setIsSavingMakeWithSove(true);
      setError(null);

      const nextMakeWithSoveBlock: RepeatableFeatureBlockData = {
        ...makeWithSoveBlock,
        items: makeWithSoveBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : item,
        ),
      };

      setMakeWithSoveBlock(nextMakeWithSoveBlock);
      await saveMakeWithSoveBlock(nextMakeWithSoveBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to remove make-with-sove media",
      );
    } finally {
      setIsSavingMakeWithSove(false);
    }
  }

  async function handleMakeWithSoveItemsBlur() {
    if (!token || !makeWithSoveCmsBlockId) return;

    try {
      setIsSavingMakeWithSove(true);
      setError(null);
      await saveMakeWithSoveBlock(makeWithSoveBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save make-with-sove block",
      );
    } finally {
      setIsSavingMakeWithSove(false);
    }
  }

  async function handleDiyMediaUpload(id: number, file: File) {
    if (!token || !doItYourselfCmsBlockId) return;

    try {
      setIsSavingDoItYourself(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: doItYourselfCmsBlockId,
      });

      const nextDoItYourselfBlock: RepeatableFeatureBlockData = {
        ...doItYourselfBlock,
        items: doItYourselfBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview: uploadedMedia.file_url,
              }
            : item,
        ),
      };

      setDoItYourselfBlock(nextDoItYourselfBlock);
      await saveDoItYourselfBlock(nextDoItYourselfBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload diy media",
      );
    } finally {
      setIsSavingDoItYourself(false);
    }
  }

  async function handleDiyMediaRemove(id: number) {
    if (!token || !doItYourselfCmsBlockId) return;

    try {
      setIsSavingDoItYourself(true);
      setError(null);

      const nextDoItYourselfBlock: RepeatableFeatureBlockData = {
        ...doItYourselfBlock,
        items: doItYourselfBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : item,
        ),
      };

      setDoItYourselfBlock(nextDoItYourselfBlock);
      await saveDoItYourselfBlock(nextDoItYourselfBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove diy media",
      );
    } finally {
      setIsSavingDoItYourself(false);
    }
  }

  async function handleDiyItemsBlur() {
    if (!token || !doItYourselfCmsBlockId) return;

    try {
      setIsSavingDoItYourself(true);
      setError(null);
      await saveDoItYourselfBlock(doItYourselfBlock);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save diy block");
    } finally {
      setIsSavingDoItYourself(false);
    }
  }

  async function handleManagePropertyBlur() {
    if (!token || !managePropertyCmsBlockId) return;

    try {
      setIsSavingManageProperty(true);
      setError(null);
      await saveManagePropertyBlock(managePropertyBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save manage property block",
      );
    } finally {
      setIsSavingManageProperty(false);
    }
  }

  async function handleDesignMosaicBlur() {
    if (!token || !designMosaicCmsBlockId) return;

    try {
      setIsSavingDesignMosaic(true);
      setError(null);
      await saveDesignMosaicBlock(designMosaicBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save design mosaic block",
      );
    } finally {
      setIsSavingDesignMosaic(false);
    }
  }

  async function handleHowItWorksBlur() {
    if (!token || !howItWorksCmsBlockId) return;

    try {
      setIsSavingHowItWorks(true);
      setError(null);
      await saveHowItWorksBlock(howItWorksBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save how it works block",
      );
    } finally {
      setIsSavingHowItWorks(false);
    }
  }

  async function handleSoveGroupBlur() {
    if (!token || !soveGroupCmsBlockId) return;

    try {
      setIsSavingSoveGroup(true);
      setError(null);
      await saveSoveGroupBlock(soveGroupBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save sove group block",
      );
    } finally {
      setIsSavingSoveGroup(false);
    }
  }

  async function handleReviewsBlur() {
    if (!token || !reviewsCmsBlockId) return;

    try {
      setIsSavingReviews(true);
      setError(null);
      await saveReviewsBlock(reviewsBlock);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save reviews block");
    } finally {
      setIsSavingReviews(false);
    }
  }

  async function handleRequestsBlur() {
    if (!token || !requestsCmsBlockId) return;

    try {
      setIsSavingRequests(true);
      setError(null);
      await saveRequestsBlock(requestsBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save requests block",
      );
    } finally {
      setIsSavingRequests(false);
    }
  }

  async function handleRequestsMediaUpload(file: File) {
    if (!token || !requestsCmsBlockId) return;

    try {
      setIsSavingRequests(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: requestsCmsBlockId,
      });

      const nextBlock: RequestsBlockData = {
        ...requestsBlock,
        mediaId: uploadedMedia.id,
        fileName: uploadedMedia.file_name || file.name,
        preview:
          uploadedMedia.file_url ||
          uploadedMedia.url ||
          uploadedMedia.large_url ||
          uploadedMedia.thumbnail_url ||
          undefined,
      };

      setRequestsBlock(nextBlock);
      await saveRequestsBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload requests media",
      );
    } finally {
      setIsSavingRequests(false);
    }
  }

  async function handleRequestsMediaRemove() {
    if (!token || !requestsCmsBlockId) return;

    try {
      setIsSavingRequests(true);
      setError(null);

      const nextBlock: RequestsBlockData = {
        ...requestsBlock,
        mediaId: undefined,
        fileName: "",
        preview: undefined,
      };

      setRequestsBlock(nextBlock);
      await saveRequestsBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove requests media",
      );
    } finally {
      setIsSavingRequests(false);
    }
  }

  async function handleManagePropertyMediaUpload(id: number, file: File) {
    if (!token || !managePropertyCmsBlockId) return;

    try {
      setIsSavingManageProperty(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: managePropertyCmsBlockId,
      });

      const nextManagePropertyBlock: MediaTextCardsBlockData = {
        ...managePropertyBlock,
        items: managePropertyBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview:
                  uploadedMedia.file_url ||
                  uploadedMedia.url ||
                  uploadedMedia.large_url ||
                  uploadedMedia.thumbnail_url ||
                  undefined,
              }
            : item,
        ),
      };

      setManagePropertyBlock(nextManagePropertyBlock);
      await saveManagePropertyBlock(nextManagePropertyBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload manage property media",
      );
    } finally {
      setIsSavingManageProperty(false);
    }
  }

  async function handleManagePropertyMediaRemove(id: number) {
    if (!token || !managePropertyCmsBlockId) return;

    try {
      setIsSavingManageProperty(true);
      setError(null);

      const nextManagePropertyBlock: MediaTextCardsBlockData = {
        ...managePropertyBlock,
        items: managePropertyBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : item,
        ),
      };

      setManagePropertyBlock(nextManagePropertyBlock);
      await saveManagePropertyBlock(nextManagePropertyBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to remove manage property media",
      );
    } finally {
      setIsSavingManageProperty(false);
    }
  }

  async function handleDesignMosaicMediaUpload(id: number, file: File) {
    if (!token || !designMosaicCmsBlockId) return;

    try {
      setIsSavingDesignMosaic(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: designMosaicCmsBlockId,
      });

      const nextDesignMosaicBlock: DesignMosaicBlockData = {
        ...designMosaicBlock,
        items: designMosaicBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview:
                  uploadedMedia.file_url ||
                  uploadedMedia.url ||
                  uploadedMedia.large_url ||
                  uploadedMedia.thumbnail_url ||
                  undefined,
              }
            : item,
        ),
      };

      setDesignMosaicBlock(nextDesignMosaicBlock);
      await saveDesignMosaicBlock(nextDesignMosaicBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload design mosaic media",
      );
    } finally {
      setIsSavingDesignMosaic(false);
    }
  }

  async function handleDesignMosaicMediaRemove(id: number) {
    if (!token || !designMosaicCmsBlockId) return;

    try {
      setIsSavingDesignMosaic(true);
      setError(null);

      const nextDesignMosaicBlock: DesignMosaicBlockData = {
        ...designMosaicBlock,
        items: designMosaicBlock.items.map((item) =>
          item.id === id
            ? {
                ...item,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : item,
        ),
      };

      setDesignMosaicBlock(nextDesignMosaicBlock);
      await saveDesignMosaicBlock(nextDesignMosaicBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to remove design mosaic media",
      );
    } finally {
      setIsSavingDesignMosaic(false);
    }
  }

  async function handleHowItWorksMediaUpload(id: number, file: File) {
    if (!token || !howItWorksCmsBlockId) return;

    try {
      setIsSavingHowItWorks(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: howItWorksCmsBlockId,
      });

      const nextBlock: HowItWorksBlockData = {
        ...howItWorksBlock,
        steps: howItWorksBlock.steps.map((step) =>
          step.id === id
            ? {
                ...step,
                mediaId: uploadedMedia.id,
                fileName: uploadedMedia.file_name || file.name,
                preview:
                  uploadedMedia.file_url ||
                  uploadedMedia.url ||
                  uploadedMedia.large_url ||
                  uploadedMedia.thumbnail_url ||
                  undefined,
              }
            : step,
        ),
      };

      setHowItWorksBlock(nextBlock);
      await saveHowItWorksBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload how it works media",
      );
    } finally {
      setIsSavingHowItWorks(false);
    }
  }

  async function handleHowItWorksMediaRemove(id: number) {
    if (!token || !howItWorksCmsBlockId) return;

    try {
      setIsSavingHowItWorks(true);
      setError(null);

      const nextBlock: HowItWorksBlockData = {
        ...howItWorksBlock,
        steps: howItWorksBlock.steps.map((step) =>
          step.id === id
            ? {
                ...step,
                mediaId: undefined,
                fileName: "",
                preview: undefined,
              }
            : step,
        ),
      };

      setHowItWorksBlock(nextBlock);
      await saveHowItWorksBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to remove how it works media",
      );
    } finally {
      setIsSavingHowItWorks(false);
    }
  }

  async function handleSoveGroupMediaUpload(file: File) {
    if (!token || !soveGroupCmsBlockId) return;

    try {
      setIsSavingSoveGroup(true);
      setError(null);

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: soveGroupCmsBlockId,
      });

      const nextBlock: SoveGroupBlockData = {
        ...soveGroupBlock,
        mediaId: uploadedMedia.id,
        fileName: uploadedMedia.file_name || file.name,
        preview:
          uploadedMedia.file_url ||
          uploadedMedia.url ||
          uploadedMedia.large_url ||
          uploadedMedia.thumbnail_url ||
          undefined,
      };

      setSoveGroupBlock(nextBlock);
      await saveSoveGroupBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload sove group media",
      );
    } finally {
      setIsSavingSoveGroup(false);
    }
  }

  async function handleSoveGroupMediaRemove() {
    if (!token || !soveGroupCmsBlockId) return;

    try {
      setIsSavingSoveGroup(true);
      setError(null);

      const nextBlock: SoveGroupBlockData = {
        ...soveGroupBlock,
        mediaId: undefined,
        fileName: "",
        preview: undefined,
      };

      setSoveGroupBlock(nextBlock);
      await saveSoveGroupBlock(nextBlock);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove sove group media",
      );
    } finally {
      setIsSavingSoveGroup(false);
    }
  }

  async function handlePublishHomepage() {
    if (!token || !homepageId) return;

    try {
      setIsPublishing(true);
      setPublishMessage(null);
      setError(null);

      const response = await fetch(
        `${API_BASE}/static-pages/${homepageId}/publish`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to publish homepage: ${response.status}`);
      }

      setPublishMessage("Homepage опубликована");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish homepage",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  if (!token) {
    return (
      <section className="p-6 text-[#8D8D8D]">
        Нет токена. Добавь его в localStorage.
      </section>
    );
  }

  if (isLoading) {
    return <section className="p-6">Загрузка homepage...</section>;
  }

  if (error) {
    return <section className="p-6 text-red-500">Ошибка: {error}</section>;
  }

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between rounded-[16px] border border-[#D9D9D9] bg-white px-4 py-3">
        <div>
          <p className="text-[16px] font-medium text-[#383838]">
            Публикация homepage
          </p>
          <p className="text-[13px] text-[#8D8D8D]">
            Изменения из этой админки попадут на главную только после
            публикации.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePublishHomepage}
          disabled={isPublishing}
          className="rounded-full bg-[#B45B3C] px-4 py-2 text-[14px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPublishing ? "Публикуем..." : "Опубликовать"}
        </button>
      </div>

      {publishMessage ? (
        <p className="text-[13px] text-[#3D7A52]">{publishMessage}</p>
      ) : null}

      <HeroBlockEditor
        value={heroBlock}
        onChange={setHeroBlock}
        onMediaUpload={handleHeroMediaUpload}
        onMediaRemove={handleHeroMediaRemove}
        onTitleBlur={handleHeroTitleBlur}
        onDescriptionBlur={handleHeroDescriptionBlur}
        onPrimaryButtonBlur={handleHeroPrimaryButtonBlur}
        onSecondaryButtonBlur={handleHeroSecondaryButtonBlur}
        isSaving={isSavingHero}
      />

      <MetricsBlockEditor
        value={metricsBlock}
        onChange={setMetricsBlock}
        onMediaUpload={handleMetricsMediaUpload}
        onMediaRemove={handleMetricsMediaRemove}
        onFieldBlur={handleMetricsBlur}
        isSaving={isSavingMetrics}
      />

      <MakeWithSoveBlockEditor
        value={makeWithSoveBlock}
        onChange={setMakeWithSoveBlock}
        onTitleBlur={handleMakeWithSoveTitleBlur}
        onDescriptionBlur={handleMakeWithSoveDescriptionBlur}
        onButtonBlur={handleMakeWithSoveButtonBlur}
        onItemTextBlur={handleMakeWithSoveItemsBlur}
        onMediaUpload={handleMakeWithSoveMediaUpload}
        onMediaRemove={handleMakeWithSoveMediaRemove}
        isSaving={isSavingMakeWithSove}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <CapitalizedTextBlockEditor
          value={capitalizedTextBlock}
          onChange={setCapitalizedTextBlock}
          onTextBlur={handleCapitalizedTextBlur}
          onButtonBlur={handleCapitalizedTextButtonBlur}
          isSaving={isSavingCapitalizedText}
        />

        <DoItYourselfBlockEditor
          value={doItYourselfBlock}
          onChange={setDoItYourselfBlock}
          onTitleBlur={handleDiyTitleBlur}
          onDescriptionBlur={handleDiyDescriptionBlur}
          onButtonBlur={handleDiyButtonBlur}
          onItemTextBlur={handleDiyItemsBlur}
          onMediaUpload={handleDiyMediaUpload}
          onMediaRemove={handleDiyMediaRemove}
          isSaving={isSavingDoItYourself}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PopularConceptsBlockEditor
          value={popularConceptsBlock}
          onChange={setPopularConceptsBlock}
          onTitleBlur={handlePopularConceptsTitleBlur}
          onSelectionChange={handlePopularConceptsSelectionChange}
          isSaving={isSavingPopularConcepts}
        />

        <ReadyProjectsBlockEditor
          value={readyProjectsBlock}
          onChange={setReadyProjectsBlock}
          onTitleBlur={handleReadyProjectsTitleBlur}
          onSelectionChange={handleReadyProjectsSelectionChange}
          isSaving={isSavingReadyProjects}
        />
      </div>

      <ManagePropertyBlockEditor
        value={managePropertyBlock}
        onChange={setManagePropertyBlock}
        onTitleBlur={handleManagePropertyBlur}
        onDescriptionBlur={handleManagePropertyBlur}
        onItemTitleBlur={handleManagePropertyBlur}
        onItemSubtitleBlur={handleManagePropertyBlur}
        onMediaUpload={handleManagePropertyMediaUpload}
        onMediaRemove={handleManagePropertyMediaRemove}
        isSaving={isSavingManageProperty}
      />

      <DesignMosaicBlockEditor
        value={designMosaicBlock}
        onChange={setDesignMosaicBlock}
        onTitleBlur={handleDesignMosaicBlur}
        onItemBlur={handleDesignMosaicBlur}
        onMediaUpload={handleDesignMosaicMediaUpload}
        onMediaRemove={handleDesignMosaicMediaRemove}
        isSaving={isSavingDesignMosaic}
      />

      <HowItWorksBlockEditor
        value={howItWorksBlock}
        onChange={setHowItWorksBlock}
        onTitleBlur={handleHowItWorksBlur}
        onSubtitleBlur={handleHowItWorksBlur}
        onStepBlur={handleHowItWorksBlur}
        onMediaUpload={handleHowItWorksMediaUpload}
        onMediaRemove={handleHowItWorksMediaRemove}
        isSaving={isSavingHowItWorks}
      />

      <SoveGroupBlockEditor
        value={soveGroupBlock}
        onChange={setSoveGroupBlock}
        onZoneBlur={handleSoveGroupBlur}
        onMediaUpload={handleSoveGroupMediaUpload}
        onMediaRemove={handleSoveGroupMediaRemove}
        isSaving={isSavingSoveGroup}
      />

      <ReviewsBlockEditor
        value={reviewsBlock}
        onChange={setReviewsBlock}
        onTitleBlur={handleReviewsBlur}
        onItemBlur={handleReviewsBlur}
        isSaving={isSavingReviews}
      />

      <RequestsBlockEditor
        value={requestsBlock}
        onChange={setRequestsBlock}
        onBlur={handleRequestsBlur}
        onMediaUpload={handleRequestsMediaUpload}
        onMediaRemove={handleRequestsMediaRemove}
        isSaving={isSavingRequests}
      />

      <WeTakeCareBlockEditor
        value={weTakeCareBlock}
        onChange={setWeTakeCareBlock}
      />
    </section>
  );
}
