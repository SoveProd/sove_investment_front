import { ThreeHoverZones } from "@/src/components/home/FeatureZone/FeatureZone";
import { PageHero } from "@/src/components/sections/PageHero/PageHero";
import { ReadyConceptSection } from "@/src/components/sections/ReadyConcept/ReadyConceptSection";
import { PackagesFaqSection } from "@/src/components/sections/PackagesFaq/PackagesFaqSection";
import { CtaBanner } from "@/src/components/home/CtaBanner/CtaBanner";
import { SectionReveal } from "@/src/components/ui/SectionReveal";

export function PackagesPage() {
  return (
    <main className="bg-[#f3f3f3] text-black">
      <SectionReveal delay={0}>
        <PageHero
          title={["ПАКЕТЫ ИНВЕСТИРОВАНИЯ", "В НЕДВИЖИМОСТЬ"]}
          subtitle="Выбери комплексное решение под свои задачи"
          imageSrc="/images/PageHero/packagesHero.png"
        />
      </SectionReveal>

      <SectionReveal delay={0.05} className="mt-6">
        <ReadyConceptSection
          title="Готовая концепция"
          description={
            "Выбери из готовых концепций SOVE библиотеки. Проверенные решения, которые продают на 15–20% дороже. Быстро, надёжно, предсказуемо."
          }
          metricsTitle="Параметры:"
          metrics={[
            { label: "Бюджет:", value: "200,000 - 1,500,000" },
            { label: "Стоимость за м²:", value: "50-200 тысяч рублей" },
            { label: "Сроки цикла:", value: "4-5 месяцев" },
            { label: "Средний ROI:", value: "+40-50%" },
          ]}
          includedTitle="Что включено"
          included={[
            "Дизайн из проверенной библиотеки концепций",
            'Управление ремонтом "под ключ"',
            "Продажа объекта с максимальной наценкой",
            "Гарантированный ROI без кастомизации",
          ]}
          alsoIncludedTitle="Что включено"
          alsoIncluded={["Продажа", "Аренда", "Инвест ремонт"]}
          primaryCtaLabel="Выбрать пакет"
          primaryCtaHref="/packages/select"
          secondaryCtaLabel="Подробнее"
          secondaryCtaHref="/packages/ready"
          images={{
            left: {
              src: "/images/statsimg1.jpg",
              alt: "Ready concept interior 1",
            },
            right: {
              src: "/images/statsimg1.jpg",
              alt: "Ready concept interior 2",
            },
          }}
        />
      </SectionReveal>

      <SectionReveal delay={0.08} className="mt-6">
        <ReadyConceptSection
          reverse
          title="Полный цикл"
          description="От поиска объекта до получения дохода - SOVE управляет всем. Абсолютно всё включено. Мы ищем объект, разрабатываем, управляем ремонтом, продаём. Ты только получаешь прибыль. Нулевой риск, максимум гарантий, максимум ROI."
          metricsTitle="Параметры:"
          metrics={[
            { label: "Бюджет:", value: "5,000,000 - 150,000,000" },
            { label: "Стоимость за м²:", value: "1000-2000 тысяч рублей" },
            { label: "Сроки цикла:", value: "4-5 месяцев" },
            { label: "Средний ROI:", value: "+55-70%" },
          ]}
          includedTitle="Что включено"
          included={[
            "Поиск и подбор идеального объекта",
            "Анализ рынка и целевой аудитории",
            "Разработка индивидуальной дизайн-концепции",
            "Полное управление ремонтом “под ключ”",
            "Управление продажей объекта",
            "Максимизация цены продажи",
            "Полная ответственность SOVE за результат",
          ]}
          alsoIncludedTitle="Мы можем помочь вас с:"
          alsoIncluded={["Продажа", "Аренда"]}
          primaryCtaLabel="Выбрать пакет"
          primaryCtaHref="/packages"
          secondaryCtaLabel="Подробнее"
          secondaryCtaHref="/packages/full-cycle"
          images={{
            left: { src: "/images/statsimg1.jpg", alt: "..." },
            right: { src: "/images/statsimg1.jpg", alt: "..." },
          }}
        />
      </SectionReveal>

      <SectionReveal delay={0.1} className="mt-[80px] bg-[#f3f3f3]">
        <div className="hidden lg:block py-10 text-center text-[50px] font-medium text-[#1f1f1f]">
          Другие наши услуги
        </div>

        <ThreeHoverZones
          imageSrc="/images/PageHero/packagesHero.png"
          heightClassName="h-screen"
          overlayClassName="bg-black/35"
          zones={[
            {
              title: "Найти редкую\nжемчужину",
              text: "Заглушка текста",
              ctaLabel: "Подобрать объект",
              ctaHref: "/objects",
            },
            {
              title: 'Сообщество\n"Метод ремонта"',
              text: "Заглушка текста",
              ctaLabel: "Перейти в сообщество",
              ctaHref: "/community",
            },
            {
              title: "Индивидуальная\nконцепция",
              text: "Заглушка текста",
              ctaLabel: "Заказать концепцию",
              ctaHref: "/concepts",
            },
          ]}
        />
      </SectionReveal>

      <SectionReveal delay={0.12} className="mt-6">
        <PackagesFaqSection />
      </SectionReveal>

      <SectionReveal delay={0.14} className="mt-6">
        <CtaBanner title={"Готов начать\nинвестировать?"} />
      </SectionReveal>
    </main>
  );
}
