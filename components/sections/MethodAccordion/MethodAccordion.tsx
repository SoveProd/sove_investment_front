"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

export type MethodAccordionItem = {
  id: string;
  title: string;
  description?: string;
  bullets?: ReadonlyArray<string>;
  imageSrc: string;
  imageAlt?: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<MethodAccordionItem>;
  className?: string;
  defaultOpenId?: string;
};

export function MethodAccordionSection({
  title,
  subtitle,
  items,
  className = "",
  defaultOpenId,
}: Props) {
  const initial = defaultOpenId ?? items[0]?.id ?? undefined;

  return (
    <section
      className={clsx("w-full bg-white py-[90px] max-lg:py-[70px]", className)}
    >
      <Container>
        <div className="grid grid-cols-12 gap-10 max-lg:gap-8">
          {/* LEFT TEXT */}
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-[44px] font-medium leading-tight text-[#1f1f1f] max-lg:text-[32px]">
              {title}
            </h2>
            <p className="mt-4 max-w-[360px] text-[14px] leading-relaxed text-black/60">
              {subtitle}
            </p>
          </div>

          {/* RIGHT ACCORDION CARD */}
          <div className="col-span-12 lg:col-span-8">
            <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
              <Accordion.Root
                type="single"
                collapsible
                defaultValue={initial}
                className="w-full"
              >
                {items.map((item, idx) => (
                  <Accordion.Item
                    key={item.id}
                    value={item.id}
                    className={clsx(
                      "group",
                      idx !== 0 && "border-t border-black/10",
                    )}
                  >
                    {/* ROW */}
                    <Accordion.Header className="w-full">
                      <Accordion.Trigger
                        className={clsx(
                          "flex w-full items-center justify-between gap-6",
                          "px-8 py-7 max-lg:px-5 max-lg:py-6",
                          "text-left transition-colors",
                          "hover:bg-black/[0.015]",
                          "data-[state=open]:bg-black/[0.02]",
                        )}
                      >
                        <span className="text-[20px] font-medium text-[#1f1f1f] max-lg:text-[17px]">
                          {item.title}
                        </span>

                        {/* RIGHT PREVIEW (always visible) */}
                        <span className="flex items-center gap-4">
                          <span className="relative h-[42px] w-[190px] shrink-0 overflow-hidden rounded-full border border-black/10 max-lg:w-[140px]">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt ?? ""}
                              fill
                              className="object-cover"
                              sizes="190px"
                            />
                            <span className="absolute inset-0 bg-black/10" />
                          </span>

                          {/* tiny chevron */}
                          <span
                            className={clsx(
                              "text-black/35 transition-transform duration-300",
                              "group-data-[state=open]:rotate-180",
                            )}
                          >
                            ▾
                          </span>
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>

                    {/* EXPANDED CONTENT */}
                    <Accordion.Content
                      className={clsx(
                        "overflow-hidden",
                        "data-[state=open]:animate-accOpen data-[state=closed]:animate-accClose",
                      )}
                    >
                      <div className="px-8 pb-8 max-lg:px-5 max-lg:pb-6">
                        <div className="grid grid-cols-12 gap-8 max-lg:gap-6">
                          {/* LEFT TEXT */}
                          <div className="col-span-12 lg:col-span-7">
                            {item.description ? (
                              <p className="text-[13px] leading-relaxed text-black/60">
                                {item.description}
                              </p>
                            ) : null}

                            {item.bullets?.length ? (
                              <ul className="mt-4 space-y-2 text-[13px] text-black/60">
                                {item.bullets.map((b) => (
                                  <li key={b} className="flex gap-3">
                                    <span className="mt-[7px] h-[4px] w-[4px] rounded-full bg-black/35" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>

                          {/* RIGHT BIG IMAGE */}
                          <div className="col-span-12 lg:col-span-5">
                            <div className="relative h-[260px] w-full overflow-hidden rounded-[18px] border border-black/10 bg-black/5 max-lg:h-[220px]">
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt ?? ""}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 420px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes accOpen {
          from {
            height: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
          }
        }
        @keyframes accClose {
          from {
            height: var(--radix-accordion-content-height);
          }
          to {
            height: 0;
          }
        }
        .animate-accOpen {
          animation: accOpen 240ms ease;
        }
        .animate-accClose {
          animation: accClose 200ms ease;
        }
      `}</style>
    </section>
  );
}
