import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="relative flex flex-col gap-3 rounded-2xl border border-border p-6">
      <time dateTime={post.publishedAt} className="font-mono text-muted-foreground text-xs">
        {formatDate(post.publishedAt)}
      </time>
      <h3 className="font-semibold text-xl tracking-tight">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{post.summary}</p>
      <ul className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
