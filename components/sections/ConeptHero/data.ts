import type { ConceptHeroData } from "./types";

export const CONCEPTS: ConceptHeroData[] = [
  {
    slug: "modern-loft",
    title: "MODERN LOFT",
    badge: "Дроп1",
    forWho: "Для кого: 30-50 лет, семьи с детьми, ценители комфорта",
    budgetPerM2: "Ориентировочный бюджет за м² - 100 000",
    shortRightText:
      "Минималистичный лофт с высокими потолками,\nоткрытой планировкой и индустриальными элементами.\nИдеален для молодых профессионалов и семей",

    totalSlots: 10,
    availableSlots: 7,

    image: { src: "/images/hero.jpg", alt: "Modern loft interior" },

    ctaLabel: "Забронировать слот",
    ctaHref: "/packages/select",
  },
  {
    slug: "japandi-soft",
    title: "JAPANDI SOFT",
    badge: "Дроп2",
    forWho:
      "Для кого: пары и одиночные резиденты, любители спокойных интерьеров",
    budgetPerM2: "Ориентировочный бюджет за м² - 120 000",
    shortRightText:
      "Тёплый минимализм, натуральные материалы,\nмягкий свет и тактильные фактуры.\nСбалансированная эстетика и ликвидность",

    totalSlots: 10,
    availableSlots: 0,

    image: { src: "/images/statsimg1.jpg", alt: "Japandi interior" },

    ctaLabel: "Забронировать слот",
    ctaHref: "/packages/select",
  },
];
