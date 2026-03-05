import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { JournalPost } from "../types";

type Props = {
  post: JournalPost;
  className?: string;
};

export function JournalCard({ post, className }: Props) {
  return (
    <article className={clsx("w-full", className)}>
      <Link href={post.href} className="block">
        <div className="relative overflow-hidden rounded-[24px]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>

        <h3 className="mt-4 text-[16px] font-medium leading-[1.25] text-black">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-[12px] leading-5 text-black/55">
            {post.excerpt}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between text-[11px] text-black/45">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
      </Link>
    </article>
  );
}
