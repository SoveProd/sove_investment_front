import Link from "next/link";
import React, { ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "lg" | "md";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;          // ✅ ОБЯЗАТЕЛЬНО
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "lg",
    fullWidth = false,
    className,
  } = props;

  const styles = clsx(
    "inline-flex items-center justify-center select-none",
    fullWidth && "w-full",
    variant === "primary" ? "bg-red-600 text-white" : "border border-red-600 text-red-600",
    size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm",
    className
  );

if (props.href) {
  return (
    <Link href={props.href} className={styles} aria-label={props.ariaLabel}>
      {children}
    </Link>
  );
}


  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={styles}
      aria-label={props.ariaLabel}
    >
      {children}
    </button>
  );
}
