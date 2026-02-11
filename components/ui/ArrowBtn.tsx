import Link from "next/link";

type ArrowButtonProps = {
  href?: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

export function ArrowButton({
  href = "#",
  label,
  className = "",
  onClick,
}: ArrowButtonProps) {
  const base =
    "inline-flex items-center justify-between " +
    "h-[71px] w-[291px] rounded-full bg-[#A05035] " +
    "pl-10 pr-3 text-white " +
    "transition hover:opacity-90";

  const content = (
    <>
      <span className="text-[18px] font-medium">{label}</span>

      <span className="grid h-[55px] w-[55px] place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <img src="/objects/Arrow.svg" alt="" width={17} height={17} className="block text-gray-400" />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={`${base} ${className}`} aria-label={label}>
      {content}
    </Link>
  );
}
