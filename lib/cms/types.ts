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
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  position?: number;
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
};

// --- Metrics ---
export type CmsMetricItem = {
  label: string;
  value: string;
};

export type CmsMetricsContent = {
  items: CmsMetricItem[];
};

export type CmsMetricsBlock = CmsBlock & {
  block_type: "metrics:main";
  content: CmsMetricsContent | null;
};
