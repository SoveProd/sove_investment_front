export type ConceptHeroData = {
  slug: string;
  title: string;
  badge: string;
  styleLabel?: string;
  forWho: string;
  budgetPerM2: string;
  totalSlots: number;
  availableSlots: number;
  shortRightText: string;
  ctaLabel: string;
  ctaHref: string;
  image: {
    src: string;
    alt: string;
  };
  gallery?: {
    src: string;
    alt: string;
  }[];
};
