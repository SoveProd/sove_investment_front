import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";
import { ArrowButton } from "../ui/ArrowBtn";
import type { CmsBlock, CmsButton } from "@/lib/cms/types";
import { getCmsMediaUrl } from "@/lib/cms/mediaUrl";

type Props = {
  block?: CmsBlock;
};

type BlockContentItem = {
  text?: string;
  href?: string;
};

export function FindYourPathSection({ block }: Props) {
  const buttons: CmsButton[] = Array.isArray(block?.button)
    ? block.button
    : block?.button
      ? [block.button]
      : [];

  const title = block?.title || "Найди свой путь в SOVE";
  const description =
    block?.text ||
    "SOVE — это полный сервис управления real estate инвестициями.";
  const buttonLabel =
    buttons.find((button) => button.position === 0)?.name || "Попробовать";

  const contentItems =
    block?.content &&
    typeof block.content === "object" &&
    "items" in block.content &&
    Array.isArray((block.content as { items?: BlockContentItem[] }).items)
      ? ((block.content as { items: BlockContentItem[] }).items ?? [])
      : [];

  const media = [...(block?.media || [])].sort((a, b) => {
    const aPos = a.position ?? Number.MAX_SAFE_INTEGER;
    const bPos = b.position ?? Number.MAX_SAFE_INTEGER;
    return aPos - bPos;
  });

  const fallbackItems = [
    { title: "Стратегия флип", img: "/images/pathimg.jpg", href: "#" },
    { title: "Концептуальный ремонт", img: "/images/pathimg.jpg", href: "#" },
    { title: "Стратегия аренда", img: "/images/pathimg.jpg", href: "#" },
    { title: "Подбор объекта", img: "/images/pathimg.jpg", href: "#" },
  ];

  const items =
    contentItems.length > 0
      ? contentItems.map((item, index) => ({
          title:
            item.text || fallbackItems[index]?.title || `Карточка ${index + 1}`,
          img:
            getCmsMediaUrl(media[index]) ||
            fallbackItems[index]?.img ||
            "/images/pathimg.jpg",
          href: item.href || "#",
        }))
      : fallbackItems;

  return (
    <section className="w-full bg-bg py-[56px] sm:py-[80px] lg:py-[110px] 2xl:py-[150px]">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[920px]">
            <h2 className="font-medium tracking-[-0.02em] text-dark text-[34px] leading-[0.95] sm:text-[38px] lg:text-[40px] 2xl:text-[55px]">
              {title}
            </h2>

            <p className="mt-3 max-w-[760px] text-text text-[14px] leading-[1.35] sm:text-[16px] lg:text-[16px] 2xl:text-[18px]">
              {description}
            </p>
          </div>

          <div className="hidden lg:block lg:shrink-0">
            <ArrowButton label={buttonLabel} href="#" />
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <div
            className="
              flex gap-4 overflow-x-auto pb-2
              snap-x snap-mandatory
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {items.map((item, index) => (
              <Link
                key={`${item.title}-${index}`}
                href={item.href}
                className="group block w-[264px] shrink-0 snap-start"
                aria-label={item.title}
              >
                <div className="relative overflow-hidden rounded-[24px] bg-white">
                  <div className="relative aspect-[0.85/1] w-full">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="264px"
                      className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <p className="mt-3 text-center font-normal text-dark text-[16px] leading-[1.2] sm:text-[18px]">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:gap-6 xl:mt-12 xl:grid-cols-4">
          {items.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              className="group block"
              aria-label={item.title}
            >
              <div className="relative overflow-hidden rounded-[32px] bg-white xl:rounded-[40px] 2xl:rounded-[48px]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1280px) 33vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <p className="mt-4 text-center font-normal text-dark text-[18px] xl:text-[18px] 2xl:text-[20px]">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
