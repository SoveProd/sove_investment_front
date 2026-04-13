import CaseHero, {
  CaseHeroData,
} from "@/src/components/sections/CaseHero/CaseHero";
import { CtaBanner } from "@/src/components/home/CtaBanner/CtaBanner";

type Props = {
  slug: string;
};

export function CaseDetailsPage({ slug }: Props) {
  // временно: один кейс. Позже: find по slug или fetch с бэка.
  const hero: CaseHeroData = {
    title: "MODERN LOFT",
    imageSrc: "/images/hero.jpg",
    imageAlt: "Modern loft",

    leftMetrics: [
      { label: "Бюджет:", value: "$60,000" },
      { label: "ROI:", value: "35%" },
      { label: "Метраж:", value: "100" },
    ],
    rightMetrics: [
      { label: "Сроки реализации:", value: "6 мес." },
      { label: "Локация:", value: "Москва" },
      { label: "ЖК:", value: "Самолет" },
    ],

    description:
      "Ваш путеводитель по лучшим полям для гольфа в Марбелье. Марбелья — это не только пляжи и роскошная жизнь.",
    ctaLabel: "Забронировать слот",
    ctaHref: "/packages",
  };

  return (
    <main className="bg-white text-black">
      <CaseHero data={hero} />

      {/* дальше добавим блоки кейса */}
      <CtaBanner />
    </main>
  );
}
