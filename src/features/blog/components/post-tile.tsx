import Link from "next/link";
import { CategoryBadge } from "@/features/blog/components/category-badge";
import { PostCover } from "@/features/blog/components/post-cover";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

/** One post in the blog grid: the cover, the category and date, the title and a two-line summary. */
export function PostTile({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col gap-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border transition-colors group-hover:border-primary/40">
        <PostCover
          post={post}
          decorative
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-103 motion-reduce:transition-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <CategoryBadge category={post.category} />
        <time dateTime={post.publishedAt} className="text-muted-foreground text-sm">
          {formatDate(post.publishedAt)}
        </time>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-balance font-medium leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">{post.summary}</p>
      </div>
    </article>
  );
}
