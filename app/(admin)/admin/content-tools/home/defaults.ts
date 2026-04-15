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

export const initialHeroBlock: HeroBlockData = {
  mediaId: undefined,
  title: "",
  description: "",
  videoName: "Видео.mp4",
  videoPreview: undefined,
  primaryButtonLabel: "",
  secondaryButtonLabel: "",
};

export const initialMetricsBlock: MetricsBlockData = {
  items: [
    {
      id: 1,
      mediaId: undefined,
      label: "Карточка 1",
      title: "Реализованных проектов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 2,
      mediaId: undefined,
      label: "Карточка 2",
      title: "Активных клиентов",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 3,
      mediaId: undefined,
      label: "Карточка 3",
      title: "Среднее время",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 4,
      mediaId: undefined,
      label: "Карточка 4",
      title: "Средний ROI",
      value: "150",
      fileName: "Фото.jpeg",
      preview: undefined,
    },
  ],
};

export const initialMakeWithSoveBlock: RepeatableFeatureBlockData = {
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

export const initialDoItYourselfBlock: RepeatableFeatureBlockData = {
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

export const initialPopularConceptsBlock: FeaturedSelectionBlockData = {
  title: "",
  subtitle: "",
  items: [],
};

export const initialReadyProjectsBlock: FeaturedSelectionBlockData = {
  title: "",
  subtitle: "",
  items: [
    { id: 1, label: "Modern Loft 1", checked: true },
    { id: 2, label: "Modern Loft 2", checked: true },
    { id: 3, label: "Modern Loft 3", checked: true },
    { id: 4, label: "Modern Loft 4", checked: false },
  ],
};

export const initialWeTakeCareBlock: MediaListBlockData = {
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

export const initialCapitalizedTextBlock: TextButtonBlockData = {
  grayTextTop: "",
  blackTextMain: "",
  grayTextBottom: "",
  buttonLabel: "",
};

export const initialManagePropertyBlock: MediaTextCardsBlockData = {
  title: "",
  description: "",
  items: [
    {
      id: 1,
      fileName: "Фото.jpeg",
      preview: undefined,
      title: "",
      subtitle: "",
    },
    {
      id: 2,
      fileName: "Фото.jpeg",
      preview: undefined,
      title: "",
      subtitle: "",
    },
    {
      id: 3,
      fileName: "Фото.jpeg",
      preview: undefined,
      title: "",
      subtitle: "",
    },
  ],
};

export const initialDesignMosaicBlock: DesignMosaicBlockData = {
  title: "",
  items: [
    {
      id: 1,
      title: "",
      description: "",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 2,
      title: "",
      description: "",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 3,
      title: "",
      description: "",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 4,
      title: "",
      description: "",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
  ],
};

export const initialHowItWorksBlock: HowItWorksBlockData = {
  title: "",
  subtitle: "",
  steps: [
    {
      id: 1,
      stepLabel: "Оставить заявку",
      title: "",
      shortDescription: "",
      buttonLabel: "Попробовать",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 2,
      stepLabel: "Оставить заявку",
      title: "",
      shortDescription: "",
      buttonLabel: "Попробовать",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 3,
      stepLabel: "Оставить заявку",
      title: "",
      shortDescription: "",
      buttonLabel: "Попробовать",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
    {
      id: 4,
      stepLabel: "Оставить заявку",
      title: "",
      shortDescription: "",
      buttonLabel: "Попробовать",
      mediaId: undefined,
      fileName: "Фото.jpeg",
      preview: undefined,
    },
  ],
};

export const initialSoveGroupBlock: SoveGroupBlockData = {
  zones: [
    { id: 1, title: "", subtitle: "" },
    { id: 2, title: "", subtitle: "" },
    { id: 3, title: "", subtitle: "" },
  ],
  mediaId: undefined,
  fileName: "Фото.jpeg",
  preview: undefined,
};

export const initialReviewsBlock: ReviewsBlockData = {
  title: "",
  items: [
    { id: 1, author: "", text: "", rating: 5, date: "", url: "" },
    { id: 2, author: "", text: "", rating: 5, date: "", url: "" },
    { id: 3, author: "", text: "", rating: 5, date: "", url: "" },
  ],
};

export const initialRequestsBlock: RequestsBlockData = {
  title: "",
  primaryButtonLabel: "ЗАПОЛНИТЬ ЗАЯВКУ",
  secondaryButtonLabel: "ПРОКОНСУЛЬТИРОВАТЬСЯ",
  mediaId: undefined,
  fileName: "Фото.jpeg",
  preview: undefined,
};
