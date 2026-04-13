import { notFound } from "next/navigation";
import { Container } from "@/src/components/layout/Container";
import { JOURNAL_ARTICLES } from "./data";
import { JournalArticleHero } from "@/src/components/sections/JournalArticleHero/JournalArticleHero";
import { JournalInfoImageBlock } from "@/src/components/sections/JournalInfoImageBlock/JournalInfoImageBlock";
import { JournalTripleGallerySection } from "@/src/components/sections/JournalTripleGallerySection/JournalTripleGallerySection";
import { JournalContinueSection } from "@/src/components/sections/JournalContinueSection/JournalContinueSection";
import { JournalRelatedSection } from "@/src/components/sections/JournalRelated/JournalRelated";

type Props = {
  slug: string;
};
const text = `Ведите образ жизни гольфиста в Марбелье. От престижного района Вальдеррама до оживлённой Гольф-Вэлли — Марбелья предлагает одни из лучших условий для игры в гольф в Испании. Здесь спорт, отдых и роскошь органично сочетаются под лучами солнца Коста-дель-Гольф.

Команда Norma Franck специализируется на том, чтобы помочь клиентам найти дом своей мечты рядом с лучшими полями для гольфа в Марбелье. В нашем портфолио представлены самые лучшие варианты для жизни рядом с полями для гольфа в Марбелье: от вилл на первой линии до современных апартаментов с потрясающим видом на фервеи.`;

export function JournalArticlePage({ slug }: Props) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return notFound();

  return (
    <main className="bg-[#EDEDED] text-black">
      <section>
        <div>
          <JournalArticleHero
            image={article.cover}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
          />
        </div>

        <Container>
          <div className="mt-10 max-w-[980px]">
            <div className="text-[14px] leading-7 text-black/70">
              {article.content ?? ""}
            </div>
          </div>

          <div className="mt-12">
            <JournalInfoImageBlock
              text={`Ваш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-СольВаш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-Соль...Ваш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-Соль...`}
              image={{
                src: "/images/journal.png",
                alt: "Interior",
              }}
            />
          </div>

          <div className="mt-10">
            <JournalInfoImageBlock
              reverse
              text={`Ваш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-Соль...Ваш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-Соль...Ваш путеводитель по лучшим видам для отдыха в Марбелье
Марбелья — это не только пляжи и роскошная жизнь. Это ещё и сердце Коста-дель-Соль...`}
              image={{
                src: "/images/journal.png",
                alt: "Interior",
              }}
            />
          </div>

          <div className="mt-12">
            <JournalTripleGallerySection
              images={[
                { src: "/images/journal.png", alt: "Interior 1" },
                { src: "/images/journal.png", alt: "Interior 2" },
                { src: "/images/journal.png", alt: "Interior 3" },
              ]}
              text={text}
            />
          </div>
        </Container>

        {/* ВАЖНО: этот компонент уже имеет Container внутри, поэтому лучше вынести наружу */}
        <JournalRelatedSection posts={JOURNAL_ARTICLES} />
      </section>
    </main>
  );
}
