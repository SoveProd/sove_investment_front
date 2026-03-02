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
    <footer className="bg-[#f3f3f3] pt-16 md:pt-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[433px_1fr] lg:items-start">
          {/* Left: Contacts (2 fixed rows) */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-rows-[232.26px_232.26px] lg:gap-6">
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

          {/* Right: 2 rows - top: nav, bottom: logo aligned with 2nd contact card */}
          <div className="lg:grid lg:grid-rows-[232.26px_232.26px] lg:gap-6">
            {/* Top row: Navigation */}
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

            {/* Bottom row: Logo (opposite the bottom white card) */}
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

        {/* Bottom bar */}
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
}: {
  iconSrc: string;
  iconAlt: string;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <div className="h-[232.26px] w-full rounded-[30px] border-[1.88px] border-black/10 bg-white p-8 lg:w-[433px]">
      <div className="flex flex-col gap-6">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/5">
          <Image src={iconSrc} alt={iconAlt} width={28} height={28} />
        </div>

        {/* Text */}
        <div>
          <p className="text-[22px] font-medium text-[#1f1f1f]">
            {title}
          </p>

          <Link
            href={href}
            className="mt-2 block text-[32px] font-semibold text-[#1f1f1f] leading-tight hover:opacity-80"
          >
            {value}
          </Link>
        </div>
      </div>
    </div>
  );
} 
