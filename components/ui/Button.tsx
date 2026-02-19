import Link from "next/link";
import { ReactNode } from "react";
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
    className,
  } = props;

  const base = clsx(
    "inline-flex items-center justify-center select-none",
    "rounded-full",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "uppercase font-medium leading-none",
    "disabled:pointer-events-none disabled:opacity-50",
  );

  const sizes: Record<ButtonSize, string> = {
    lg: clsx(
      // mobile
      "h-[52px] px-5 text-[14px]",
      // sm
      "sm:h-[58px] sm:px-6 sm:text-[16px]",
      // ноутбук (lg)
      "lg:h-[60px] lg:px-7 lg:text-[16px]",
      // большие экраны (xl+)
      "xl:h-[68px] xl:px-8 xl:text-[18px]",
      // если хочешь прям крупно только на 2xl:
      "2xl:h-[77px] 2xl:px-[21px] 2xl:text-[22px]",
    ),
    md: clsx(
      "h-[48px] px-5 text-[14px]",
      "sm:h-[52px] sm:px-6 sm:text-[15px]",
      "lg:h-[54px] lg:text-[15px]",
      "xl:h-[56px] xl:text-[16px]",
    ),
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    outline:
      "border border-white/70 text-white hover:bg-white hover:text-graphite",
  };

 const width = fullWidth ? "w-full" : "w-full max-w-[481px]";

  const styles = clsx(base, sizes[size], variants[variant], width, className);

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
