export type HeroBlockData = {
  title: string;
  description: string;
  videoName: string;
  videoPreview?: string;
};

export type MetricItem = {
  id: number;
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

export type CheckboxOptionItem = {
  id: number;
  label: string;
  checked: boolean;
};

export type CheckboxOptionsBlockData = {
  items: CheckboxOptionItem[];
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