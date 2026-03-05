import { Container } from "@/components/layout/Container";
import { JOURNAL_POSTS } from "./data";
import { JournalHeroCard } from "./ui/JournalHeroCard";
import { NavBar } from "@/components/layout/Header/NavBar";
import { JournalGridSection } from "./JournalGridSection";
import { JournalCtaSection } from "@/components/sections/JournalCta/JournalCta";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function JournalPage() {
  const featured = JOURNAL_POSTS[0];

  return (
    <main className="bg-[#EFEFEF] text-black">
      <NavBar variant="light" />

      <section className="pt-[110px] pb-10">
        <Container>
          <SectionReveal delay={0.02} className="mt-6">
            <JournalHeroCard post={featured} />
          </SectionReveal>

          <SectionReveal delay={0.06}>
            <JournalGridSection posts={JOURNAL_POSTS} />
          </SectionReveal>
        </Container>

        {/* ✅ FULL WIDTH CTA block */}
        <SectionReveal delay={0.1} className="mt-8">
          <JournalCtaSection
            image={{ src: "/images/journal.png", alt: "Journal CTA" }}
            title="Получи полезные материалы"
            buttonLabel="Перейти в MiniApp"
            href="/miniapp"
          />
        </SectionReveal>
      </section>
    </main>
  );
}
