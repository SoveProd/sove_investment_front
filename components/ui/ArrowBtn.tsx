import Link from "next/link";
import clsx from "clsx";

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

  const finalClass = clsx(
    "inline-flex items-center rounded-full transition hover:opacity-90",
    "h-[40px] min-w-[210px] px-[14px]",
    "lg:h-[71px] lg:min-w-[260px] lg:px-[18px]",
    isLight ? "bg-white text-black" : "bg-primary text-white",
    className,
  );

  const content = (
    <>
      <span className="flex-1 whitespace-nowrap text-center text-[14px] font-medium lg:text-[18px]">
        {label}
      </span>

      <span
        className={clsx(
          "ml-3 grid shrink-0 place-items-center rounded-full",
          "h-[30px] w-[30px]",
          "lg:ml-6 lg:h-[55px] lg:w-[55px]",
          isLight
            ? "bg-[#5A5A5A]"
            : "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
        )}
      >
        <img
          src="/objects/Arrow.svg"
          alt=""
          width={14}
          height={14}
          className={isLight ? "block invert" : "block"}
        />
      </span>
    </>
  );

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
