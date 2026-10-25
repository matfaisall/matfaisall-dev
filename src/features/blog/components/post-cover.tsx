import Image from "next/image";
import { CategoryArt } from "@/features/blog/components/category-art";
import type { Post } from "@/features/blog/types";
import { cn } from "@/lib/utils";

type PostCoverProps = {
  post: Post;
  /** The image's rendered width, for next/image, e.g. "(min-width: 1024px) 22rem, 100vw". */
  sizes: string;
  /** For the cover above the fold: loads it first. */
  preload?: boolean;
  /** On cards the title follows the cover, so screen readers can skip it. */
  decorative?: boolean;
  className?: string;
};

/**
 * A post's cover: its own image when the metadata has one, or else the illustration for its
 * category. Fills its parent, which needs `relative` and a size or an aspect ratio.
 */
export function PostCover({
  post,
  sizes,
  preload = false,
  decorative = false,
  className,
}: PostCoverProps) {
  if (!post.cover) return <CategoryArt category={post.category} className={className} />;

  return (
    <Image
      src={post.cover}
      alt={decorative ? "" : (post.coverAlt ?? "")}
      fill
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      className={cn("object-cover", className)}
    />
  );
}
