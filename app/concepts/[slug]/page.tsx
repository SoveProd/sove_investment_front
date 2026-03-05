import { ConceptDetailPage } from "@/components/pages/Concept/ConceptDetailPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ConceptDetailPage slug={slug} />;
}
