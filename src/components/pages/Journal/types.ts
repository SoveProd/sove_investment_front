export type JournalPost = {
  id: string;
  title: string;

  category: string; // "Инсайты, Тренды"
  date: string; // "22.12.2022"
  excerpt?: string; // опционально, если хочешь текст под заголовком в сетке
  image: {
    src: string;
    alt: string;
  };
  href: string;
};
export type JournalArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: { src: string; alt: string };
  // можно дальше расширять (контент, блоки и т.п.)
  content?: string;
};