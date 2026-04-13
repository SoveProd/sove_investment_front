"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { loginUser } from "@/src/store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!login.trim() || !password.trim()) return;

    await dispatch(
      loginUser({
        login,
        password,
      }),
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/35" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[646px] rounded-[32px] bg-white px-10 py-12 shadow-[0_20px_80px_rgba(0,0,0,0.28)]"
        >
          <h1 className="mb-8 text-center text-[28px] font-medium text-[#2F2F2F]">
            Вход
          </h1>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[14px] text-[#9B9B9B]">
                Логин
              </label>

              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Иван"
                autoComplete="username"
                className="h-[74px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-5 text-[18px] text-[#2F2F2F] outline-none transition focus:border-[#B45B3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[14px] text-[#9B9B9B]">
                Пароль
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                autoComplete="current-password"
                className="h-[74px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-5 text-[18px] text-[#2F2F2F] outline-none transition focus:border-[#B45B3C]"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 text-center text-[14px] text-red-500">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-7 h-[74px] w-full rounded-full bg-[#B45B3C] text-[18px] font-semibold uppercase tracking-[0.02em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </section>
  );
}
