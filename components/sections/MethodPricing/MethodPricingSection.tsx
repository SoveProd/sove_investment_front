import { Container } from "@/components/layout/Container";
import {
  MethodPricingCard,
  type MethodPricingPlan,
} from "@/components/sections/MethodPricing/MethodPricingCard";

type Props = {
  title?: string;
  subtitle?: string;
  plans: MethodPricingPlan[];
  className?: string;
};

export function MethodPricingSection({
  title = "Тарифы",
  subtitle = '"SOVE" — это полный сервис управления real estate инвестициями.',
  plans,
  className = "",
}: Props) {
  return (
    <section
      className={["w-full bg-white", "py-[32px] lg:py-[90px]", className].join(
        " ",
      )}
    >
      <Container>
        <div
          className={[
            "w-full bg-[#3A3A3A]",
            "rounded-[30px]",
            "px-4 py-8 lg:px-10 lg:py-10",
          ].join(" ")}
        >
          <h2 className="text-center text-[24px] font-medium text-white">
            {title}
          </h2>

          <p className="mx-auto mt-2 max-w-[260px] text-center text-[12px] text-white/75">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-5 lg:grid lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <MethodPricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
