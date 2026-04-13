"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/store/hooks";
import { LoginForm } from "@/src/components/auth/LoginForm";

type Props = {
  children: React.ReactNode;
};

export function AdminAuthGate({ children }: Props) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
