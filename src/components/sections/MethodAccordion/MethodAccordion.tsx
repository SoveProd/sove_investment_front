"use client";

import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/src/components/layout/Container";

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
};

export function MethodAccordionSection({
  title,
  subtitle,
  items,
  className = "",
}: Props) {
  if (!items.length) return null;

  return (
    <section className={clsx("w-full bg-white py-[90px]", className)}>
      <Container>
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-3">
            <h2 className="text-[44px] font-medium text-[#1f1f1f]">{title}</h2>

            <p className="mt-4 text-[14px] text-black/45">{subtitle}</p>
          </div>

          {/* RIGHT */}
          <div className="col-span-9">
            <div className="relative h-[900px]">
              {items.map((item, index) => {
                const offset = index * 80;

                return (
                  <div
                    key={item.id}
                    style={{
                      top: offset,
                      zIndex: index + 1,
                    }}
                    className="absolute w-full rounded-[32px] border border-black/10 bg-[#F7F5F2] shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                  >
                    <div className="grid grid-cols-12 gap-6 px-8 py-8">
                      <div className="col-span-7">
                        <h3 className="text-[24px] font-medium text-[#1f1f1f]">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-5 text-[14px] text-black/60 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {item.bullets && (
                          <ul className="mt-6 space-y-3 text-[14px] text-black/55">
                            {item.bullets.map((b, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="mt-[8px] h-[4px] w-[4px] rounded-full bg-black/30" />

                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="col-span-5 flex justify-end">
                        <div className="relative h-[260px] w-[400px] overflow-hidden rounded-[22px]">
                          <Image
                            src={item.imageSrc}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
