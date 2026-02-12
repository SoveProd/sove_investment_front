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
      "h-[60px] px-6 text-[16px]",
      "sm:h-[68px] sm:px-8 sm:text-[18px]",
      "lg:h-[77px] lg:px-[21px] lg:text-[22px]",
    ),
    md: clsx("h-[52px] px-6 text-[16px]", "sm:h-[56px] sm:text-[16px]"),
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primaryHover",

    outline:
      "border border-white/70 text-white hover:bg-white hover:text-graphite",
  };

const width = fullWidth ? "w-full" : "w-fit";


  const styles = clsx(base, sizes[size], variants[variant], width, className);

  if ("href" in props) {
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
