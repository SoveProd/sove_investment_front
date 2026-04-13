import RealEstateClient from "./RealEstateClient";

const items = [
  {
    id: "1",
    imageSrc: "/images/hero.jpg",
    imageAlt: "Interior 1",
    caption: "ДИЗАЙН И КОНЦЕПТУАЛИЗАЦИЮ",
  },
  {
    id: "2",
    imageSrc: "/images/statsimg1.jpg",
    imageAlt: "Interior 2",
    caption: "ПОДБОР ОБЪЕКТА",
  },
  {
    id: "3",
    imageSrc: "/images/statsimg2.jpg",

    imageAlt: "Interior 3",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
  {
    id: "4",
    imageSrc: "/images/statsimg2.jpg",

    imageAlt: "Interior 3",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
  {
    id: "5",
    imageSrc: "/images/statsimg2.jpg",

    imageAlt: "Interior 3",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
  {
    id: "6",
    imageSrc: "/images/hero.jpg",

    imageAlt: "Interior 3",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
];

export function RealEstate() {
  return (
    <RealEstateClient
      title="Инвестируй в Недвижимость с Уверенностью"
      subtitle="“SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:”"
      items={items}
    />
  );
}
