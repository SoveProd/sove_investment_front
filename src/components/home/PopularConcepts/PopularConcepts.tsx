import PopularConceptsClient, {
  type ConceptsTab,
  type ConceptCard,
} from "./PopularConceptsClient";
import { Container } from "@/src/components/layout/Container";
import type { CmsBlock } from "@/lib/cms/types";

type CaseStudyEntity = {
  id: number | string;
  title: string;
  hero_media_id?: number | null;
  timeline?: string | null;
  roi_coeff?: number | null;
  budget?: number | null;
  city?: string | null;
  apartment_name?: string | null;
  square?: number | null;
  is_published?: boolean;
};

const fallbackPopularConcepts: ConceptCard[] = [
  {
    id: "modern-loft-1",
    title: "MODERN LOFT",
    subtitle: "Ориентировочный бюджет за м2 ~ 100 000",
    availabilityLabel: "Доступно 7/10 слотов",
    totalSlots: 10,
    availableSlots: 7,
    image: {
      src: "/images/hero.jpg",
      alt: "Modern loft interior concept",
    },
  },
];

const fallbackReadyProjects: ConceptCard[] = [
  {
    id: "ready-1",
    title: "READY PROJECT",
    subtitle: "Готовый проект — адаптация под ваш объект",
    availabilityLabel: "Доступно 3/10 слотов",
    totalSlots: 10,
    availableSlots: 3,
    image: {
      src: "/images/pathimg.jpg",
      alt: "Ready project concept preview",
    },
  },
];

type Props = {
  popularBlock?: CmsBlock;
  readyBlock?: CmsBlock;
  popularItems?: CaseStudyEntity[];
  readyItems?: CaseStudyEntity[];
};

function getSelectedIds(block?: CmsBlock): number[] {
  if (
    block?.content &&
    typeof block.content === "object" &&
    "ids" in block.content &&
    Array.isArray((block.content as { ids?: number[] }).ids)
  ) {
    return (block.content as { ids: number[] }).ids;
  }

  return [];
}

function getCaseStudyImageSrc(item: CaseStudyEntity, fallback: string) {
  if (item.hero_media_id) {
    return `/api/media/public/${item.hero_media_id}`;
  }

  return fallback;
}

function mapCaseStudyToConceptCard(
  item: CaseStudyEntity,
  fallbackImage: string,
  slots?: { total: number; available: number },
): ConceptCard {
  const budgetPerM2 =
    item.budget && item.square && item.square > 0
      ? Math.round(item.budget / item.square)
      : null;

  const totalSlots = slots?.total ?? 10;
  const availableSlots = slots?.available ?? 7;

  return {
    id: String(item.id),
    title: item.title || "Untitled case",
    subtitle: budgetPerM2
      ? `Ориентировочный бюджет за м2 ~ ${budgetPerM2.toLocaleString("ru-RU")}`
      : item.budget
        ? `Общий бюджет ~ ${item.budget.toLocaleString("ru-RU")}`
        : "Бюджет уточняется",
    availabilityLabel: `Доступно ${availableSlots}/${totalSlots} слотов`,
    totalSlots,
    availableSlots,
    image: {
      src: getCaseStudyImageSrc(item, fallbackImage),
      alt: item.title || "Case study preview",
    },
  };
}

export default function PopularConcepts({
  popularBlock,
  readyBlock,
  popularItems = [],
  readyItems = [],
}: Props) {
  const popularIds = getSelectedIds(popularBlock);
  const readyIds = getSelectedIds(readyBlock);

  const mappedPopularItems = popularItems
    .filter((item) => popularIds.includes(Number(item.id)))
    .slice(0, 2)
    .map((item) =>
      mapCaseStudyToConceptCard(item, "/images/hero.jpg", {
        total: 10,
        available: 7,
      }),
    );

  const mappedReadyItems = readyItems
    .filter((item) => readyIds.includes(Number(item.id)))
    .slice(0, 2)
    .map((item) =>
      mapCaseStudyToConceptCard(item, "/images/pathimg.jpg", {
        total: 10,
        available: 3,
      }),
    );

  // If selected IDs don't exist in the published list, fall back to real published items
  // (better than showing hardcoded placeholders).
  const fallbackPopularFromPublished =
    popularItems.length > 0
      ? popularItems.slice(0, 2).map((item) =>
          mapCaseStudyToConceptCard(item, "/images/hero.jpg", {
            total: 10,
            available: 7,
          }),
        )
      : [];

  const fallbackReadyFromPublished =
    readyItems.length > 0
      ? readyItems.slice(0, 2).map((item) =>
          mapCaseStudyToConceptCard(item, "/images/pathimg.jpg", {
            total: 10,
            available: 3,
          }),
        )
      : [];

  const tabs: ConceptsTab[] = [
    {
      key: "popular",
      label: popularBlock?.title || "Популярные концепции",
      description:
        popularBlock?.subtitle ||
        "Подборка решений для инвестиционной недвижимости",
      items:
        mappedPopularItems.length > 0
          ? mappedPopularItems
          : fallbackPopularFromPublished.length > 0
            ? fallbackPopularFromPublished
            : fallbackPopularConcepts,
    },
    {
      key: "ready",
      label: readyBlock?.title || "Готовые проекты",
      description: readyBlock?.subtitle || "Реальные проекты и их результат",
      items:
        mappedReadyItems.length > 0
          ? mappedReadyItems
          : fallbackReadyFromPublished.length > 0
            ? fallbackReadyFromPublished
            : fallbackReadyProjects,
    },
  ];

  return (
    <section className="w-full bg-bg">
      <Container>
        <div className="px-4 py-20 sm:py-20">
          <PopularConceptsClient tabs={tabs} />
        </div>
      </Container>
    </section>
  );
}
