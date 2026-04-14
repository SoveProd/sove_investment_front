// cms/types.ts

// --- Display (позиции блоков) ---
export type CmsClientDisplay = {
  position: number | null;
  is_visible: boolean;
};

export type CmsDisplay = {
  web: CmsClientDisplay;
  mobile: CmsClientDisplay;
  telegram: CmsClientDisplay;
};

// --- Кнопки ---
export type CmsButton = {
  name: string;
  position: number;
};

// --- Медиа ---
export type CmsMedia = {
  id: number;
  file_url: string;
  url?: string | null;
  thumbnail_url?: string | null;
  medium_url?: string | null;
  large_url?: string | null;
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  position?: number | null;
  caption?: string | null;
  description?: string | null;
};

// --- Блок страницы ---
export type CmsBlock = {
  id: number;
  owner_type: string;
  owner_id: number;
  block_type: string;
  display: CmsDisplay;

  title: string | null;
  subtitle: string | null;
  text: string | null;
  button: CmsButton | CmsButton[] | null;
  note: string | null;

  content: Record<string, unknown> | null;

  media: CmsMedia[];
  referenced_objects: unknown[] | null;

  primary_button_label?: string | null;
  secondary_button_label?: string | null;
};

// --- Страница CMS ---
export type CmsStaticPage = {
  id: number;
  page_type: string;
  status: "draft" | "published" | "archived";

  created_by: number | null;
  created_at: string;
  published_at: string | null;

  blocks: CmsBlock[];
};

// --- Hero ---
export type CmsHeroBlock = CmsBlock & {
  block_type: "ceiling:main";
  primary_button_label?: string | null;
  secondary_button_label?: string | null;
};

// --- Metrics ---
export type CmsMetricItem = {
  label?: string | null;
  value?: string | null;
};

export type CmsMetricsContent = {
  items?: CmsMetricItem[];
};

export type CmsMetricsBlock = CmsBlock & {
  block_type: "metrics:main";
  content: CmsMetricsContent | null;
};

// --- Repeatable feature content ---
export type CmsRepeatableFeatureItem = {
  text?: string | null;
};

export type CmsRepeatableFeatureContent = {
  items?: CmsRepeatableFeatureItem[];
};

// --- Featured selection content ---
export type CmsFeaturedContent = {
  ids?: number[];
};

// --- Media text cards content ---
export type CmsMediaTextCardItem = {
  title?: string | null;
  subtitle?: string | null;
};

export type CmsMediaTextCardsContent = {
  items?: CmsMediaTextCardItem[];
};

// --- Media list content ---
export type CmsMediaListItem = {
  title?: string | null;
  subtitle?: string | null;
  text?: string | null;
};

export type CmsMediaListContent = {
  items?: CmsMediaListItem[];
};

// --- Design mosaic content ---
export type CmsDesignMosaicItem = {
  title?: string | null;
  subtitle?: string | null;
  text?: string | null;
};

export type CmsDesignMosaicContent = {
  items?: CmsDesignMosaicItem[];
};
