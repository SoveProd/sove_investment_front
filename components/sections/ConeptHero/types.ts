export type ConceptHeroData = {
  slug: string;
  title: string;
  badge: string; 
  forWho: string;
  budgetPerM2: string;
  shortRightText: string;

  totalSlots: number;
  availableSlots: number;

  image: { src: string; alt: string };

  gallery?: { src: string; alt: string }[];

  ctaLabel: string;
  ctaHref: string;
};
