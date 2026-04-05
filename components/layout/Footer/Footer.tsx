import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    title: "Основная навигация",
    links: [
      { label: "Главная", href: "/" },
      { label: "Преимущества", href: "/#benefits" },
      { label: "Популярные концепции", href: "/#popular-concepts" },
      { label: "Готовые проекты", href: "/#ready-projects" },
      { label: "Как это работает?", href: "/#how-it-works" },
      { label: "Отзывы", href: "/#testimonials" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Команда", href: "/team" },
      { label: "Карьера", href: "/career" },
      { label: "Блог", href: "/blog" },
    ],
  },
  {
    title: "Продукт",
    links: [
      { label: "Сервис", href: "/service" },
      { label: "Пакеты", href: "/packages" },
      { label: "FAQ", href: "/faq" },
      { label: "Документы", href: "/docs" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Блог", href: "/blog" },
      { label: "Гайды", href: "/guides" },
      { label: "Концепции", href: "/concepts" },
      { label: "Статьи", href: "/articles" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f3f3f3] pt-10 sm:pt-12 lg:pt-16">
      <Container>
        {/* MOBILE */}
        <div className="lg:hidden">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/footerLogo.svg"
              alt="SOVE Group logo"
              width={114}
              height={67}
              className="h-auto w-[114px]"
            />
          </div>

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            <ContactCard
              iconSrc="/icons/phone.svg"
              iconAlt="Phone"
              title="Телефон"
              value="+7 (777) 777-77-77"
              href="tel:+77777777777"
              mobile
            />
            <ContactCard
              iconSrc="/icons/envelope.svg"
              iconAlt="Email"
              title="Почта"
              value="sovegroup@gmail.com"
              href="mailto:sovegroup@gmail.com"
              mobile
            />
          </div>

          {/* Mobile nav: only first 2 columns like in screenshot */}
          <nav
            aria-label="Footer navigation"
            className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8"
          >
            {columns.slice(0, 2).map((col) => (
              <div key={col.title}>
                <h3 className="text-[14px] font-medium text-[#1f1f1f]">
                  {col.title}
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] leading-[1.25] text-[#4f4f4f] transition-colors hover:text-[#1f1f1f]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-black/10 py-4">
            <div className="flex items-end justify-between gap-4 text-[#c1c1c1]">
              <p className="max-w-[120px] text-[12px] leading-[1.2]">
                2026 SOVE.
                <br />
                Все права защищены
              </p>

              <Link
                href="/privacy"
                className="max-w-[120px] text-right text-[12px] leading-[1.2] transition-colors hover:text-[#1f1f1f]"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="grid gap-14 lg:grid-cols-[433px_1fr] lg:items-start">
            {/* Left: Contacts */}
            <div className="flex flex-col gap-6 lg:grid lg:grid-rows-[232.26px_232.26px]">
              <ContactCard
                iconSrc="/icons/phone.svg"
                iconAlt="Phone"
                title="Телефон"
                value="+7 (777) 777-77-77"
                href="tel:+77777777777"
              />
              <ContactCard
                iconSrc="/icons/envelope.svg"
                iconAlt="Email"
                title="Почта"
                value="sovegroup@gmail.com"
                href="mailto:sovegroup@gmail.com"
              />
            </div>

            {/* Right */}
            <div className="lg:grid lg:grid-rows-[232.26px_232.26px] lg:gap-6">
              <nav
                aria-label="Footer navigation"
                className="grid grid-cols-2 gap-12 md:grid-cols-4"
              >
                {columns.map((col) => (
                  <div key={col.title}>
                    <h3 className="text-[23px] font-medium text-[#1f1f1f]">
                      {col.title}
                    </h3>

                    <ul className="mt-5 space-y-4">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-[23px] text-[#5b5b5b] transition-colors hover:text-[#1f1f1f]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="hidden lg:flex items-center justify-end">
                <Image
                  src="/footerLogo.svg"
                  alt="SOVE Group logo"
                  width={252}
                  height={147}
                />
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-black/10 py-6">
            <div className="flex flex-col gap-3 text-[13px] text-[#9a9a9a] md:flex-row md:items-center md:justify-between">
              <p>© 2026 SOVE. Все права защищены</p>

              <Link
                href="/privacy"
                className="transition-colors hover:text-[#1f1f1f]"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function ContactCard({
  iconSrc,
  iconAlt,
  title,
  value,
  href,
  mobile = false,
}: {
  iconSrc: string;
  iconAlt: string;
  title: string;
  value: string;
  href: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={[
        "w-full rounded-[20px] border border-black/5 bg-white",
        mobile
          ? "p-4"
          : "h-[232.26px] p-8 lg:w-[433px] rounded-[30px] border-[1.88px]",
      ].join(" ")}
    >
      <div className={mobile ? "flex flex-col gap-4" : "flex flex-col gap-6"}>
        <div
          className={[
            "flex items-center justify-center rounded-2xl bg-[#3f3f3f]",
            mobile ? "h-9 w-9 rounded-[8px]" : "h-16 w-16",
          ].join(" ")}
        >
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={mobile ? 16 : 28}
            height={mobile ? 16 : 28}
          />
        </div>

        <div>
          <p
            className={[
              "font-medium text-[#1f1f1f]",
              mobile ? "text-[14px]" : "text-[22px]",
            ].join(" ")}
          >
            {title}
          </p>

          <Link
            href={href}
            className={[
              "mt-2 block leading-tight text-[#1f1f1f] hover:opacity-80",
              mobile ? "text-[18px] font-medium" : "text-[32px] font-semibold",
            ].join(" ")}
          >
            {value}
          </Link>
        </div>
      </div>
    </div>
  );
}
