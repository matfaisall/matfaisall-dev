import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/features/blog/components/post-card";
import type { Post } from "@/features/blog/types";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>;
  }

  return (
    <Reveal className="divide-y divide-border overflow-hidden rounded-xl border border-border">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </Reveal>
  );
}
