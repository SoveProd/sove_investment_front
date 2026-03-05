export type MaterialsTabKey =
  | "materials"
  | "palette"
  | "furniture"
  | "decor"
  | "lighting";

export type MaterialCard = {
  id: string;
  title: string;
  imageSrc: string;
};

export type MaterialsTab = {
  key: MaterialsTabKey;
  label: string;
  description: string;
  cards: MaterialCard[];
};
