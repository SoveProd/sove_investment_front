import { patchBlock } from "@/app/(admin)/admin/content-tools/home/patchBlock";
import {
  mapMetricsAdminToPatch,
  mapFeaturedAdminToPatch,
} from "@/lib/cms/homepageAdapters";
import type {
  HeroBlockData,
  MetricsBlockData,
  RepeatableFeatureBlockData,
  TextButtonBlockData,
  FeaturedSelectionBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

type Params = {
  apiBase: string;
  token: string | null;
  setError: (value: string | null) => void;

  heroCmsBlockId: number | null;
  metricsCmsBlockId: number | null;
  makeWithSoveCmsBlockId: number | null;
  doItYourselfCmsBlockId: number | null;
  capitalizedTextCmsBlockId: number | null;
  popularConceptsCmsBlockId: number | null;
  readyProjectsCmsBlockId: number | null;

  heroBlock: HeroBlockData;
  metricsBlock: MetricsBlockData;
  makeWithSoveBlock: RepeatableFeatureBlockData;
  doItYourselfBlock: RepeatableFeatureBlockData;
  capitalizedTextBlock: TextButtonBlockData;
  popularConceptsBlock: FeaturedSelectionBlockData;
  readyProjectsBlock: FeaturedSelectionBlockData;

  setIsSavingHero: (value: boolean) => void;
  setIsSavingMetrics: (value: boolean) => void;
  setIsSavingMakeWithSove: (value: boolean) => void;
  setIsSavingDoItYourself: (value: boolean) => void;
  setIsSavingCapitalizedText: (value: boolean) => void;
  setIsSavingPopularConcepts: (value: boolean) => void;
  setIsSavingReadyProjects: (value: boolean) => void;
};

export function createHomepageBlurHandlers({
  apiBase,
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
}: Params) {
  return {
    handleHeroTitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: heroCmsBlockId,
        token,
        patch: { title: heroBlock.title },
        setSaving: setIsSavingHero,
        setError,
        errorMessage: "Failed to save hero title",
      }),

    handleHeroDescriptionBlur: async () =>
      patchBlock({
        apiBase,
        blockId: heroCmsBlockId,
        token,
        patch: { text: heroBlock.description },
        setSaving: setIsSavingHero,
        setError,
        errorMessage: "Failed to save hero description",
      }),

    handleHeroPrimaryButtonBlur: async () =>
      patchBlock({
        apiBase,
        blockId: heroCmsBlockId,
        token,
        patch: {
          button: [
            { name: heroBlock.primaryButtonLabel, position: 0 },
            { name: heroBlock.secondaryButtonLabel, position: 1 },
          ],
        },
        setSaving: setIsSavingHero,
        setError,
        errorMessage: "Failed to save hero buttons",
      }),

    handleHeroSecondaryButtonBlur: async () =>
      patchBlock({
        apiBase,
        blockId: heroCmsBlockId,
        token,
        patch: {
          button: [
            { name: heroBlock.primaryButtonLabel, position: 0 },
            { name: heroBlock.secondaryButtonLabel, position: 1 },
          ],
        },
        setSaving: setIsSavingHero,
        setError,
        errorMessage: "Failed to save hero buttons",
      }),

    handleMetricsBlur: async () =>
      patchBlock({
        apiBase,
        blockId: metricsCmsBlockId,
        token,
        patch: mapMetricsAdminToPatch(metricsBlock),
        setSaving: setIsSavingMetrics,
        setError,
        errorMessage: "Failed to save metrics block",
      }),

    handleMakeWithSoveTitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: makeWithSoveCmsBlockId,
        token,
        patch: { title: makeWithSoveBlock.title },
        setSaving: setIsSavingMakeWithSove,
        setError,
        errorMessage: "Failed to save do_it_with_sove title",
      }),

    handleMakeWithSoveDescriptionBlur: async () =>
      patchBlock({
        apiBase,
        blockId: makeWithSoveCmsBlockId,
        token,
        patch: { text: makeWithSoveBlock.description },
        setSaving: setIsSavingMakeWithSove,
        setError,
        errorMessage: "Failed to save do_it_with_sove description",
      }),

    handleMakeWithSoveButtonBlur: async () =>
      patchBlock({
        apiBase,
        blockId: makeWithSoveCmsBlockId,
        token,
        patch: {
          button: {
            name: makeWithSoveBlock.buttonLabel,
            position: 0,
          },
        },
        setSaving: setIsSavingMakeWithSove,
        setError,
        errorMessage: "Failed to save do_it_with_sove button",
      }),

    handleDiyTitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: doItYourselfCmsBlockId,
        token,
        patch: { title: doItYourselfBlock.title },
        setSaving: setIsSavingDoItYourself,
        setError,
        errorMessage: "Failed to save diy title",
      }),

    handleDiyDescriptionBlur: async () =>
      patchBlock({
        apiBase,
        blockId: doItYourselfCmsBlockId,
        token,
        patch: { text: doItYourselfBlock.description },
        setSaving: setIsSavingDoItYourself,
        setError,
        errorMessage: "Failed to save diy description",
      }),

    handleDiyButtonBlur: async () =>
      patchBlock({
        apiBase,
        blockId: doItYourselfCmsBlockId,
        token,
        patch: {
          button: {
            name: doItYourselfBlock.buttonLabel,
            position: 0,
          },
        },
        setSaving: setIsSavingDoItYourself,
        setError,
        errorMessage: "Failed to save diy button",
      }),

    handleCapitalizedTextBlur: async () =>
      patchBlock({
        apiBase,
        blockId: capitalizedTextCmsBlockId,
        token,
        patch: { text: capitalizedTextBlock.text },
        setSaving: setIsSavingCapitalizedText,
        setError,
        errorMessage: "Failed to save capitalized text",
      }),

    handleCapitalizedTextButtonBlur: async () =>
      patchBlock({
        apiBase,
        blockId: capitalizedTextCmsBlockId,
        token,
        patch: {
          button: {
            name: capitalizedTextBlock.buttonLabel,
            position: 0,
          },
        },
        setSaving: setIsSavingCapitalizedText,
        setError,
        errorMessage: "Failed to save capitalized text button",
      }),

    handlePopularConceptsTitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: popularConceptsCmsBlockId,
        token,
        patch: { title: popularConceptsBlock.title },
        setSaving: setIsSavingPopularConcepts,
        setError,
        errorMessage: "Failed to save featured concepts title",
      }),

    handlePopularConceptsSubtitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: popularConceptsCmsBlockId,
        token,
        patch: { subtitle: popularConceptsBlock.subtitle },
        setSaving: setIsSavingPopularConcepts,
        setError,
        errorMessage: "Failed to save featured concepts subtitle",
      }),

    handleReadyProjectsTitleBlur: async () =>
      patchBlock({
        apiBase,
        blockId: readyProjectsCmsBlockId,
        token,
        patch: { title: readyProjectsBlock.title },
        setSaving: setIsSavingReadyProjects,
        setError,
        errorMessage: "Failed to save featured cases title",
      }),

    handlePopularConceptsSelectionChange: async (
      nextValue: FeaturedSelectionBlockData,
    ) =>
      patchBlock({
        apiBase,
        blockId: popularConceptsCmsBlockId,
        token,
        patch: mapFeaturedAdminToPatch(nextValue),
        setSaving: setIsSavingPopularConcepts,
        setError,
        errorMessage: "Failed to save featured concepts ids",
      }),

    handleReadyProjectsSelectionChange: async (
      nextValue: FeaturedSelectionBlockData,
    ) =>
      patchBlock({
        apiBase,
        blockId: readyProjectsCmsBlockId,
        token,
        patch: mapFeaturedAdminToPatch(nextValue),
        setSaving: setIsSavingReadyProjects,
        setError,
        errorMessage: "Failed to save featured cases ids",
      }),
  };
}
