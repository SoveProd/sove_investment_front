"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { loadHomepageDraft } from "@/app/(admin)/admin/content-tools/home/loadHomepageDraft";
import { hydrateHomepageBlocks } from "@/app/(admin)/admin/content-tools/home/hydrateHomepageBlocks";
import { createHomepageBlurHandlers } from "@/app/(admin)/admin/content-tools/home/createHomepageBlurHandlers";
import { uploadMedia } from "@/app/(admin)/admin/content-tools/home/uploadMedia";
import { patchBlockWithFallback } from "@/app/(admin)/admin/content-tools/home/patchBlock";
import { buildHeroMediaPatches } from "@/app/(admin)/admin/content-tools/home/blocks/hero";
import { buildMetricsMediaPatches } from "@/app/(admin)/admin/content-tools/home/blocks/metrics";
import {
  HOW_IT_WORKS_BLOCK_TYPE,
  hydrateHowItWorksBlock,
  buildHowItWorksPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/howItWorks";
import {
  SOVE_GROUP_BLOCK_TYPE,
  hydrateSoveGroupBlock,
  buildSoveGroupPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/soveGroup";
import {
  REVIEWS_BLOCK_TYPE,
  hydrateReviewsBlock,
  buildReviewsPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/reviews";
import {
  REQUESTS_BLOCK_TYPE,
  hydrateRequestsBlock,
  buildRequestsPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/requests";
import { buildRepeatableFeaturePatches } from "@/app/(admin)/admin/content-tools/home/blocks/repeatableFeature";
import {
  MANAGE_PROPERTY_BLOCK_TYPE,
  hydrateManagePropertyBlock,
  buildManagePropertyPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/manageProperty";
import {
  DESIGN_MOSAIC_BLOCK_TYPE,
  hydrateDesignMosaicBlock,
  buildDesignMosaicPatches,
} from "@/app/(admin)/admin/content-tools/home/blocks/designMosaic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";
const STORAGE_KEY = "sove:homepage:lastSaveTs";
const CHANNEL_NAME = "sove:homepage";

function notifyHomepageChanged() {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    if ("BroadcastChannel" in window) {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type: "saved", ts: Date.now() });
      bc.close();
    }
  } catch {
    // ignore
  }
}

type CaseStudyShort = { id: number; title: string };

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

  const data = (await response.json()) as Array<{ id: number; title: string }>;
  return data.map((item) => ({ id: item.id, title: item.title }));
}

function createFallbackSaver(
  token: string | null,
  setError: (v: string | null) => void,
) {
  return async (params: {
    blockId: number | null;
    patches: Record<string, unknown>[];
    setSaving: (value: boolean) => void;
    errorMessage: string;
  }) =>
    patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: params.blockId,
      token,
      patches: params.patches,
      setSaving: params.setSaving,
      setError,
      errorMessage: params.errorMessage,
    });
}

export function useContentToolsHome() {
  const [homepageId, setHomepageId] = useState<number | null>(1);

  const [heroBlock, setHeroBlock] = useState<HeroBlockData>(initialHeroBlock);
  const [metricsBlock, setMetricsBlock] = useState<MetricsBlockData>(initialMetricsBlock);
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
  const [weTakeCareBlock, setWeTakeCareBlock] =
    useState<MediaListBlockData>(initialWeTakeCareBlock);
  const [managePropertyBlock, setManagePropertyBlock] =
    useState<MediaTextCardsBlockData>(initialManagePropertyBlock);
  const [designMosaicBlock, setDesignMosaicBlock] =
    useState<DesignMosaicBlockData>(initialDesignMosaicBlock);
  const [howItWorksBlock, setHowItWorksBlock] =
    useState<HowItWorksBlockData>(initialHowItWorksBlock);
  const [soveGroupBlock, setSoveGroupBlock] =
    useState<SoveGroupBlockData>(initialSoveGroupBlock);
  const [reviewsBlock, setReviewsBlock] = useState<ReviewsBlockData>(initialReviewsBlock);
  const [requestsBlock, setRequestsBlock] =
    useState<RequestsBlockData>(initialRequestsBlock);

  const [heroCmsBlockId, setHeroCmsBlockId] = useState<number | null>(null);
  const [metricsCmsBlockId, setMetricsCmsBlockId] = useState<number | null>(null);
  const [makeWithSoveCmsBlockId, setMakeWithSoveCmsBlockId] = useState<number | null>(
    null,
  );
  const [doItYourselfCmsBlockId, setDoItYourselfCmsBlockId] = useState<number | null>(
    null,
  );
  const [capitalizedTextCmsBlockId, setCapitalizedTextCmsBlockId] =
    useState<number | null>(null);
  const [popularConceptsCmsBlockId, setPopularConceptsCmsBlockId] =
    useState<number | null>(null);
  const [readyProjectsCmsBlockId, setReadyProjectsCmsBlockId] =
    useState<number | null>(null);
  const [managePropertyCmsBlockId, setManagePropertyCmsBlockId] =
    useState<number | null>(null);
  const [designMosaicCmsBlockId, setDesignMosaicCmsBlockId] =
    useState<number | null>(null);
  const [howItWorksCmsBlockId, setHowItWorksCmsBlockId] =
    useState<number | null>(null);
  const [soveGroupCmsBlockId, setSoveGroupCmsBlockId] = useState<number | null>(null);
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
  const caseStudiesShortRef = useRef<CaseStudyShort[] | null>(null);
  const isReloadingRef = useRef(false);

  const saveWithFallback = useMemo(
    () => createFallbackSaver(token, setError),
    [token],
  );

  const reloadFromServer = useCallback(async () => {
    if (!token || isReloadingRef.current) return;

    try {
      isReloadingRef.current = true;
      setError(null);

      const safeToken = token as string;
      const homepageDraft = await loadHomepageDraft({
        apiBase: API_BASE,
        token: safeToken,
        pageId: 1,
      });

      let shortList = caseStudiesShortRef.current;
      if (!shortList) {
        shortList = await loadCaseStudiesShort(safeToken);
        caseStudiesShortRef.current = shortList;
      }

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
        (block) => block.block_type === MANAGE_PROPERTY_BLOCK_TYPE,
      );
      if (managePropertySourceBlock) {
        setManagePropertyCmsBlockId(managePropertySourceBlock.id);
        setManagePropertyBlock(hydrateManagePropertyBlock(managePropertySourceBlock));
      }

      const designMosaicSourceBlock = homepageDraft.blocks.find(
        (block) => block.block_type === DESIGN_MOSAIC_BLOCK_TYPE,
      );
      if (designMosaicSourceBlock) {
        setDesignMosaicCmsBlockId(designMosaicSourceBlock.id);
        setDesignMosaicBlock(hydrateDesignMosaicBlock(designMosaicSourceBlock));
      }

      const howItWorksSourceBlock = homepageDraft.blocks.find(
        (block) => block.block_type === HOW_IT_WORKS_BLOCK_TYPE,
      );
      if (howItWorksSourceBlock) {
        setHowItWorksCmsBlockId(howItWorksSourceBlock.id);
        setHowItWorksBlock(hydrateHowItWorksBlock(howItWorksSourceBlock));
      }

      const soveGroupSourceBlock = homepageDraft.blocks.find(
        (block) => block.block_type === SOVE_GROUP_BLOCK_TYPE,
      );
      if (soveGroupSourceBlock) {
        setSoveGroupCmsBlockId(soveGroupSourceBlock.id);
        setSoveGroupBlock(hydrateSoveGroupBlock(soveGroupSourceBlock));
      }

      const reviewsSourceBlock = homepageDraft.blocks.find(
        (block) => block.block_type === REVIEWS_BLOCK_TYPE,
      );
      if (reviewsSourceBlock) {
        setReviewsCmsBlockId(reviewsSourceBlock.id);
        setReviewsBlock(hydrateReviewsBlock(reviewsSourceBlock));
      }

      const requestsSourceBlock = homepageDraft.blocks.find(
        (block) => block.block_type === REQUESTS_BLOCK_TYPE,
      );
      if (requestsSourceBlock) {
        setRequestsCmsBlockId(requestsSourceBlock.id);
        setRequestsBlock(hydrateRequestsBlock(requestsSourceBlock));
      }

      setPopularConceptsBlock((prev) => mergeFeaturedItems(prev, shortList ?? []));
      setReadyProjectsBlock((prev) => mergeFeaturedItems(prev, shortList ?? []));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reload homepage");
    } finally {
      isReloadingRef.current = false;
    }
  }, [token]);

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

        const safeToken = token as string;
        const [homepageDraft, caseStudiesShort] = await Promise.all([
          loadHomepageDraft({ apiBase: API_BASE, token: safeToken, pageId: 1 }),
          loadCaseStudiesShort(safeToken),
        ]);
        caseStudiesShortRef.current = caseStudiesShort;

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
          (block) => block.block_type === MANAGE_PROPERTY_BLOCK_TYPE,
        );
        if (managePropertySourceBlock) {
          setManagePropertyCmsBlockId(managePropertySourceBlock.id);
          setManagePropertyBlock(hydrateManagePropertyBlock(managePropertySourceBlock));
        }

        const designMosaicSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === DESIGN_MOSAIC_BLOCK_TYPE,
        );
        if (designMosaicSourceBlock) {
          setDesignMosaicCmsBlockId(designMosaicSourceBlock.id);
          setDesignMosaicBlock(hydrateDesignMosaicBlock(designMosaicSourceBlock));
        }

        const howItWorksSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === HOW_IT_WORKS_BLOCK_TYPE,
        );
        if (howItWorksSourceBlock) {
          setHowItWorksCmsBlockId(howItWorksSourceBlock.id);
          setHowItWorksBlock(hydrateHowItWorksBlock(howItWorksSourceBlock));
        }

        const soveGroupSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === SOVE_GROUP_BLOCK_TYPE,
        );
        if (soveGroupSourceBlock) {
          setSoveGroupCmsBlockId(soveGroupSourceBlock.id);
          setSoveGroupBlock(hydrateSoveGroupBlock(soveGroupSourceBlock));
        }

        const reviewsSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === REVIEWS_BLOCK_TYPE,
        );
        if (reviewsSourceBlock) {
          setReviewsCmsBlockId(reviewsSourceBlock.id);
          setReviewsBlock(hydrateReviewsBlock(reviewsSourceBlock));
        }

        const requestsSourceBlock = homepageDraft.blocks.find(
          (block) => block.block_type === REQUESTS_BLOCK_TYPE,
        );
        if (requestsSourceBlock) {
          setRequestsCmsBlockId(requestsSourceBlock.id);
          setRequestsBlock(hydrateRequestsBlock(requestsSourceBlock));
        }

        setPopularConceptsBlock((prev) => mergeFeaturedItems(prev, caseStudiesShort));
        setReadyProjectsBlock((prev) => mergeFeaturedItems(prev, caseStudiesShort));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    loadDraft();
  }, [token]);

  const blurHandlers = createHomepageBlurHandlers({
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
    const ok = await saveWithFallback({
      blockId: heroCmsBlockId,
      patches: buildHeroMediaPatches(nextMediaIds),
      setSaving: setIsSavingHero,
      errorMessage: "Failed to save hero media",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveMetricsBlock(nextValue: MetricsBlockData) {
    const ok = await saveWithFallback({
      blockId: metricsCmsBlockId,
      patches: buildMetricsMediaPatches(nextValue),
      setSaving: setIsSavingMetrics,
      errorMessage: "Failed to save metrics block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveRepeatableFeatureBlock(
    blockId: number | null,
    nextValue: RepeatableFeatureBlockData,
    setSaving: (v: boolean) => void,
    errorMessage: string,
  ) {
    const ok = await saveWithFallback({
      blockId,
      patches: buildRepeatableFeaturePatches(nextValue),
      setSaving,
      errorMessage,
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveManageProperty(nextValue: MediaTextCardsBlockData) {
    const ok = await saveWithFallback({
      blockId: managePropertyCmsBlockId,
      patches: buildManagePropertyPatches(nextValue),
      setSaving: setIsSavingManageProperty,
      errorMessage: "Failed to save manage property block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveDesignMosaic(nextValue: DesignMosaicBlockData) {
    const ok = await saveWithFallback({
      blockId: designMosaicCmsBlockId,
      patches: buildDesignMosaicPatches(nextValue),
      setSaving: setIsSavingDesignMosaic,
      errorMessage: "Failed to save design mosaic block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveHowItWorks(nextValue: HowItWorksBlockData) {
    const ok = await saveWithFallback({
      blockId: howItWorksCmsBlockId,
      patches: buildHowItWorksPatches(nextValue),
      setSaving: setIsSavingHowItWorks,
      errorMessage: "Failed to save how it works block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveSoveGroup(nextValue: SoveGroupBlockData) {
    const ok = await saveWithFallback({
      blockId: soveGroupCmsBlockId,
      patches: buildSoveGroupPatches(nextValue),
      setSaving: setIsSavingSoveGroup,
      errorMessage: "Failed to save sove group block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveReviews(nextValue: ReviewsBlockData) {
    const ok = await saveWithFallback({
      blockId: reviewsCmsBlockId,
      patches: buildReviewsPatches(nextValue),
      setSaving: setIsSavingReviews,
      errorMessage: "Failed to save reviews block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function saveRequests(nextValue: RequestsBlockData) {
    const ok = await saveWithFallback({
      blockId: requestsCmsBlockId,
      patches: buildRequestsPatches(nextValue),
      setSaving: setIsSavingRequests,
      errorMessage: "Failed to save requests block",
    });
    if (ok) {
      await reloadFromServer();
      notifyHomepageChanged();
    }
  }

  async function handleHeroMediaUpload(file: File) {
    if (!token || !heroCmsBlockId) return;

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
  }

  async function handleHeroMediaRemove() {
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
  }

  async function handleMetricsMediaRemove(id: number) {
    if (!token || !metricsCmsBlockId) return;

    const nextMetricsBlock: MetricsBlockData = {
      ...metricsBlock,
      items: metricsBlock.items.map((item) =>
        item.id === id
          ? { ...item, mediaId: undefined, fileName: "", preview: undefined }
          : item,
      ),
    };

    setMetricsBlock(nextMetricsBlock);
    await saveMetricsBlock(nextMetricsBlock);
  }

  async function handleRepeatableMediaUpload(
    blockId: number | null,
    block: RepeatableFeatureBlockData,
    setBlock: (v: RepeatableFeatureBlockData) => void,
    setSaving: (v: boolean) => void,
    id: number,
    file: File,
    errorMessage: string,
  ) {
    if (!token || !blockId) return;

    const uploadedMedia = await uploadMedia({
      apiBase: API_BASE,
      token,
      file,
      ownerType: "page_block",
      ownerId: blockId,
    });

    const nextBlock: RepeatableFeatureBlockData = {
      ...block,
      items: block.items.map((item) =>
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

    setBlock(nextBlock);
    await saveRepeatableFeatureBlock(blockId, nextBlock, setSaving, errorMessage);
  }

  async function handleRepeatableMediaRemove(
    blockId: number | null,
    block: RepeatableFeatureBlockData,
    setBlock: (v: RepeatableFeatureBlockData) => void,
    setSaving: (v: boolean) => void,
    id: number,
    errorMessage: string,
  ) {
    if (!token || !blockId) return;

    const nextBlock: RepeatableFeatureBlockData = {
      ...block,
      items: block.items.map((item) =>
        item.id === id
          ? { ...item, mediaId: undefined, fileName: "", preview: undefined }
          : item,
      ),
    };

    setBlock(nextBlock);
    await saveRepeatableFeatureBlock(blockId, nextBlock, setSaving, errorMessage);
  }

  async function handleManagePropertyMediaUpload(id: number, file: File) {
    if (!token || !managePropertyCmsBlockId) return;

    const uploadedMedia = await uploadMedia({
      apiBase: API_BASE,
      token,
      file,
      ownerType: "page_block",
      ownerId: managePropertyCmsBlockId,
    });

    const nextBlock: MediaTextCardsBlockData = {
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

    setManagePropertyBlock(nextBlock);
    await saveManageProperty(nextBlock);
  }

  async function handleManagePropertyMediaRemove(id: number) {
    if (!token || !managePropertyCmsBlockId) return;

    const nextBlock: MediaTextCardsBlockData = {
      ...managePropertyBlock,
      items: managePropertyBlock.items.map((item) =>
        item.id === id
          ? { ...item, mediaId: undefined, fileName: "", preview: undefined }
          : item,
      ),
    };

    setManagePropertyBlock(nextBlock);
    await saveManageProperty(nextBlock);
  }

  async function handleDesignMosaicMediaUpload(id: number, file: File) {
    if (!token || !designMosaicCmsBlockId) return;

    const uploadedMedia = await uploadMedia({
      apiBase: API_BASE,
      token,
      file,
      ownerType: "page_block",
      ownerId: designMosaicCmsBlockId,
    });

    const nextBlock: DesignMosaicBlockData = {
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

    setDesignMosaicBlock(nextBlock);
    await saveDesignMosaic(nextBlock);
  }

  async function handleDesignMosaicMediaRemove(id: number) {
    if (!token || !designMosaicCmsBlockId) return;

    const nextBlock: DesignMosaicBlockData = {
      ...designMosaicBlock,
      items: designMosaicBlock.items.map((item) =>
        item.id === id
          ? { ...item, mediaId: undefined, fileName: "", preview: undefined }
          : item,
      ),
    };

    setDesignMosaicBlock(nextBlock);
    await saveDesignMosaic(nextBlock);
  }

  async function handleHowItWorksMediaUpload(id: number, file: File) {
    if (!token || !howItWorksCmsBlockId) return;

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
    await saveHowItWorks(nextBlock);
  }

  async function handleHowItWorksMediaRemove(id: number) {
    if (!token || !howItWorksCmsBlockId) return;

    const nextBlock: HowItWorksBlockData = {
      ...howItWorksBlock,
      steps: howItWorksBlock.steps.map((step) =>
        step.id === id
          ? { ...step, mediaId: undefined, fileName: "", preview: undefined }
          : step,
      ),
    };

    setHowItWorksBlock(nextBlock);
    await saveHowItWorks(nextBlock);
  }

  async function handleSoveGroupMediaUpload(file: File) {
    if (!token || !soveGroupCmsBlockId) return;

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
    await saveSoveGroup(nextBlock);
  }

  async function handleSoveGroupMediaRemove() {
    if (!token || !soveGroupCmsBlockId) return;

    const nextBlock: SoveGroupBlockData = {
      ...soveGroupBlock,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    };

    setSoveGroupBlock(nextBlock);
    await saveSoveGroup(nextBlock);
  }

  async function handleRequestsMediaUpload(file: File) {
    if (!token || !requestsCmsBlockId) return;

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
    await saveRequests(nextBlock);
  }

  async function handleRequestsMediaRemove() {
    if (!token || !requestsCmsBlockId) return;

    const nextBlock: RequestsBlockData = {
      ...requestsBlock,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    };

    setRequestsBlock(nextBlock);
    await saveRequests(nextBlock);
  }

  async function handlePublishHomepage() {
    if (!token || !homepageId) return;

    try {
      setIsPublishing(true);
      setPublishMessage(null);
      setError(null);

      const response = await fetch(`${API_BASE}/static-pages/${homepageId}/publish`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to publish homepage: ${response.status}`);
      }

      setPublishMessage("Homepage опубликована");
      notifyHomepageChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish homepage");
    } finally {
      setIsPublishing(false);
    }
  }

  return {
    token,
    isLoading,
    error,
    isPublishing,
    publishMessage,
    handlePublishHomepage,

    heroBlock,
    setHeroBlock,
    metricsBlock,
    setMetricsBlock,
    makeWithSoveBlock,
    setMakeWithSoveBlock,
    doItYourselfBlock,
    setDoItYourselfBlock,
    capitalizedTextBlock,
    setCapitalizedTextBlock,
    popularConceptsBlock,
    setPopularConceptsBlock,
    readyProjectsBlock,
    setReadyProjectsBlock,
    weTakeCareBlock,
    setWeTakeCareBlock,
    managePropertyBlock,
    setManagePropertyBlock,
    designMosaicBlock,
    setDesignMosaicBlock,
    howItWorksBlock,
    setHowItWorksBlock,
    soveGroupBlock,
    setSoveGroupBlock,
    reviewsBlock,
    setReviewsBlock,
    requestsBlock,
    setRequestsBlock,

    isSavingHero,
    isSavingMetrics,
    isSavingMakeWithSove,
    isSavingDoItYourself,
    isSavingCapitalizedText,
    isSavingPopularConcepts,
    isSavingReadyProjects,
    isSavingManageProperty,
    isSavingDesignMosaic,
    isSavingHowItWorks,
    isSavingSoveGroup,
    isSavingReviews,
    isSavingRequests,

    blurHandlers,

    handleHeroMediaUpload,
    handleHeroMediaRemove,
    handleMetricsMediaUpload,
    handleMetricsMediaRemove,

    handleMakeWithSoveMediaUpload: (id: number, file: File) =>
      handleRepeatableMediaUpload(
        makeWithSoveCmsBlockId,
        makeWithSoveBlock,
        setMakeWithSoveBlock,
        setIsSavingMakeWithSove,
        id,
        file,
        "Failed to upload make-with-sove media",
      ),
    handleMakeWithSoveMediaRemove: (id: number) =>
      handleRepeatableMediaRemove(
        makeWithSoveCmsBlockId,
        makeWithSoveBlock,
        setMakeWithSoveBlock,
        setIsSavingMakeWithSove,
        id,
        "Failed to remove make-with-sove media",
      ),
    handleMakeWithSoveItemsBlur: async () => {
      if (!token || !makeWithSoveCmsBlockId) return;
      await saveRepeatableFeatureBlock(
        makeWithSoveCmsBlockId,
        makeWithSoveBlock,
        setIsSavingMakeWithSove,
        "Failed to save make-with-sove block",
      );
    },

    handleDiyMediaUpload: (id: number, file: File) =>
      handleRepeatableMediaUpload(
        doItYourselfCmsBlockId,
        doItYourselfBlock,
        setDoItYourselfBlock,
        setIsSavingDoItYourself,
        id,
        file,
        "Failed to upload diy media",
      ),
    handleDiyMediaRemove: (id: number) =>
      handleRepeatableMediaRemove(
        doItYourselfCmsBlockId,
        doItYourselfBlock,
        setDoItYourselfBlock,
        setIsSavingDoItYourself,
        id,
        "Failed to remove diy media",
      ),
    handleDiyItemsBlur: async () => {
      if (!token || !doItYourselfCmsBlockId) return;
      await saveRepeatableFeatureBlock(
        doItYourselfCmsBlockId,
        doItYourselfBlock,
        setIsSavingDoItYourself,
        "Failed to save diy block",
      );
    },

    handleManagePropertyBlur: async () => {
      if (!token || !managePropertyCmsBlockId) return;
      await saveManageProperty(managePropertyBlock);
    },
    handleManagePropertyMediaUpload,
    handleManagePropertyMediaRemove,

    handleDesignMosaicBlur: async () => {
      if (!token || !designMosaicCmsBlockId) return;
      await saveDesignMosaic(designMosaicBlock);
    },
    handleDesignMosaicMediaUpload,
    handleDesignMosaicMediaRemove,

    handleHowItWorksBlur: async () => {
      if (!token || !howItWorksCmsBlockId) return;
      await saveHowItWorks(howItWorksBlock);
    },
    handleHowItWorksMediaUpload,
    handleHowItWorksMediaRemove,

    handleSoveGroupBlur: async () => {
      if (!token || !soveGroupCmsBlockId) return;
      await saveSoveGroup(soveGroupBlock);
    },
    handleSoveGroupMediaUpload,
    handleSoveGroupMediaRemove,

    handleReviewsBlur: async () => {
      if (!token || !reviewsCmsBlockId) return;
      await saveReviews(reviewsBlock);
    },

    handleRequestsBlur: async () => {
      if (!token || !requestsCmsBlockId) return;
      await saveRequests(requestsBlock);
    },
    handleRequestsMediaUpload,
    handleRequestsMediaRemove,
  };
}

