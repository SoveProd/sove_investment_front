import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PackagesFaqClient, type FaqItem } from "./PackagesFaqClient";

type Props = {
  items?: FaqItem[];
};

const DEFAULT_ITEMS: FaqItem[] = [
  {
    id: "upgrade",
    question: "Могу ли я перейти на другой пакет позже?",
    answer:
      "Да. Вы можете перейти на другой пакет позже — мы пересчитаем стоимость и учтём уже выполненные этапы. Условия зависят от стадии проекта.",
  },
  {
    id: "refund",
    question: "Есть ли гарантия возврата денег?",
    answer:
      "Мы фиксируем условия в договоре. Возврат возможен в рамках условий договора и фактически оказанных услуг/этапов. Детали зависят от выбранного пакета и статуса работ.",
  },
  {
    id: "parallel",
    question: "Сколько объектов я могу инвестировать одновременно?",
    answer:
      "Зависит от пакета и доступности команды. Обычно мы рекомендуем начинать с 1 объекта, а дальше масштабироваться — параллельно можно вести несколько проектов при достаточном ресурсе.",
  },
  {
    id: "delay",
    question: "Что если проект задерживается?",
    answer:
      "Мы заранее предупреждаем о рисках, фиксируем сроки и контрольные точки. Если задержка происходит по нашей зоне ответственности — согласуем план перепланирования/компенсации согласно договору.",
  },
];

export function PackagesFaqSection({ items = DEFAULT_ITEMS }: Props) {
  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-36">
          {/* Left: logo */}
          <div className="flex items-start">
            <div className="relative h-[28px] w-[190px] sm:h-[32px] sm:w-[210px] md:w-[485px]">
              <Image
                src="/logo_dark.svg"
                alt="SOVE GROUP"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: accordion */}
          <div>
            <PackagesFaqClient items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}