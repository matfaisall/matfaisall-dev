import Image from "next/image";
import Link from "next/link";
import { PostCover } from "@/features/blog/components/post-cover";
import type { Author, Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

/**
 * The big card at the top of /blog, after Mintlify's: date, reading time, title, summary and the
 * author on one side, the cover on the other. The whole card is the link.
 */
export function FeaturedPost({ post, author }: { post: Post; author: Author }) {
  return (
    <article className="group relative grid overflow-hidden rounded-xl border border-border bg-muted/20 transition-colors hover:border-primary/40 lg:grid-cols-[24rem_1fr]">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <p className="font-mono text-muted-foreground text-xs">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {" · "}
          {post.readingTime} min read
        </p>
        <h2 className="text-balance font-medium text-2xl tracking-tight md:text-3xl">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground leading-relaxed">{post.summary}</p>
        <div className="mt-auto flex items-center gap-3 pt-6">
          <Image
            src={author.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full border border-border"
          />
          <div className="text-sm">
            <p className="font-medium">{author.name}</p>
            <p className="text-muted-foreground">{author.role}</p>
          </div>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden border-border border-t lg:aspect-auto lg:min-h-96 lg:border-t-0 lg:border-l">
        <PostCover
          post={post}
          decorative
          preload
          sizes="(min-width: 1152px) 42rem, (min-width: 1024px) 55vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-102 motion-reduce:transition-none"
        />
      </div>
    </article>
  );
}
