// app/journal/[slug]/page.tsx
import { JournalArticlePage } from "@/src/components/pages/Journal/JournalArticlePage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <JournalArticlePage slug={slug} />;
}
