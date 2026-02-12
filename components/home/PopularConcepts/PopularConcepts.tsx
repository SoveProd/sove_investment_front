import PopularConceptsClient, {
  type ConceptsTab,
  type ConceptCard,
} from "./PopularConceptsClient";
import { Container } from "@/components/layout/Container";

const popularConcepts: ConceptCard[] = [
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
  {
    id: "modern-loft-2",
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

const readyProjects: ConceptCard[] = [
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
  {
    id: "ready-2",
    title: "READY PROJECT",
    subtitle: "Готовый проект — адаптация под ваш объект",
    availabilityLabel: "Доступно 2/10 слотов",
    totalSlots: 10,
    availableSlots: 2,
    image: {
      src: "/images/pathimg.jpg",
      alt: "Ready project concept preview",
    },
  },
];

const tabs: ConceptsTab[] = [
  { key: "popular", label: "Популярные концепции", items: popularConcepts },
  { key: "ready", label: "Готовые проекты", items: readyProjects },
];

export default function PopularConcepts() {
  return (
    <section className="w-full bg-bg">
      <Container>
        <div className=" px-4 py-20 sm:py-20">
          <PopularConceptsClient title="Популярные концепции" tabs={tabs} />
        </div>
      </Container>
    </section>
  );
}
