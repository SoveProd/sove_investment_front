import type { MaterialsTab } from "./types";

export const MATERIALS_TABS: MaterialsTab[] = [
  {
    key: "materials",
    label: "Материалы",
    description:
      "Материалы в Modern Loft подчеркивают промышленный характер с сочетанием грубой текстуры и современного комфорта: необработанный кирпич или имитация на акцентных стенах для аутентичности, бетон в потолке, полу или столешницах, металл — черный матовый, латунь или ржавчина в каркасах мебели и светильниках, натуральное дерево с видимой текстурой (дуб/орех) в полках и столах, кожа или экокожа с потертостями на диванах и креслах, а также матовое стекло или перфорированные панели для шкафов и перегородок.",
    cards: [
      { id: "m1", title: "Красное дерево", imageSrc: "/images/red_wood.jpg" },
      { id: "m2", title: "Алюминий", imageSrc: "/images/red_wood.jpg" },
      { id: "m3", title: "Велюр", imageSrc: "/images/red_wood.jpg" },
      { id: "m5", title: "Красное дерево", imageSrc: "/images/red_wood.jpg" },
      { id: "m6", title: "Красное дерево", imageSrc: "/images/red_wood.jpg" },
      { id: "m7", title: "Красное дерево", imageSrc: "/images/red_wood.jpg" },
      // можно больше — карусель прокрутит
    ],
  },
  {
    key: "palette",
    label: "Гамма",
    description:
      "Теплая индустриальная палитра: графит, шоколад, молочные оттенки и мягкие акценты металла.",
    cards: [
      { id: "p1", title: "Графит", imageSrc: "/images/material-1.jpg" },
      { id: "p2", title: "Тёплый серый", imageSrc: "/images/material-2.jpg" },
      { id: "p3", title: "Молочный", imageSrc: "/images/material-3.jpg" },
      { id: "p4", title: "Латунь", imageSrc: "/images/material-4.jpg" },
    ],
  },
  {
    key: "furniture",
    label: "Мебель",
    description:
      "Силуэтная мебель с низкой посадкой, тактильные ткани и дерево/металл в деталях.",
    cards: [
      { id: "f1", title: "Диван", imageSrc: "/images/material-1.jpg" },
      { id: "f2", title: "Стол", imageSrc: "/images/material-2.jpg" },
      { id: "f3", title: "Стул", imageSrc: "/images/material-3.jpg" },
      { id: "f4", title: "Стеллаж", imageSrc: "/images/material-4.jpg" },
    ],
  },
  {
    key: "decor",
    label: "Декор",
    description:
      "Минималистичный декор: графика, керамика, книги, растения и фактурный текстиль.",
    cards: [
      { id: "d1", title: "Постер", imageSrc: "/images/material-1.jpg" },
      { id: "d2", title: "Керамика", imageSrc: "/images/material-2.jpg" },
      { id: "d3", title: "Текстиль", imageSrc: "/images/material-3.jpg" },
      { id: "d4", title: "Растения", imageSrc: "/images/material-4.jpg" },
    ],
  },
  {
    key: "lighting",
    label: "Освещение",
    description:
      "Сценарии света: треки, подвесы, локальный свет и мягкая подсветка ниш.",
    cards: [
      { id: "l1", title: "Трек", imageSrc: "/images/material-1.jpg" },
      { id: "l2", title: "Подвес", imageSrc: "/images/material-2.jpg" },
      { id: "l3", title: "Бра", imageSrc: "/images/material-3.jpg" },
      { id: "l4", title: "Подсветка", imageSrc: "/images/material-4.jpg" },
    ],
  },
];
