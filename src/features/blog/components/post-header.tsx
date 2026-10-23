import { Badge } from "@/components/ui/badge";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/lib/date";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-12 flex flex-col gap-4">
      <p className="font-mono text-muted-foreground text-sm">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.updatedAt && (
          <>
            {" · Updated "}
            <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
          </>
        )}
      </p>
      <h1 className="font-semibold text-4xl tracking-tight">{post.title}</h1>
      <p className="text-lg text-muted-foreground">{post.summary}</p>
      <ul className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </header>
  );
}
