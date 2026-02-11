import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";
import { ArrowButton } from "../ui/ArrowBtn";

const items = [
  { title: "Стратегия флип", img: "/images/pathimg.jpg", href: "#" },
  { title: "Концептуальный ремонт", img: "/images/pathimg.jpg", href: "#" },
  { title: "Стратегия аренда", img: "/images/pathimg.jpg", href: "#" },
  { title: "Подбор объекта", img: "/images/pathimg.jpg", href: "#" },
];

export function FindYourPathSection() {
  return (
    <section className="w-full bg-bg py-[150px] max-lg:py-[80px]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[55px] font-medium tracking-[-0.02em] text-dark max-lg:text-[34px]">
              Найди свой путь вперед с SOVE
            </h2>

            <p className="mt-3 max-w-2xl text-[18px] text-text max-lg:text-[16px]">
              SOVE — это полный сервис управления real estate инвестициями.
            </p>
          </div>

          <ArrowButton label="Попробовать" href="#" />
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block"
              aria-label={item.title}
            >
              <div className="relative overflow-hidden rounded-[48px] bg-white">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <p className="mt-5 text-center text-[20px] font-normal text-dark max-lg:text-[18px]">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
