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
    <section className="w-full bg-bg py-[90px] sm:py-[100px] lg:py-[110px] 2xl:py-[150px]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-medium tracking-[-0.02em] text-dark text-[34px] sm:text-[38px] lg:text-[40px] 2xl:text-[55px]">
              Найди свой путь вперед с SOVE
            </h2>

            <p className="mt-3 max-w-2xl text-text text-[15px] sm:text-[16px] lg:text-[16px] 2xl:text-[18px]">
              SOVE — это полный сервис управления real estate инвестициями.
            </p>
          </div>

          <div className="lg:shrink-0">
            <ArrowButton label="Попробовать" href="#" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 sm:mt-12 lg:mt-12 2xl:mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block"
              aria-label={item.title}
            >
              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] 2xl:rounded-[48px] bg-white">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <p className="mt-4 sm:mt-5 text-center font-normal text-dark text-[18px] lg:text-[18px] 2xl:text-[20px]">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
