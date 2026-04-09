import { Container } from "@/components/layout/Container";
import {
  SelfTryCard,
  type SelfTryPlan,
} from "@/components/sections/SelfTrySection/SelfTryCard";

type Props = {
  title?: string;
  subtitle?: string;
  plans: SelfTryPlan[];
  className?: string;
};

export function SelfTrySection({
  title = "Или попробуй сам",
  subtitle = '"SOVE — это полный сервис управления real estate инвестициями.',
  plans,
  className = "",
}: Props) {
  return (
    <section className={`w-full bg-white py-[56px] lg:py-[90px] ${className}`}>
      <Container>
        <h2 className="text-center text-[24px] font-medium leading-tight text-[#1F1F1F] lg:text-[40px]">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-[280px] text-center text-[12px] leading-[1.2] text-black/60 lg:mt-2 lg:max-w-[430px] lg:text-[14px]">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center gap-5 lg:mt-10 lg:grid lg:grid-cols-3 lg:justify-center lg:gap-6">
          {plans.map((plan, index) => (
            <SelfTryCard
              key={plan.id}
              plan={plan}
              tone={index === 2 ? "warm" : "default"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
