import { Container } from "@/components/layout/Container";
import { PopularConcept, PopularConceptsClient } from "./PopularConceptsClient";

type Props = {
  title?: string;
  items?: PopularConcept[];
};

const DEFAULT_ITEMS: PopularConcept[] = [
  {
    id: "modern-loft-drop-1",
    title: "MODERN LOFT",
    description:
      "Минималистичный лофт с высокими потолками,\nоткрытой планировкой и индустриальными элементами.\nИдеален для молодых профессионалов и семей",
    forWho: "30–50 лет, семьи с детьми, ценители комфорта",
    budgetPerM2: "100 000",
    totalSlots: 10,
    availableSlots: 7,
    style: "Modern",
    drop: "Дроп 1",
    image: { src: "/images/statsimg1.jpg", alt: "Modern loft concept" },
    bookingHref: "/concepts/booking",
    detailsHref: "/concepts/modern-loft",
  },
  {
    id: "modern-loft-drop-2",
    title: "MODERN LOFT",
    description:
      "Минималистичный лофт с высокими потолками,\nоткрытой планировкой и индустриальными элементами.\nИдеален для молодых профессионалов и семей",
    forWho: "30–50 лет, семьи с детьми, ценители комфорта",
    budgetPerM2: "100 000",
    totalSlots: 10,
    availableSlots: 0,
    style: "Modern",
    drop: "Дроп 2",
    image: { src: "/images/statsimg1.jpg", alt: "Modern loft concept" },
    bookingHref: "/concepts/booking",
    detailsHref: "/concepts/modern-loft",
  },
  {
    id: "modern-loft-drop-3",
    title: "MODERN LOFT",
    description:
      "Минималистичный лофт с высокими потолками,\nоткрытой планировкой и индустриальными элементами.\nИдеален для молодых профессионалов и семей",
    forWho: "30–50 лет, семьи с детьми, ценители комфорта",
    budgetPerM2: "100 000",
    totalSlots: 10,
    availableSlots: 4,
    style: "Modern",
    drop: "Дроп 3",
    image: { src: "/images/statsimg1.jpg", alt: "Modern loft concept" },
    bookingHref: "/concepts/booking",
    detailsHref: "/concepts/modern-loft",
  },
  {
    id: "modern-loft-drop-4",
    title: "MODERN LOFT",
    description:
      "Минималистичный лофт с высокими потолками,\nоткрытой планировкой и индустриальными элементами.\nИдеален для молодых профессионалов и семей",
    forWho: "30–50 лет, семьи с детьми, ценители комфорта",
    budgetPerM2: "100 000",
    totalSlots: 10,
    availableSlots: 0,
    style: "Modern",
    drop: "Дроп 4",
    image: { src: "/images/statsimg1.jpg", alt: "Modern loft concept" },
    bookingHref: "/concepts/booking",
    detailsHref: "/concepts/modern-loft",
  },
];

export function PopularConceptsSection({
  title = "Популярные концепции",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <PopularConceptsClient title={title} items={items} />
      </Container>
    </section>
  );
}