import { Reveal } from "@/components/motion/reveal";
import { PostTile } from "@/features/blog/components/post-tile";
import type { Post } from "@/features/blog/types";

/** Posts as a three-column grid of tiles that fade up one after another as they scroll in. */
export function PostGrid({
  posts,
  empty = "No posts here yet.",
}: {
  posts: Post[];
  empty?: string;
}) {
  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-border border-dashed px-6 py-16 text-center text-muted-foreground">
        {empty}
      </p>
    );
  }

  return (
    <Reveal className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostTile key={post.slug} post={post} />
      ))}
    </Reveal>
  );
}
