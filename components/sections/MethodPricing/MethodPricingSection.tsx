import { Container } from "@/components/layout/Container";
import {
  MethodPricingCard,
  type MethodPricingPlan,
} from "@/components/sections/MethodPricing/MethodPricingCard";

type Props = {
  title?: string;
  plans: MethodPricingPlan[];
  className?: string;
};

export function MethodPricingSection({
  title = "Тарифы",
  plans,
  className = "",
}: Props) {
  return (
    <section
      className={[
        "w-full bg-white",
        "py-[64px] sm:py-[72px] lg:py-[90px]",
        className,
      ].join(" ")}
    >
      <Container>
        {/* dark rounded panel */}
        <div
          className={[
            "w-full",
            "rounded-[22px] sm:rounded-[26px] lg:rounded-[30px]",
            "bg-[#3A3A3A]",
            "px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10",
          ].join(" ")}
        >
          <h2
            className={[
              "text-center font-medium text-white/90",
              "text-[22px] sm:text-[26px] lg:text-[32px]",
              "leading-tight",
            ].join(" ")}
          >
            {title}
          </h2>

          <div
            className={[
              "mt-6 sm:mt-8 lg:mt-10",
              "grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8",
              "md:grid-cols-2 lg:grid-cols-3",
              // чтобы карточки красиво выглядели на широких экранах
              "items-stretch",
            ].join(" ")}
          >
            {plans.map((plan) => (
              <div key={plan.id} className="h-full">
                <MethodPricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}