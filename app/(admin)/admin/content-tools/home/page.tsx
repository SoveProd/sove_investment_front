import {
  HomeHeroSection,
  HomeMetricsSection,
} from "@/components/admin/content-tools/home";

export default function AdminHomeContentPage() {
  return (
    <section className="space-y-12">
      <HomeHeroSection />
      <HomeMetricsSection />
    </section>
  );
}
