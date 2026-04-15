"use client";

import { ServicePackagesHeaderBlockEditor } from "@/src/components/admin/content-tools/servicePackages/ServicePackagesHeaderBlockEditor";
import { ServicePackageCardEditor } from "@/src/components/admin/content-tools/servicePackages/ServicePackageCardEditor";
import { OtherServicesBlockEditor } from "@/src/components/admin/content-tools/servicePackages/OtherServicesBlockEditor";
import { QnaBlockEditor } from "@/src/components/admin/content-tools/servicePackages/QnaBlockEditor";
import { RequestsBlockEditor } from "@/src/components/admin/content-tools/home/RequestsBlockEditor";
import { useContentToolsServicePackages } from "@/app/(admin)/admin/content-tools/service-packages/useContentToolsServicePackages";

export default function ContentToolsServicePackagesPage() {
  const state = useContentToolsServicePackages();

  if (!state.token) {
    return (
      <section className="p-6 text-adminMuted">
        Нет токена. Добавь его в localStorage.
      </section>
    );
  }

  if (state.isLoading) {
    return <section className="p-6">Загрузка service_packages...</section>;
  }

  if (state.error) {
    return (
      <section className="p-6 text-red-500">Ошибка: {state.error}</section>
    );
  }

  return (
    <section className="space-y-8 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-[18px] font-semibold text-graphite">
            Content tools: service_packages
          </h1>
          {state.publishMessage ? (
            <p className="text-[13px] text-[#3D7A52]">{state.publishMessage}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={state.handlePublish}
          disabled={state.isPublishing}
          className="rounded-[10px] bg-primary px-4 py-2 text-[14px] font-medium text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.isPublishing ? "Публикуем..." : "Опубликовать"}
        </button>
      </div>

      <ServicePackagesHeaderBlockEditor
        value={state.headerBlock}
        onChange={state.setHeaderBlock}
        onBlur={state.handleHeaderBlur}
        onMediaUpload={state.handleHeaderMediaUpload}
        onMediaRemove={state.handleHeaderMediaRemove}
        isSaving={state.isSavingHeader}
      />

      <ServicePackageCardEditor
        title="Информация карточки (пакет 1)"
        value={state.package1}
        onChange={state.setPackage1}
        onBlur={state.handlePackage1Blur}
        onLeftImageUpload={state.handlePackage1LeftImageUpload}
        onLeftImageRemove={state.handlePackage1LeftImageRemove}
        onRightImageUpload={state.handlePackage1RightImageUpload}
        onRightImageRemove={state.handlePackage1RightImageRemove}
        onPopupDocUpload={state.handlePackage1PopupDocUpload}
        onPopupDocRemove={state.handlePackage1PopupDocRemove}
        isSaving={state.isSavingPackage1}
      />

      <ServicePackageCardEditor
        title="Информация карточки (пакет 2)"
        value={state.package2}
        onChange={state.setPackage2}
        onBlur={state.handlePackage2Blur}
        onLeftImageUpload={state.handlePackage2LeftImageUpload}
        onLeftImageRemove={state.handlePackage2LeftImageRemove}
        onRightImageUpload={state.handlePackage2RightImageUpload}
        onRightImageRemove={state.handlePackage2RightImageRemove}
        onPopupDocUpload={state.handlePackage2PopupDocUpload}
        onPopupDocRemove={state.handlePackage2PopupDocRemove}
        isSaving={state.isSavingPackage2}
      />

      <OtherServicesBlockEditor
        value={state.otherServices}
        onChange={state.setOtherServices}
        onBlur={state.handleOtherServicesBlur}
        onMediaUpload={state.handleOtherServicesMediaUpload}
        onMediaRemove={state.handleOtherServicesMediaRemove}
        isSaving={state.isSavingOtherServices}
      />

      <QnaBlockEditor
        value={state.qna}
        onChange={state.setQna}
        onBlur={state.handleQnaBlur}
        isSaving={state.isSavingQna}
      />

      <RequestsBlockEditor
        value={state.requests}
        onChange={state.setRequests}
        onBlur={state.handleRequestsBlur}
        onMediaUpload={state.handleRequestsMediaUpload}
        onMediaRemove={state.handleRequestsMediaRemove}
        isSaving={state.isSavingRequests}
      />
    </section>
  );
}

