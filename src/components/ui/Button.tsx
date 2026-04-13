import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outlineDark" | "secondaryLight";
type ButtonSize = "lg" | "md" | "sm";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  maxWidth?: boolean;
  className?: string;
  ariaLabel?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
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

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "lg",
    fullWidth = false,
    maxWidth = true,
    className,
  } = props;

  const base = clsx(
    "inline-flex items-center justify-center select-none",
    "rounded-full",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "font-medium leading-none",
    "disabled:pointer-events-none disabled:opacity-50",
  );

  const sizes: Record<ButtonSize, string> = {
    lg: clsx(
      "h-[52px] px-5 text-[14px] uppercase",
      "sm:h-[58px] sm:px-6 sm:text-[16px]",
      "lg:h-[60px] lg:px-7 lg:text-[16px]",
      "xl:h-[68px] xl:px-8 xl:text-[18px]",
      "2xl:h-[77px] 2xl:px-[21px] 2xl:text-[22px]",
    ),

    md: clsx(
      "h-[48px] px-5 text-[14px] uppercase",
      "sm:h-[52px] sm:px-6 sm:text-[15px]",
      "lg:h-[54px] lg:text-[15px]",
      "xl:h-[56px] xl:text-[16px]",
    ),

    sm: clsx(
      "h-[45px] min-w-[129px] px-4 text-[12px] normal-case rounded-full",
      "sm:h-[50px] sm:min-w-[150px] sm:px-5 sm:text-[14px]",
      "lg:h-[56px] lg:min-w-0 lg:px-6 lg:text-[16px]",
    ),
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    outlineDark:
      "border border-white/70 bg-transparent text-white hover:bg-white hover:text-graphite",
    secondaryLight:
      "bg-[#F7F7F7] text-[#1f1f1f] border border-[#E3E3E3] hover:bg-black/[0.03]",
  };

  const width = fullWidth
    ? "w-full"
    : maxWidth
      ? "w-full max-w-[481px]"
      : "w-auto";

  const styles = clsx(base, sizes[size], variants[variant], width, className);

  if ("href" in props && props.href) {
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
