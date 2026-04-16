export const dynamic = "force-dynamic";

import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          SOVE
        </p>
        <h1 className="mt-3 text-[32px] font-medium tracking-tight text-neutral-900 sm:text-[48px]">
          Платформа в разработке
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-6 text-neutral-600">
          Скоро открытие. Маркетинговая главная доступна по адресу /homepage.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/homepage"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-neutral-800"
          >
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}

