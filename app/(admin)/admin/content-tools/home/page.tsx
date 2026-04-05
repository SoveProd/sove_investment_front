"use client";

import { useState } from "react";
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

const initialHeroBlock: HeroBlockData = {
  title: "",
  description: "",
  videoName: "Видео.mp4",
  videoPreview: "/images/admin/video-preview.jpg",
};

const initialMetricsBlock: MetricsBlockData = {
  items: [
    {
      id: 1,
      label: "Карточка 1",
      title: "Реализованных проектов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
    },
    {
      id: 2,
      label: "Карточка 2",
      title: "Активных клиентов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
    },
    {
      id: 3,
      label: "Карточка 3",
      title: "Среднее время",
      value: "150",
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
    },
    {
      id: 4,
      label: "Карточка 4",
      title: "Средний ROI",
      value: "150",
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
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
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
    },
  ],
};

const initialDoItYourselfBlock: RepeatableFeatureBlockData = {
  title: "",
  description: "",
  buttonLabel: "Попробовать",
  items: [
    {
      id: 1,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
      text: "SOVE",
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
      preview: "/images/admin/metric-preview.jpg",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: "/images/admin/metric-preview.jpg",
    },
  ],
};

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

  return (
    <section className="space-y-10">
      <HeroBlockEditor value={heroBlock} onChange={setHeroBlock} />

      <MetricsBlockEditor value={metricsBlock} onChange={setMetricsBlock} />

      <MakeWithSoveBlockEditor
        value={makeWithSoveBlock}
        onChange={setMakeWithSoveBlock}
      />

      <DoItYourselfBlockEditor
        value={doItYourselfBlock}
        onChange={setDoItYourselfBlock}
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
