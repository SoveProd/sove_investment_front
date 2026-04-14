import type { CmsBlock } from "@/lib/cms/types";
import { mapManagePropertyToClient } from "@/lib/cms/homepageAdapters";
import RealEstateClient from "./RealEstateClient";

const fallbackItems = [
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
    imageAlt: "Interior 4",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
  {
    id: "5",
    imageSrc: "/images/statsimg2.jpg",
    imageAlt: "Interior 5",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
  {
    id: "6",
    imageSrc: "/images/hero.jpg",
    imageAlt: "Interior 6",
    caption: "УПРАВЛЕНИЕ ИНВЕСТИЦИЯМИ",
  },
];

type Props = {
  managePropertyBlock?: CmsBlock;
};

export function RealEstate({ managePropertyBlock }: Props) {
  const content = managePropertyBlock
    ? mapManagePropertyToClient(managePropertyBlock)
    : null;

  return (
    <RealEstateClient
      title={content?.title || "Инвестируй в Недвижимость с Уверенностью"}
      subtitle={
        content?.subtitle ||
        "SOVE — это полный сервис управления real estate инвестициями. Мы берём на себя:"
      }
      items={content?.items?.length ? content.items : fallbackItems}
    />
  );
}
