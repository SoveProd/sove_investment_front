import { FindYourPathSection } from "@/components/home/FindYourPath";
import { Hero } from "@/components/home/Hero";
import PopularConcepts from "@/components/home/PopularConcepts/PopularConcepts";
import { StatsMosaic } from "@/components/home/StatsMosaic";
import TryItSection from "@/components/home/TryIt/TryItSection";
import { RealEstate } from "@/components/home/RealEstate/RealEstate";
export default function Home() {
  return (
    <>
      <Hero />
      <StatsMosaic />
      <FindYourPathSection />
      <TryItSection />
      <PopularConcepts />
      <RealEstate />
      </>
  );
}
