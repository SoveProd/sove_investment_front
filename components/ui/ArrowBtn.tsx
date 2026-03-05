import Link from "next/link";

type ArrowButtonProps = {
  href?: string;
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "light";
};

export function ArrowButton({
  href = "#",
  label,
  className = "",
  onClick,
  variant = "primary",
}: ArrowButtonProps) {
  const isLight = variant === "light";

  const base =
    "inline-flex items-center justify-between " +
    "h-[71px] rounded-full " +
    "pl-10 pr-3 transition hover:opacity-90";

  const stylePrimary = "bg-primary text-white";

  const styleLight = "bg-white text-black";

  const content = (
    <>
      <span className="text-[18px] font-medium whitespace-nowrap">{label}</span>

      <span
        className={[
          "ml-6 grid h-[55px] w-[55px] place-items-center rounded-full",
          isLight
            ? "bg-[#3f3f3f]"
            : "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
        ].join(" ")}
      >
        <img
          src="/objects/Arrow.svg"
          alt=""
          width={17}
          height={17}
          className={isLight ? "invert" : ""}
        />
      </span>
    </>
  );

  const finalClass = `${base} ${
    isLight ? styleLight : stylePrimary
  } ${className}`;

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
