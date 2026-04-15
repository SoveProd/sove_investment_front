"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CmsBlock, CmsStaticPage } from "@/lib/cms/types";
import { loadServicePackagesDraft } from "@/app/(admin)/admin/content-tools/service-packages/loadServicePackagesDraft";
import type {
  OtherServicesBlockData,
  QnaBlockData,
  ServicePackageCardData,
  ServicePackagesHeaderBlockData,
} from "@/app/(admin)/admin/content-tools/service-packages/types";
import { patchBlock, patchBlockWithFallback } from "@/app/(admin)/admin/content-tools/home/patchBlock";
import { uploadMedia } from "@/app/(admin)/admin/content-tools/home/uploadMedia";
import {
  mapServicePackageAdminToPatch,
  mapServicePackageBlockToAdmin,
} from "@/lib/cms/servicePackagesAdapters";
import {
  mapOtherServicesAdminToPatch,
  mapOtherServicesBlockToAdmin,
} from "@/lib/cms/otherServicesAdapters";
import { mapQnaAdminToPatch, mapQnaBlockToAdmin } from "@/lib/cms/qnaAdapters";
import type { RequestsBlockData } from "@/app/(admin)/admin/content-tools/home/types";
import {
  buildRequestsPackPatches,
  hydrateRequestsPackToAdmin,
} from "@/lib/cms/servicePackages";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";
const HEADER_BLOCK_TYPE = "ceiling:pack";
const PACKAGE_1_BLOCK_TYPE = "s_package_1:pack";
const PACKAGE_2_BLOCK_TYPE = "s_package_2:pack";
const OTHER_SERVICES_BLOCK_TYPE = "other_services:pack";
const QNA_BLOCK_TYPE = "qna:pack";
const REQUESTS_BLOCK_TYPE = "last:pack";

function ensureContentHasId(patch: Record<string, unknown>, id: number | null) {
  if (!id) return patch;
  const content = patch.content;
  if (!content || typeof content !== "object") return patch;
  if ("id" in (content as Record<string, unknown>)) return patch;
  return {
    ...patch,
    content: {
      ...(content as Record<string, unknown>),
      id,
    },
  };
}

function buildMediaPatches(nextMediaIds: number[]) {
  const firstMediaId = nextMediaIds[0];
  return [
    { media_ids: nextMediaIds },
    { media_id: firstMediaId ?? null },
    { media: firstMediaId ? [{ id: firstMediaId, position: 0 }] : [] },
  ] as Record<string, unknown>[];
}

function buildOrderedMediaPatches({
  leftId,
  rightId,
  docId,
}: {
  leftId?: number;
  rightId?: number;
  docId?: number;
}) {
  const ordered = [leftId, rightId, docId].filter(
    (id): id is number => typeof id === "number" && id > 0,
  );

  const media = [
    leftId ? { id: leftId, position: 0 } : null,
    rightId ? { id: rightId, position: 1 } : null,
    docId ? { id: docId, position: 2 } : null,
  ].filter(Boolean);

  return [{ media }, ...buildMediaPatches(ordered)] as Record<string, unknown>[];
}

function hydrateHeaderBlock(block?: CmsBlock | null): ServicePackagesHeaderBlockData {
  const media0 = block?.media?.[0];
  return {
    title: block?.title || "",
    subtitle: block?.subtitle || "",
    mediaId: media0?.id,
    fileName: media0?.file_name || "",
    preview: media0?.large_url || media0?.file_url,
  };
}

export function useContentToolsServicePackages() {
  const [token, setToken] = useState<string | null>(null);
  const [pageId, setPageId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const [headerCmsBlockId, setHeaderCmsBlockId] = useState<number | null>(null);
  const [headerBlock, setHeaderBlock] = useState<ServicePackagesHeaderBlockData>({
    title: "",
    subtitle: "",
    fileName: "",
    preview: undefined,
    mediaId: undefined,
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  const [package1CmsBlockId, setPackage1CmsBlockId] = useState<number | null>(
    null,
  );
  const [package2CmsBlockId, setPackage2CmsBlockId] = useState<number | null>(
    null,
  );

  const [package1, setPackage1] = useState<ServicePackageCardData>(
    mapServicePackageBlockToAdmin(undefined),
  );
  const [package2, setPackage2] = useState<ServicePackageCardData>(
    mapServicePackageBlockToAdmin(undefined),
  );

  const [isSavingPackage1, setIsSavingPackage1] = useState(false);
  const [isSavingPackage2, setIsSavingPackage2] = useState(false);

  const [otherServicesCmsBlockId, setOtherServicesCmsBlockId] = useState<
    number | null
  >(null);
  const [otherServices, setOtherServices] = useState<OtherServicesBlockData>(
    mapOtherServicesBlockToAdmin(undefined),
  );
  const [isSavingOtherServices, setIsSavingOtherServices] = useState(false);

  const [qnaCmsBlockId, setQnaCmsBlockId] = useState<number | null>(null);
  const [qna, setQna] = useState<QnaBlockData>(mapQnaBlockToAdmin(undefined));
  const [isSavingQna, setIsSavingQna] = useState(false);

  const [requestsCmsBlockId, setRequestsCmsBlockId] = useState<number | null>(
    null,
  );
  const [requests, setRequests] = useState<RequestsBlockData>(
    hydrateRequestsPackToAdmin(undefined),
  );
  const [isSavingRequests, setIsSavingRequests] = useState(false);

  const lastDraftRef = useRef<CmsStaticPage | null>(null);

  const reloadFromServer = useCallback(async () => {
    if (!token) return;
    try {
      const draft = await loadServicePackagesDraft({ apiBase: API_BASE, token });
      lastDraftRef.current = draft;
      setPageId(draft.id);

      const headerSource = draft.blocks.find(
        (b) => b.block_type === HEADER_BLOCK_TYPE,
      );
      setHeaderCmsBlockId(headerSource?.id ?? null);
      setHeaderBlock(hydrateHeaderBlock(headerSource));

      const p1 = draft.blocks.find((b) => b.block_type === PACKAGE_1_BLOCK_TYPE);
      setPackage1CmsBlockId(p1?.id ?? null);
      setPackage1(mapServicePackageBlockToAdmin(p1));

      const p2 = draft.blocks.find((b) => b.block_type === PACKAGE_2_BLOCK_TYPE);
      setPackage2CmsBlockId(p2?.id ?? null);
      setPackage2(mapServicePackageBlockToAdmin(p2));

      const other = draft.blocks.find(
        (b) => b.block_type === OTHER_SERVICES_BLOCK_TYPE,
      );
      setOtherServicesCmsBlockId(other?.id ?? null);
      setOtherServices(mapOtherServicesBlockToAdmin(other));

      const qnaBlock = draft.blocks.find((b) => b.block_type === QNA_BLOCK_TYPE);
      setQnaCmsBlockId(qnaBlock?.id ?? null);
      setQna(mapQnaBlockToAdmin(qnaBlock));

      const reqBlock = draft.blocks.find(
        (b) => b.block_type === REQUESTS_BLOCK_TYPE,
      );
      setRequestsCmsBlockId(reqBlock?.id ?? null);
      setRequests(hydrateRequestsPackToAdmin(reqBlock));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load service_packages",
      );
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
        await reloadFromServer();
      } finally {
        setIsLoading(false);
      }
    }

    void loadDraft();
  }, [token, reloadFromServer]);

  const headerPatch = useMemo(() => {
    return {
      title: headerBlock.title,
      subtitle: headerBlock.subtitle,
    } as Record<string, unknown>;
  }, [headerBlock.title, headerBlock.subtitle]);

  const handleHeaderBlur = useCallback(async () => {
    await patchBlock({
      apiBase: API_BASE,
      blockId: headerCmsBlockId,
      token,
      patch: headerPatch,
      setSaving: setIsSavingHeader,
      setError,
      errorMessage: "Failed to save header block",
    });
    await reloadFromServer();
  }, [headerCmsBlockId, headerPatch, reloadFromServer, token]);

  const handleHeaderMediaUpload = useCallback(
    async (file: File) => {
      if (!token || !headerCmsBlockId) return;

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: headerCmsBlockId,
      });

      setHeaderBlock((prev) => ({
        ...prev,
        mediaId: uploadedMedia.id,
        fileName: uploadedMedia.file_name || file.name,
        preview: uploadedMedia.large_url || uploadedMedia.file_url,
      }));

      const ok = await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: headerCmsBlockId,
        token,
        patches: buildMediaPatches([uploadedMedia.id]),
        setSaving: setIsSavingHeader,
        setError,
        errorMessage: "Failed to save header media",
      });

      if (ok) {
        await reloadFromServer();
      }
    },
    [headerCmsBlockId, reloadFromServer, token],
  );

  const handleHeaderMediaRemove = useCallback(async () => {
    setHeaderBlock((prev) => ({
      ...prev,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    }));

    const ok = await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: headerCmsBlockId,
      token,
      patches: buildMediaPatches([]),
      setSaving: setIsSavingHeader,
      setError,
      errorMessage: "Failed to remove header media",
    });

    if (ok) {
      await reloadFromServer();
    }
  }, [headerCmsBlockId, reloadFromServer, token]);

  const handlePackage1Blur = useCallback(async () => {
    const patch = ensureContentHasId(
      mapServicePackageAdminToPatch(package1),
      package1CmsBlockId,
    );
    await patchBlock({
      apiBase: API_BASE,
      blockId: package1CmsBlockId,
      token,
      patch,
      setSaving: setIsSavingPackage1,
      setError,
      errorMessage: "Failed to save package 1 block",
    });
    await reloadFromServer();
  }, [package1, package1CmsBlockId, reloadFromServer, token]);

  const handlePackage2Blur = useCallback(async () => {
    const patch = ensureContentHasId(
      mapServicePackageAdminToPatch(package2),
      package2CmsBlockId,
    );
    await patchBlock({
      apiBase: API_BASE,
      blockId: package2CmsBlockId,
      token,
      patch,
      setSaving: setIsSavingPackage2,
      setError,
      errorMessage: "Failed to save package 2 block",
    });
    await reloadFromServer();
  }, [package2, package2CmsBlockId, reloadFromServer, token]);

  async function uploadForBlock(blockId: number, file: File) {
    if (!token) return null;
    return uploadMedia({
      apiBase: API_BASE,
      token,
      file,
      ownerType: "page_block",
      ownerId: blockId,
    });
  }

  const handlePackage1LeftImageUpload = useCallback(
    async (file: File) => {
      if (!package1CmsBlockId) return;
      const uploaded = await uploadForBlock(package1CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package1,
        imageLeftMediaId: uploaded.id,
        imageLeftFileName: uploaded.file_name || file.name,
        imageLeftPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage1(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package1CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: uploaded.id,
          rightId: next.imageRightMediaId,
          docId: next.popupDocumentMediaId,
        }),
        setSaving: setIsSavingPackage1,
        setError,
        errorMessage: "Failed to save package 1 media",
      });
      await reloadFromServer();
    },
    [package1, package1CmsBlockId, reloadFromServer, token],
  );

  const handlePackage1LeftImageRemove = useCallback(async () => {
    if (!package1CmsBlockId) return;
    const next = {
      ...package1,
      imageLeftMediaId: undefined,
      imageLeftFileName: "",
      imageLeftPreview: undefined,
    };
    setPackage1(next);
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package1CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: undefined,
        rightId: next.imageRightMediaId,
        docId: next.popupDocumentMediaId,
      }),
      setSaving: setIsSavingPackage1,
      setError,
      errorMessage: "Failed to remove package 1 left image",
    });
    await reloadFromServer();
  }, [package1, package1CmsBlockId, reloadFromServer, token]);

  const handlePackage1RightImageUpload = useCallback(
    async (file: File) => {
      if (!package1CmsBlockId) return;
      const uploaded = await uploadForBlock(package1CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package1,
        imageRightMediaId: uploaded.id,
        imageRightFileName: uploaded.file_name || file.name,
        imageRightPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage1(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package1CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: next.imageLeftMediaId,
          rightId: uploaded.id,
          docId: next.popupDocumentMediaId,
        }),
        setSaving: setIsSavingPackage1,
        setError,
        errorMessage: "Failed to save package 1 media",
      });
      await reloadFromServer();
    },
    [package1, package1CmsBlockId, reloadFromServer, token],
  );

  const handlePackage1RightImageRemove = useCallback(async () => {
    if (!package1CmsBlockId) return;
    const next = {
      ...package1,
      imageRightMediaId: undefined,
      imageRightFileName: "",
      imageRightPreview: undefined,
    };
    setPackage1(next);
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package1CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: next.imageLeftMediaId,
        rightId: undefined,
        docId: next.popupDocumentMediaId,
      }),
      setSaving: setIsSavingPackage1,
      setError,
      errorMessage: "Failed to remove package 1 right image",
    });
    await reloadFromServer();
  }, [package1, package1CmsBlockId, reloadFromServer, token]);

  const handlePackage1PopupDocUpload = useCallback(
    async (file: File) => {
      if (!package1CmsBlockId) return;
      const uploaded = await uploadForBlock(package1CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package1,
        popupDocumentMediaId: uploaded.id,
        popupDocumentFileName: uploaded.file_name || file.name,
        popupDocumentPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage1(next);

      await patchBlock({
        apiBase: API_BASE,
        blockId: package1CmsBlockId,
        token,
        patch: ensureContentHasId(
          mapServicePackageAdminToPatch(next),
          package1CmsBlockId,
        ),
        setSaving: setIsSavingPackage1,
        setError,
        errorMessage: "Failed to save package 1 popup doc",
      });
      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package1CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: next.imageLeftMediaId,
          rightId: next.imageRightMediaId,
          docId: uploaded.id,
        }),
        setSaving: setIsSavingPackage1,
        setError,
        errorMessage: "Failed to save package 1 media",
      });
      await reloadFromServer();
    },
    [package1, package1CmsBlockId, reloadFromServer, token],
  );

  const handlePackage1PopupDocRemove = useCallback(async () => {
    if (!package1CmsBlockId) return;
    const next = {
      ...package1,
      popupDocumentMediaId: undefined,
      popupDocumentFileName: "",
      popupDocumentPreview: undefined,
    };
    setPackage1(next);

    await patchBlock({
      apiBase: API_BASE,
      blockId: package1CmsBlockId,
      token,
      patch: ensureContentHasId(
        mapServicePackageAdminToPatch(next),
        package1CmsBlockId,
      ),
      setSaving: setIsSavingPackage1,
      setError,
      errorMessage: "Failed to save package 1 popup doc",
    });
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package1CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: next.imageLeftMediaId,
        rightId: next.imageRightMediaId,
        docId: undefined,
      }),
      setSaving: setIsSavingPackage1,
      setError,
      errorMessage: "Failed to save package 1 media",
    });
    await reloadFromServer();
  }, [package1, package1CmsBlockId, reloadFromServer, token]);

  // package 2 media handlers (same pattern)
  const handlePackage2LeftImageUpload = useCallback(
    async (file: File) => {
      if (!package2CmsBlockId) return;
      const uploaded = await uploadForBlock(package2CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package2,
        imageLeftMediaId: uploaded.id,
        imageLeftFileName: uploaded.file_name || file.name,
        imageLeftPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage2(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package2CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: uploaded.id,
          rightId: next.imageRightMediaId,
          docId: next.popupDocumentMediaId,
        }),
        setSaving: setIsSavingPackage2,
        setError,
        errorMessage: "Failed to save package 2 media",
      });
      await reloadFromServer();
    },
    [package2, package2CmsBlockId, reloadFromServer, token],
  );

  const handlePackage2LeftImageRemove = useCallback(async () => {
    if (!package2CmsBlockId) return;
    const next = {
      ...package2,
      imageLeftMediaId: undefined,
      imageLeftFileName: "",
      imageLeftPreview: undefined,
    };
    setPackage2(next);
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package2CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: undefined,
        rightId: next.imageRightMediaId,
        docId: next.popupDocumentMediaId,
      }),
      setSaving: setIsSavingPackage2,
      setError,
      errorMessage: "Failed to remove package 2 left image",
    });
    await reloadFromServer();
  }, [package2, package2CmsBlockId, reloadFromServer, token]);

  const handlePackage2RightImageUpload = useCallback(
    async (file: File) => {
      if (!package2CmsBlockId) return;
      const uploaded = await uploadForBlock(package2CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package2,
        imageRightMediaId: uploaded.id,
        imageRightFileName: uploaded.file_name || file.name,
        imageRightPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage2(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package2CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: next.imageLeftMediaId,
          rightId: uploaded.id,
          docId: next.popupDocumentMediaId,
        }),
        setSaving: setIsSavingPackage2,
        setError,
        errorMessage: "Failed to save package 2 media",
      });
      await reloadFromServer();
    },
    [package2, package2CmsBlockId, reloadFromServer, token],
  );

  const handlePackage2RightImageRemove = useCallback(async () => {
    if (!package2CmsBlockId) return;
    const next = {
      ...package2,
      imageRightMediaId: undefined,
      imageRightFileName: "",
      imageRightPreview: undefined,
    };
    setPackage2(next);
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package2CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: next.imageLeftMediaId,
        rightId: undefined,
        docId: next.popupDocumentMediaId,
      }),
      setSaving: setIsSavingPackage2,
      setError,
      errorMessage: "Failed to remove package 2 right image",
    });
    await reloadFromServer();
  }, [package2, package2CmsBlockId, reloadFromServer, token]);

  const handlePackage2PopupDocUpload = useCallback(
    async (file: File) => {
      if (!package2CmsBlockId) return;
      const uploaded = await uploadForBlock(package2CmsBlockId, file);
      if (!uploaded) return;

      const next = {
        ...package2,
        popupDocumentMediaId: uploaded.id,
        popupDocumentFileName: uploaded.file_name || file.name,
        popupDocumentPreview: uploaded.large_url || uploaded.file_url,
      };
      setPackage2(next);

      await patchBlock({
        apiBase: API_BASE,
        blockId: package2CmsBlockId,
        token,
        patch: ensureContentHasId(
          mapServicePackageAdminToPatch(next),
          package2CmsBlockId,
        ),
        setSaving: setIsSavingPackage2,
        setError,
        errorMessage: "Failed to save package 2 popup doc",
      });
      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: package2CmsBlockId,
        token,
        patches: buildOrderedMediaPatches({
          leftId: next.imageLeftMediaId,
          rightId: next.imageRightMediaId,
          docId: uploaded.id,
        }),
        setSaving: setIsSavingPackage2,
        setError,
        errorMessage: "Failed to save package 2 media",
      });
      await reloadFromServer();
    },
    [package2, package2CmsBlockId, reloadFromServer, token],
  );

  const handlePackage2PopupDocRemove = useCallback(async () => {
    if (!package2CmsBlockId) return;
    const next = {
      ...package2,
      popupDocumentMediaId: undefined,
      popupDocumentFileName: "",
      popupDocumentPreview: undefined,
    };
    setPackage2(next);

    await patchBlock({
      apiBase: API_BASE,
      blockId: package2CmsBlockId,
      token,
      patch: ensureContentHasId(
        mapServicePackageAdminToPatch(next),
        package2CmsBlockId,
      ),
      setSaving: setIsSavingPackage2,
      setError,
      errorMessage: "Failed to save package 2 popup doc",
    });
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: package2CmsBlockId,
      token,
      patches: buildOrderedMediaPatches({
        leftId: next.imageLeftMediaId,
        rightId: next.imageRightMediaId,
        docId: undefined,
      }),
      setSaving: setIsSavingPackage2,
      setError,
      errorMessage: "Failed to save package 2 media",
    });
    await reloadFromServer();
  }, [package2, package2CmsBlockId, reloadFromServer, token]);

  const handleOtherServicesBlur = useCallback(async () => {
    const patch = mapOtherServicesAdminToPatch(otherServices);
    await patchBlock({
      apiBase: API_BASE,
      blockId: otherServicesCmsBlockId,
      token,
      patch,
      setSaving: setIsSavingOtherServices,
      setError,
      errorMessage: "Failed to save other services block",
    });
    await reloadFromServer();
  }, [otherServices, otherServicesCmsBlockId, reloadFromServer, token]);

  const handleOtherServicesMediaUpload = useCallback(
    async (file: File) => {
      if (!token || !otherServicesCmsBlockId) return;

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: otherServicesCmsBlockId,
      });

      const next = {
        ...otherServices,
        mediaId: uploadedMedia.id,
        fileName: uploadedMedia.file_name || file.name,
        preview: uploadedMedia.large_url || uploadedMedia.file_url,
      };
      setOtherServices(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: otherServicesCmsBlockId,
        token,
        patches: [
          ...buildMediaPatches([uploadedMedia.id]),
          { media: [{ id: uploadedMedia.id, position: 0 }] },
        ],
        setSaving: setIsSavingOtherServices,
        setError,
        errorMessage: "Failed to save other services media",
      });
      await reloadFromServer();
    },
    [otherServices, otherServicesCmsBlockId, reloadFromServer, token],
  );

  const handleOtherServicesMediaRemove = useCallback(async () => {
    const next = {
      ...otherServices,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    };
    setOtherServices(next);

    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: otherServicesCmsBlockId,
      token,
      patches: [...buildMediaPatches([]), { media: [] }],
      setSaving: setIsSavingOtherServices,
      setError,
      errorMessage: "Failed to remove other services media",
    });
    await reloadFromServer();
  }, [otherServices, otherServicesCmsBlockId, reloadFromServer, token]);

  const handleQnaBlur = useCallback(async () => {
    const patch = mapQnaAdminToPatch(qna);
    await patchBlock({
      apiBase: API_BASE,
      blockId: qnaCmsBlockId,
      token,
      patch,
      setSaving: setIsSavingQna,
      setError,
      errorMessage: "Failed to save qna block",
    });
    await reloadFromServer();
  }, [qna, qnaCmsBlockId, reloadFromServer, token]);

  const handleRequestsBlur = useCallback(async () => {
    const patches = buildRequestsPackPatches(requests);
    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: requestsCmsBlockId,
      token,
      patches,
      setSaving: setIsSavingRequests,
      setError,
      errorMessage: "Failed to save requests block",
    });
    await reloadFromServer();
  }, [requests, requestsCmsBlockId, reloadFromServer, token]);

  const handleRequestsMediaUpload = useCallback(
    async (file: File) => {
      if (!token || !requestsCmsBlockId) return;

      const uploadedMedia = await uploadMedia({
        apiBase: API_BASE,
        token,
        file,
        ownerType: "page_block",
        ownerId: requestsCmsBlockId,
      });

      const next: RequestsBlockData = {
        ...requests,
        mediaId: uploadedMedia.id,
        fileName: uploadedMedia.file_name || file.name,
        preview: uploadedMedia.large_url || uploadedMedia.file_url,
      };
      setRequests(next);

      await patchBlockWithFallback({
        apiBase: API_BASE,
        blockId: requestsCmsBlockId,
        token,
        patches: buildRequestsPackPatches(next),
        setSaving: setIsSavingRequests,
        setError,
        errorMessage: "Failed to save requests media",
      });
      await reloadFromServer();
    },
    [requests, requestsCmsBlockId, reloadFromServer, token],
  );

  const handleRequestsMediaRemove = useCallback(async () => {
    const next: RequestsBlockData = {
      ...requests,
      mediaId: undefined,
      fileName: "",
      preview: undefined,
    };
    setRequests(next);

    await patchBlockWithFallback({
      apiBase: API_BASE,
      blockId: requestsCmsBlockId,
      token,
      patches: buildRequestsPackPatches(next),
      setSaving: setIsSavingRequests,
      setError,
      errorMessage: "Failed to remove requests media",
    });
    await reloadFromServer();
  }, [requests, requestsCmsBlockId, reloadFromServer, token]);

  async function handlePublish() {
    if (!token || !pageId) return;

    try {
      setIsPublishing(true);
      setPublishMessage(null);
      setError(null);

      const response = await fetch(`${API_BASE}/static-pages/${pageId}/publish`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to publish service_packages: ${response.status}`);
      }

      setPublishMessage("service_packages опубликована");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish service_packages",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return {
    token,
    isLoading,
    error,
    publishMessage,
    isPublishing,
    handlePublish,

    headerBlock,
    setHeaderBlock,
    isSavingHeader,
    handleHeaderBlur,
    handleHeaderMediaUpload,
    handleHeaderMediaRemove,

    package1,
    setPackage1,
    package2,
    setPackage2,
    isSavingPackage1,
    isSavingPackage2,
    handlePackage1Blur,
    handlePackage2Blur,

    handlePackage1LeftImageUpload,
    handlePackage1LeftImageRemove,
    handlePackage1RightImageUpload,
    handlePackage1RightImageRemove,
    handlePackage1PopupDocUpload,
    handlePackage1PopupDocRemove,

    handlePackage2LeftImageUpload,
    handlePackage2LeftImageRemove,
    handlePackage2RightImageUpload,
    handlePackage2RightImageRemove,
    handlePackage2PopupDocUpload,
    handlePackage2PopupDocRemove,

    otherServices,
    setOtherServices,
    isSavingOtherServices,
    handleOtherServicesBlur,
    handleOtherServicesMediaUpload,
    handleOtherServicesMediaRemove,

    qna,
    setQna,
    isSavingQna,
    handleQnaBlur,

    requests,
    setRequests,
    isSavingRequests,
    handleRequestsBlur,
    handleRequestsMediaUpload,
    handleRequestsMediaRemove,
  };
}

