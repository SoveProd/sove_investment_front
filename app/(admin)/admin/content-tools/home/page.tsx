"use client";

import { useEffect, useState } from "react";
import { HeroBlockEditor } from "@/components/admin/content-tools/home/HeroBlockEditor";
import { MetricsBlockEditor } from "@/components/admin/content-tools/home/MetricsBlockEditor";
import { MakeWithSoveBlockEditor } from "@/components/admin/content-tools/home/MakeWithSoveBlockEditor";
import { DoItYourselfBlockEditor } from "@/components/admin/content-tools/home/DoItYourselfBlockEditor";
import { PopularConceptsBlockEditor } from "@/components/admin/content-tools/home/PopularConceptsBlockEditor";
import { ReadyProjectsBlockEditor } from "@/components/admin/content-tools/home/ReadyProjectsBlockEditor";
import { WeTakeCareBlockEditor } from "@/components/admin/content-tools/home/WeTakeCareBlockEditor";

import type {
  HeroBlockData,
  MetricsBlockData,
  RepeatableFeatureBlockData,
  CheckboxOptionsBlockData,
  MediaListBlockData,
} from "@/app/(admin)/admin/content-tools/home/types";

import type {
  CmsBlock,
  CmsStaticPage,
  CmsHeroBlock,
  CmsMetricsBlock,
} from "@/lib/cms/types";

import {
  mapHeroBlockToAdmin,
  mapHeroAdminToPatch,
  mapMetricsBlockToAdmin,
  mapMetricsAdminToPatch,
  mapDoItWithSoveBlockToAdmin,
  mapDoItWithSoveAdminToPatch,
  mapDiyBlockToAdmin,
  mapDiyAdminToPatch,
} from "@/lib/cms/homepageAdapters";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://sovegroup.sytes.net/api/v1";

const initialHeroBlock: HeroBlockData = {
  title: "",
  description: "",
  videoName: "Видео.mp4",
  videoPreview: undefined,
};

const initialMetricsBlock: MetricsBlockData = {
  items: [
    {
      id: 1,
      label: "Карточка 1",
      title: "Реализованных проектов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 2,
      label: "Карточка 2",
      title: "Активных клиентов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 3,
      label: "Карточка 3",
      title: "Среднее время",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 4,
      label: "Карточка 4",
      title: "Средний ROI",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
  ],
};

const initialMakeWithSoveBlock: RepeatableFeatureBlockData = {
  title: "",
  description: "",
  buttonLabel: "Попробовать",
  items: [
    {
      id: 1,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Стратегия флип",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Концептуальный ремонт",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Стратегия аренда",
    },
    {
      id: 4,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Подбор объекта",
    },
  ],
};

const initialDoItYourselfBlock: RepeatableFeatureBlockData = {
  title: "",
  description: "",
  buttonLabel: "Начать",
  items: [
    {
      id: 1,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Сценарий 1",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Сценарий 2",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: undefined,
      text: "Сценарий 3",
    },
  ],
};

const initialPopularConceptsBlock: CheckboxOptionsBlockData = {
  items: [
    { id: 1, label: "Modern Loft 1", checked: true },
    { id: 2, label: "Modern Loft 2", checked: true },
    { id: 3, label: "Modern Loft 3", checked: false },
    { id: 4, label: "Modern Loft 4", checked: false },
  ],
};

const initialReadyProjectsBlock: CheckboxOptionsBlockData = {
  items: [
    { id: 1, label: "Modern Loft 1", checked: true },
    { id: 2, label: "Modern Loft 2", checked: true },
    { id: 3, label: "Modern Loft 3", checked: true },
    { id: 4, label: "Modern Loft 4", checked: false },
  ],
};

const initialWeTakeCareBlock: MediaListBlockData = {
  title: "",
  description: "",
  items: [
    {
      id: 1,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
  ],
};

function findBlockByType<T extends CmsBlock>(
  blocks: CmsBlock[],
  blockType: string,
): T | undefined {
  return blocks.find((block) => block.block_type === blockType) as
    | T
    | undefined;
}

export default function ContentToolsHomePage() {
  const [heroBlock, setHeroBlock] = useState<HeroBlockData>(initialHeroBlock);
  const [metricsBlock, setMetricsBlock] =
    useState<MetricsBlockData>(initialMetricsBlock);
  const [makeWithSoveBlock, setMakeWithSoveBlock] =
    useState<RepeatableFeatureBlockData>(initialMakeWithSoveBlock);
  const [doItYourselfBlock, setDoItYourselfBlock] =
    useState<RepeatableFeatureBlockData>(initialDoItYourselfBlock);

  const [popularConceptsBlock, setPopularConceptsBlock] =
    useState<CheckboxOptionsBlockData>(initialPopularConceptsBlock);
  const [readyProjectsBlock, setReadyProjectsBlock] =
    useState<CheckboxOptionsBlockData>(initialReadyProjectsBlock);
  const [weTakeCareBlock, setWeTakeCareBlock] = useState<MediaListBlockData>(
    initialWeTakeCareBlock,
  );

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

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isSavingMetrics, setIsSavingMetrics] = useState(false);
  const [isSavingMakeWithSove, setIsSavingMakeWithSove] = useState(false);
  const [isSavingDoItYourself, setIsSavingDoItYourself] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function loadHomepageDraft() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE}/admin/static-pages?page_type=homepage`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to load homepage: ${response.status}`);
        }

        const pages: CmsStaticPage[] = await response.json();

        if (!pages.length) {
          throw new Error("Homepage draft not found");
        }

        const homepageDraft = pages.find((page) => page.id === 1) || pages[0];

        const heroCmsBlock = findBlockByType<CmsHeroBlock>(
          homepageDraft.blocks,
          "ceiling:main",
        );

        const metricsCmsBlock = findBlockByType<CmsMetricsBlock>(
          homepageDraft.blocks,
          "metrics:main",
        );

        const makeWithSoveCmsBlock = findBlockByType<CmsBlock>(
          homepageDraft.blocks,
          "do_it_with_sove:main",
        );

        const doItYourselfCmsBlock = findBlockByType<CmsBlock>(
          homepageDraft.blocks,
          "diy:main",
        );

        if (heroCmsBlock) {
          setHeroCmsBlockId(heroCmsBlock.id);

          setHeroBlock((prev) => {
            const mapped = mapHeroBlockToAdmin(heroCmsBlock);

            return {
              ...prev,
              title: mapped.title || prev.title,
              description: mapped.description || prev.description,
              videoName: mapped.videoName || prev.videoName,
              videoPreview: mapped.videoPreview || prev.videoPreview,
            };
          });
        }

        if (metricsCmsBlock) {
          setMetricsCmsBlockId(metricsCmsBlock.id);

          setMetricsBlock((prev) => {
            const mapped = mapMetricsBlockToAdmin(metricsCmsBlock);

            return {
              items: prev.items.map((item, index) => {
                const cmsItem = mapped.items[index];

                if (!cmsItem) return item;

                return {
                  ...item,
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    loadHomepageDraft();
  }, [token]);

  async function saveHeroField(
    patch: Partial<ReturnType<typeof mapHeroAdminToPatch>>,
  ) {
    if (!heroCmsBlockId || !token) return;

    try {
      setIsSavingHero(true);
      setError(null);

      const response = await fetch(`${API_BASE}/blocks/${heroCmsBlockId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patch),
      });

      if (!response.ok) {
        throw new Error(`Failed to save hero field: ${response.status}`);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save hero field",
      );
    } finally {
      setIsSavingHero(false);
    }
  }

  async function handleHeroTitleBlur() {
    await saveHeroField({
      title: heroBlock.title,
    });
  }

  async function handleHeroDescriptionBlur() {
    await saveHeroField({
      text: heroBlock.description,
    });
  }

  async function handleMetricsBlur() {
    if (!metricsCmsBlockId || !token) return;

    try {
      setIsSavingMetrics(true);
      setError(null);

      const response = await fetch(`${API_BASE}/blocks/${metricsCmsBlockId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mapMetricsAdminToPatch(metricsBlock)),
      });

      if (!response.ok) {
        throw new Error(`Failed to save metrics block: ${response.status}`);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save metrics block",
      );
    } finally {
      setIsSavingMetrics(false);
    }
  }

  async function saveMakeWithSoveField(
    patch: Partial<ReturnType<typeof mapDoItWithSoveAdminToPatch>>,
  ) {
    if (!makeWithSoveCmsBlockId || !token) return;

    try {
      setIsSavingMakeWithSove(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/blocks/${makeWithSoveCmsBlockId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patch),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save do_it_with_sove block: ${response.status}`,
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save do_it_with_sove block",
      );
    } finally {
      setIsSavingMakeWithSove(false);
    }
  }

  async function handleMakeWithSoveTitleBlur() {
    await saveMakeWithSoveField({
      title: makeWithSoveBlock.title,
    });
  }

  async function handleMakeWithSoveDescriptionBlur() {
    await saveMakeWithSoveField({
      text: makeWithSoveBlock.description,
    });
  }

  async function handleMakeWithSoveButtonBlur() {
    await saveMakeWithSoveField({
      button: {
        name: makeWithSoveBlock.buttonLabel,
        position: 0,
      },
    });
  }

  async function saveDoItYourselfField(
    patch: Partial<ReturnType<typeof mapDiyAdminToPatch>>,
  ) {
    if (!doItYourselfCmsBlockId || !token) return;

    try {
      setIsSavingDoItYourself(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/blocks/${doItYourselfCmsBlockId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patch),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to save diy block: ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save diy block");
    } finally {
      setIsSavingDoItYourself(false);
    }
  }

  async function handleDiyTitleBlur() {
    await saveDoItYourselfField({
      title: doItYourselfBlock.title,
    });
  }

  async function handleDiyDescriptionBlur() {
    await saveDoItYourselfField({
      text: doItYourselfBlock.description,
    });
  }

  async function handleDiyButtonBlur() {
    await saveDoItYourselfField({
      button: {
        name: doItYourselfBlock.buttonLabel,
        position: 0,
      },
    });
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
      <HeroBlockEditor
        value={heroBlock}
        onChange={setHeroBlock}
        onTitleBlur={handleHeroTitleBlur}
        onDescriptionBlur={handleHeroDescriptionBlur}
        isSaving={isSavingHero}
      />

      <MetricsBlockEditor
        value={metricsBlock}
        onChange={setMetricsBlock}
        onFieldBlur={handleMetricsBlur}
        isSaving={isSavingMetrics}
      />

      <MakeWithSoveBlockEditor
        value={makeWithSoveBlock}
        onChange={setMakeWithSoveBlock}
        onTitleBlur={handleMakeWithSoveTitleBlur}
        onDescriptionBlur={handleMakeWithSoveDescriptionBlur}
        onButtonBlur={handleMakeWithSoveButtonBlur}
        isSaving={isSavingMakeWithSove}
      />

      <DoItYourselfBlockEditor
        value={doItYourselfBlock}
        onChange={setDoItYourselfBlock}
        onTitleBlur={handleDiyTitleBlur}
        onDescriptionBlur={handleDiyDescriptionBlur}
        onButtonBlur={handleDiyButtonBlur}
        isSaving={isSavingDoItYourself}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <PopularConceptsBlockEditor
          value={popularConceptsBlock}
          onChange={setPopularConceptsBlock}
        />

        <ReadyProjectsBlockEditor
          value={readyProjectsBlock}
          onChange={setReadyProjectsBlock}
        />
      </div>

      <WeTakeCareBlockEditor
        value={weTakeCareBlock}
        onChange={setWeTakeCareBlock}
      />
    </section>
  );
}
