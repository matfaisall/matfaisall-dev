import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

/** One post as a changelog-style row: date, then title and summary, then an arrow. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid gap-2 px-6 py-6 transition-colors hover:bg-muted/40 md:grid-cols-[9rem_1fr_auto] md:gap-8">
      <time
        dateTime={post.publishedAt}
        className="pt-1 font-mono text-muted-foreground text-xs tabular-nums"
      >
        {formatDate(post.publishedAt)}
      </time>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-lg tracking-tight">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{post.summary}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <ArrowRightIcon
        className="hidden size-4 self-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary md:block"
        aria-hidden="true"
      />
    </article>
  );
}
