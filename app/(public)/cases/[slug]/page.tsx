import { CaseDetailsPage } from "@/src/components/pages/Cases/CasesDetailsPage";

type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
  return <CaseDetailsPage slug={params.slug} />;
}
