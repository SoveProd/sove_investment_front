import { Container } from "@/components/layout/Container";
import type { JournalArticle, JournalPost } from "@/components/pages/Journal/types";
import { JournalRelatedCard, type JournalRelatedCardVM } from "@/components/sections/JournalRelated/JournalRelatedCard";

type Props = {
  posts: JournalPost[] | JournalArticle[];
  title?: string;
};

function isArticle(item: JournalPost | JournalArticle): item is JournalArticle {
  return "slug" in item;
}

function toVM(item: JournalPost | JournalArticle): JournalRelatedCardVM {
  if (isArticle(item)) {
    return {
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      tags: "Инсайты, Тренды", // можно потом добавить в JournalArticle поле tags/category
      date: item.date,
      imageSrc: item.cover.src,
      imageAlt: item.cover.alt,
      href: `/journal/${item.slug}`,
    };
  }

  return {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt ?? "Статья посвящается далее\nкраткое содержание описание",
    tags: item.category,
    date: item.date,
    imageSrc: item.image.src,
    imageAlt: item.image.alt,
    href: item.href,
  };
}

export function JournalRelatedSection({ posts, title = "Похожие материалы" }: Props) {
  const items = posts.slice(0, 2).map(toVM); // как на макете: 2 карточки
  if (!items.length) return null;

  return (
    <section className="pb-16 pt-10">
      <Container>
        <h2 className="text-center text-[32px] font-medium text-black">
          {title}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {items.map((post) => (
            <JournalRelatedCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}