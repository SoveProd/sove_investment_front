import { Container } from "@/src/components/layout/Container";
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
    images: [
      { src: "/images/statsimg1.jpg", alt: "Modern loft concept 1" },
      { src: "/images/statsimg2.jpg", alt: "Modern loft concept 2" },
      { src: "/images/statsimg3.jpg", alt: "Modern loft concept 3" },
    ],
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
    images: [
      { src: "/images/statsimg1.jpg", alt: "Modern loft concept 1" },
      { src: "/images/statsimg2.jpg", alt: "Modern loft concept 2" },
      { src: "/images/statsimg3.jpg", alt: "Modern loft concept 3" },
    ],
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
    images: [
      { src: "/images/statsimg1.jpg", alt: "Modern loft concept 1" },
      { src: "/images/statsimg2.jpg", alt: "Modern loft concept 2" },
      { src: "/images/statsimg3.jpg", alt: "Modern loft concept 3" },
    ],
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
    images: [
      { src: "/images/statsimg1.jpg", alt: "Modern loft concept 1" },
      { src: "/images/statsimg2.jpg", alt: "Modern loft concept 2" },
      { src: "/images/statsimg3.jpg", alt: "Modern loft concept 3" },
    ],
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
