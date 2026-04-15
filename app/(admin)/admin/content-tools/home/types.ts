export type HeroBlockData = {
  mediaId?: number;
  title: string;
  description: string;
  videoName: string;
  videoPreview?: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
};

export type MetricItem = {
  id: number;
  mediaId?: number;
  label: string;
  title: string;
  value: string;
  fileName: string;
  preview?: string;
};

export type MetricsBlockData = {
  items: MetricItem[];
};

export type RepeatableFeatureItem = {
  id: number;
  mediaId?: number;
  fileName: string;
  preview?: string;
  text: string;
};

export type RepeatableFeatureBlockData = {
  title: string;
  description: string;
  buttonLabel: string;
  items: RepeatableFeatureItem[];
};

export type MediaListItem = {
  id: number;
  fileName: string;
  preview?: string;
};

export type MediaListBlockData = {
  title: string;
  description: string;
  items: MediaListItem[];
};

export type TextButtonBlockData = {
  grayTextTop: string;
  blackTextMain: string;
  grayTextBottom: string;
  buttonLabel: string;
};

export type FeaturedSelectionItem = {
  id: number;
  label: string;
  checked: boolean;
};

export type FeaturedSelectionBlockData = {
  title: string;
  subtitle: string;
  items: FeaturedSelectionItem[];
};

export type MediaTextCardItem = {
  id: number;
  mediaId?: number;
  fileName: string;
  preview?: string;
  title: string;
  subtitle: string;
};

export type MediaTextCardsBlockData = {
  title: string;
  description: string;
  items: MediaTextCardItem[];
};

export type DesignMosaicItem = {
  id: number;
  title: string;
  description: string;
  mediaId?: number;
  fileName: string;
  preview?: string;
};

export type DesignMosaicBlockData = {
  title: string;
  items: DesignMosaicItem[];
};

export type HowItWorksStepItem = {
  id: number;
  stepLabel: string;
  title: string;
  shortDescription: string;
  buttonLabel: string;
  mediaId?: number;
  fileName: string;
  preview?: string;
};

export type HowItWorksBlockData = {
  title: string;
  subtitle: string;
  steps: HowItWorksStepItem[];
};

export type SoveGroupZoneItem = {
  id: number;
  title: string;
  subtitle: string;
};

export type SoveGroupBlockData = {
  zones: SoveGroupZoneItem[];
  mediaId?: number;
  fileName: string;
  preview?: string;
};

export type ReviewItem = {
  id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
  url: string;
};

export type ReviewsBlockData = {
  title: string;
  items: ReviewItem[];
};

export type RequestsBlockData = {
  title: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  mediaId?: number;
  fileName: string;
  preview?: string;
};
