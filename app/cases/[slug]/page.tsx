import { CaseDetailsPage } from "@/components/pages/Cases/CaseDetailsPage";

type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
  return <CaseDetailsPage slug={params.slug} />;
}