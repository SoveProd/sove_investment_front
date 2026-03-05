import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "../types";

type Props = {
  post: JournalPost;
};

export function JournalHeroCard({ post }: Props) {
  return (
    <Link
      href={post.href}
      className="group block w-full overflow-hidden rounded-[28px] bg-white"
      aria-label={post.title}
    >
      <div className="relative w-full">
        <div className="relative h-[520px] w-full max-lg:h-[420px] max-md:h-[320px]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="100vw"
          />
        </div>

        {/* нижняя белая плашка */}
        <div className="absolute bottom-5 left-5 right-5 max-w-[520px] rounded-[18px] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-6 text-[12px] text-black/45">
            <div>{post.category}</div>
            <div>{post.date}</div>
          </div>

          <div className="mt-2 text-[20px] font-medium leading-snug text-black max-md:text-[18px]">
            {post.title}
          </div>
        </div>
      </div>
    </Link>
  );
}