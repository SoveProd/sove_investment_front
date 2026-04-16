import { redirect } from "next/navigation";

/** Корень не показывает маркетинговую главную — см. `/homepage`. */
export default function RootPage() {
  redirect("/coming-soon");
}
