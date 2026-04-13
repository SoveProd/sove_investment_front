import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type JournalRelatedCardVM = {
  id: string;
  title: string;
  excerpt: string;
  tags: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type Props = {
  post: JournalRelatedCardVM;
  className?: string;
};

export function JournalRelatedCard({ post, className }: Props) {
  return (
    <article className={clsx("w-full", className)}>
      <Link href={post.href} className="block">
        <div className="relative overflow-hidden rounded-[28px]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.imageSrc}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>

        <h3 className="mt-5 text-[18px] font-medium leading-[1.25] text-black">
          {post.title}
        </h3>

        <p className="mt-2 whitespace-pre-line text-[12px] leading-5 text-black/55">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-[11px] text-black/45">
          <span>{post.tags}</span>
          <span>{post.date}</span>
        </div>
      </Link>
    </article>
  );
}
