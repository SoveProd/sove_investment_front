import Link from "next/link";

type ArrowButtonProps = {
  href?: string;
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "light";
  mobile?: boolean;
};

export function ArrowButton({
  href = "#",
  label,
  className = "",
  onClick,
  variant = "primary",
  mobile = false,
}: ArrowButtonProps) {
  const isLight = variant === "light";

  const base = mobile
    ? "inline-flex items-center justify-between h-[45px] min-w-[151px] rounded-full pl-4 pr-1 transition hover:opacity-90"
    : "inline-flex items-center justify-between h-[71px] rounded-full pl-10 pr-3 transition hover:opacity-90";

  const stylePrimary = "bg-primary text-white";
  const styleLight = "bg-white text-black";

  const textClass = mobile
    ? "text-[12px] font-medium whitespace-nowrap"
    : "text-[18px] font-medium whitespace-nowrap";

  const circleClass = mobile
    ? [
        " shrink-0 grid h-[32px] w-[32px] place-items-center rounded-full",
        isLight
          ? "bg-[#3f3f3f]"
          : "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
      ].join(" ")
    : [
        "ml-6 shrink-0 grid h-[55px] w-[55px] place-items-center rounded-full",
        isLight
          ? "bg-[#3f3f3f]"
          : "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
      ].join(" ");

  const content = (
    <>
      <span className={textClass}>{label}</span>

      <span className={circleClass}>
        <img
          src="/objects/Arrow.svg"
          alt=""
          width={mobile ? 12 : 17}
          height={mobile ? 12 : 17}
          className={isLight ? "block invert" : "block"}
        />
      </span>
    </>
  );

  const finalClass = `${base} ${isLight ? styleLight : stylePrimary} ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={finalClass}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={finalClass} aria-label={label}>
      {content}
    </Link>
  );
}
