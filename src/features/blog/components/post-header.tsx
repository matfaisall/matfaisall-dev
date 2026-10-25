import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { getCategory } from "@/features/blog/categories";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

/** The top of a post, after Mintlify's: a way back, the category and date, the title, the reading time. */
export function PostHeader({ post }: { post: Post }) {
  const category = getCategory(post.category);

  return (
    <header className="flex flex-col items-start">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
          <ArrowLeftIcon
            aria-hidden="true"
            weight="bold"
            className="size-3 transition-transform group-hover:-translate-x-0.5"
          />
        </span>
        All articles
      </Link>
      <p className="mt-10 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
        {category && (
          <Link href={`/blog/category/${category.slug}`} className="text-primary hover:underline">
            {category.label}
          </Link>
        )}
        <span aria-hidden="true" className="text-muted-foreground/50">
          /
        </span>
        <time dateTime={post.publishedAt} className="text-muted-foreground">
          {formatDate(post.publishedAt)}
        </time>
      </p>
      <h1 className="mt-4 max-w-3xl text-balance font-medium text-4xl tracking-tight md:text-5xl md:leading-[1.1]">
        {post.title}
      </h1>
      <p className="mt-5 font-mono text-muted-foreground text-xs uppercase tracking-wider">
        {post.readingTime} min read
        {post.updatedAt && (
          <>
            {" · Updated "}
            <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
          </>
        )}
      </p>
    </header>
  );
}
