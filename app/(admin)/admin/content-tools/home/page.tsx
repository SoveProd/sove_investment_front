"use client";

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
import { useContentToolsHome } from "./useContentToolsHome";
import { useEffect } from "react";
import { useAdminHeaderActions } from "@/src/components/admin/layout/AdminHeaderActionsContext";

export default function ContentToolsHomePage() {
  const state = useContentToolsHome();
  const header = useAdminHeaderActions();

  const handleSaveAll = async () => {
    // Save the fields that are wired to onBlur handlers, plus the blocks saved by explicit blur actions.
    await state.blurHandlers.handleHeroTitleBlur();
    await state.blurHandlers.handleHeroDescriptionBlur();
    await state.blurHandlers.handleHeroPrimaryButtonBlur();
    await state.blurHandlers.handleHeroSecondaryButtonBlur();

    await state.blurHandlers.handleMetricsBlur();

    await state.blurHandlers.handleMakeWithSoveTitleBlur();
    await state.blurHandlers.handleMakeWithSoveDescriptionBlur();
    await state.blurHandlers.handleMakeWithSoveButtonBlur();
    await state.handleMakeWithSoveItemsBlur();

    await state.blurHandlers.handleCapitalizedTextBlur();
    await state.blurHandlers.handleCapitalizedTextButtonBlur();

    await state.blurHandlers.handleDiyTitleBlur();
    await state.blurHandlers.handleDiyDescriptionBlur();
    await state.blurHandlers.handleDiyButtonBlur();
    await state.handleDiyItemsBlur();

    await state.blurHandlers.handlePopularConceptsTitleBlur();
    await state.blurHandlers.handlePopularConceptsSubtitleBlur();

    await state.blurHandlers.handleReadyProjectsTitleBlur();

    await state.handleManagePropertyBlur();
    await state.handleDesignMosaicBlur();
    await state.handleHowItWorksBlur();
    await state.handleSoveGroupBlur();
    await state.handleReviewsBlur();
    await state.handleRequestsBlur();
  };

  useEffect(() => {
    // IMPORTANT: keep hooks unconditional (no early returns above).
    // Only register header actions when the page is in a usable state.
    if (!state.token || state.isLoading || state.error) {
      header.clearHeaderActions();
      return;
    }

    header.setHeaderActions({
      onSave: handleSaveAll,
      onPublish: state.handlePublishHomepage,
      isPublishing: state.isPublishing,
    });

    return () => header.clearHeaderActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token, state.isLoading, state.error, state.isPublishing]);

  if (!state.token) {
    return (
      <section className="p-6 text-adminMuted">
        Нет токена. Добавь его в localStorage.
      </section>
    );
  }

  if (state.isLoading) {
    return <section className="p-6">Загрузка homepage...</section>;
  }

  if (state.error) {
    return (
      <section className="p-6 text-red-500">Ошибка: {state.error}</section>
    );
  }

  return (
    <section className="space-y-8">
    
      {state.publishMessage ? (
        <p className="text-[13px] text-[#3D7A52]">{state.publishMessage}</p>
      ) : null}
      <HeroBlockEditor
        value={state.heroBlock}
        onChange={state.setHeroBlock}
        onMediaUpload={state.handleHeroMediaUpload}
        onMediaRemove={state.handleHeroMediaRemove}
        onTitleBlur={state.blurHandlers.handleHeroTitleBlur}
        onDescriptionBlur={state.blurHandlers.handleHeroDescriptionBlur}
        onPrimaryButtonBlur={state.blurHandlers.handleHeroPrimaryButtonBlur}
        onSecondaryButtonBlur={state.blurHandlers.handleHeroSecondaryButtonBlur}
        isSaving={state.isSavingHero}
      />

      <MetricsBlockEditor
        value={state.metricsBlock}
        onChange={state.setMetricsBlock}
        onMediaUpload={state.handleMetricsMediaUpload}
        onMediaRemove={state.handleMetricsMediaRemove}
        onFieldBlur={state.blurHandlers.handleMetricsBlur}
        isSaving={state.isSavingMetrics}
      />

      <MakeWithSoveBlockEditor
        value={state.makeWithSoveBlock}
        onChange={state.setMakeWithSoveBlock}
        onTitleBlur={state.blurHandlers.handleMakeWithSoveTitleBlur}
        onDescriptionBlur={state.blurHandlers.handleMakeWithSoveDescriptionBlur}
        onButtonBlur={state.blurHandlers.handleMakeWithSoveButtonBlur}
        onItemTextBlur={state.handleMakeWithSoveItemsBlur}
        onMediaUpload={state.handleMakeWithSoveMediaUpload}
        onMediaRemove={state.handleMakeWithSoveMediaRemove}
        isSaving={state.isSavingMakeWithSove}
      />

      <div className="space-y-6">
        <CapitalizedTextBlockEditor
          value={state.capitalizedTextBlock}
          onChange={state.setCapitalizedTextBlock}
          onTextBlur={state.blurHandlers.handleCapitalizedTextBlur}
          onButtonBlur={state.blurHandlers.handleCapitalizedTextButtonBlur}
          isSaving={state.isSavingCapitalizedText}
        />

        <DoItYourselfBlockEditor
          value={state.doItYourselfBlock}
          onChange={state.setDoItYourselfBlock}
          onTitleBlur={state.blurHandlers.handleDiyTitleBlur}
          onDescriptionBlur={state.blurHandlers.handleDiyDescriptionBlur}
          onButtonBlur={state.blurHandlers.handleDiyButtonBlur}
          onItemTextBlur={state.handleDiyItemsBlur}
          onMediaUpload={state.handleDiyMediaUpload}
          onMediaRemove={state.handleDiyMediaRemove}
          isSaving={state.isSavingDoItYourself}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PopularConceptsBlockEditor
          value={state.popularConceptsBlock}
          onChange={state.setPopularConceptsBlock}
          onTitleBlur={state.blurHandlers.handlePopularConceptsTitleBlur}
          onSelectionChange={
            state.blurHandlers.handlePopularConceptsSelectionChange
          }
          isSaving={state.isSavingPopularConcepts}
        />

        <ReadyProjectsBlockEditor
          value={state.readyProjectsBlock}
          onChange={state.setReadyProjectsBlock}
          onTitleBlur={state.blurHandlers.handleReadyProjectsTitleBlur}
          onSelectionChange={
            state.blurHandlers.handleReadyProjectsSelectionChange
          }
          isSaving={state.isSavingReadyProjects}
        />
      </div>

      <ManagePropertyBlockEditor
        value={state.managePropertyBlock}
        onChange={state.setManagePropertyBlock}
        onTitleBlur={state.handleManagePropertyBlur}
        onDescriptionBlur={state.handleManagePropertyBlur}
        onItemTitleBlur={state.handleManagePropertyBlur}
        onItemSubtitleBlur={state.handleManagePropertyBlur}
        onMediaUpload={state.handleManagePropertyMediaUpload}
        onMediaRemove={state.handleManagePropertyMediaRemove}
        isSaving={state.isSavingManageProperty}
      />

      <DesignMosaicBlockEditor
        value={state.designMosaicBlock}
        onChange={state.setDesignMosaicBlock}
        onTitleBlur={state.handleDesignMosaicBlur}
        onItemBlur={state.handleDesignMosaicBlur}
        onMediaUpload={state.handleDesignMosaicMediaUpload}
        onMediaRemove={state.handleDesignMosaicMediaRemove}
        isSaving={state.isSavingDesignMosaic}
      />

      <HowItWorksBlockEditor
        value={state.howItWorksBlock}
        onChange={state.setHowItWorksBlock}
        onTitleBlur={state.handleHowItWorksBlur}
        onSubtitleBlur={state.handleHowItWorksBlur}
        onStepBlur={state.handleHowItWorksBlur}
        onMediaUpload={state.handleHowItWorksMediaUpload}
        onMediaRemove={state.handleHowItWorksMediaRemove}
        isSaving={state.isSavingHowItWorks}
      />

      <SoveGroupBlockEditor
        value={state.soveGroupBlock}
        onChange={state.setSoveGroupBlock}
        onZoneBlur={state.handleSoveGroupBlur}
        onMediaUpload={state.handleSoveGroupMediaUpload}
        onMediaRemove={state.handleSoveGroupMediaRemove}
        isSaving={state.isSavingSoveGroup}
      />

      <ReviewsBlockEditor
        value={state.reviewsBlock}
        onChange={state.setReviewsBlock}
        onTitleBlur={state.handleReviewsBlur}
        onItemBlur={state.handleReviewsBlur}
        isSaving={state.isSavingReviews}
      />

      <RequestsBlockEditor
        value={state.requestsBlock}
        onChange={state.setRequestsBlock}
        onBlur={state.handleRequestsBlur}
        onMediaUpload={state.handleRequestsMediaUpload}
        onMediaRemove={state.handleRequestsMediaRemove}
        isSaving={state.isSavingRequests}
      />

      <WeTakeCareBlockEditor
        value={state.weTakeCareBlock}
        onChange={state.setWeTakeCareBlock}
      />
    </section>
  );
}
