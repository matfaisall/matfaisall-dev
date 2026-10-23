import type { MDXContent } from "mdx/types";
import { postFiles } from "@/features/blog/posts";
import type { Post, PostMetadata } from "@/features/blog/types";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Fails the build with a clear message when a post's metadata is missing or malformed.
function parseMetadata(slug: string, metadata: unknown): PostMetadata {
  const fail = (reason: string): never => {
    throw new Error(`Invalid metadata in src/content/blog/${slug}.mdx: ${reason}`);
  };
  if (typeof metadata !== "object" || metadata === null)
    return fail("missing `export const metadata`");

  const { title, summary, publishedAt, updatedAt, tags, draft } = metadata as Record<
    string,
    unknown
  >;
  if (typeof title !== "string" || !title) fail("`title` must be a non-empty string");
  if (typeof summary !== "string" || !summary) fail("`summary` must be a non-empty string");
  if (typeof publishedAt !== "string" || !DATE_PATTERN.test(publishedAt))
    fail("`publishedAt` must be a YYYY-MM-DD string");
  if (updatedAt !== undefined && (typeof updatedAt !== "string" || !DATE_PATTERN.test(updatedAt)))
    fail("`updatedAt` must be a YYYY-MM-DD string");
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string"))
    fail("`tags` must be an array of strings");
  if (draft !== undefined && typeof draft !== "boolean") fail("`draft` must be true or false");

  return metadata as PostMetadata;
}

const posts: Post[] = Object.entries(postFiles).map(([slug, file]) => ({
  slug,
  ...parseMetadata(slug, file.metadata),
}));

const isVisible = (post: Post) => !post.draft || process.env.NODE_ENV === "development";

/** Published posts, newest first. Keep at least one: /blog/[slug] needs a slug to prerender. */
export function getPosts(): Post[] {
  return posts.filter(isVisible).toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/** The post body as a React component. */
export function getPostContent(slug: Post["slug"]): MDXContent {
  return postFiles[slug as keyof typeof postFiles].default;
}
