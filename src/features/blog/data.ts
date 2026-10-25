import type { MDXContent } from "mdx/types";
import { siteConfig } from "@/config/site";
import { type CategorySlug, categories } from "@/features/blog/categories";
import { postFiles } from "@/features/blog/posts";
import type { Author, Post, PostMetadata, TocItem } from "@/features/blog/types";

/** Every post is yours: the name, role and photo come from config/site.ts. */
export const author: Author = {
  name: siteConfig.name,
  role: siteConfig.role,
  avatar: siteConfig.avatar,
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CATEGORY_SLUGS: readonly string[] = categories.map((category) => category.slug);

// Fails the build with a clear message when a post's metadata is missing or malformed.
function parseMetadata(slug: string, metadata: unknown): PostMetadata {
  const fail = (reason: string): never => {
    throw new Error(`Invalid metadata in src/content/blog/${slug}/index.mdx: ${reason}`);
  };
  if (typeof metadata !== "object" || metadata === null)
    return fail("missing `export const metadata`");

  const {
    title,
    summary,
    publishedAt,
    updatedAt,
    category,
    tags,
    cover,
    coverAlt,
    featured,
    draft,
  } = metadata as Record<string, unknown>;
  if (typeof title !== "string" || !title) fail("`title` must be a non-empty string");
  if (typeof summary !== "string" || !summary) fail("`summary` must be a non-empty string");
  if (typeof publishedAt !== "string" || !DATE_PATTERN.test(publishedAt))
    fail("`publishedAt` must be a YYYY-MM-DD string");
  if (updatedAt !== undefined && (typeof updatedAt !== "string" || !DATE_PATTERN.test(updatedAt)))
    fail("`updatedAt` must be a YYYY-MM-DD string");
  if (typeof category !== "string" || !CATEGORY_SLUGS.includes(category))
    fail(`\`category\` must be one of: ${CATEGORY_SLUGS.join(", ")}`);
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string"))
    fail("`tags` must be an array of strings");
  if (cover !== undefined && (typeof cover !== "object" || cover === null || !("src" in cover)))
    fail('`cover` must be an imported image, e.g. `import cover from "./cover.webp"`');
  if (cover !== undefined && (typeof coverAlt !== "string" || !coverAlt))
    fail("`coverAlt` must describe the cover");
  if (featured !== undefined && typeof featured !== "boolean")
    fail("`featured` must be true or false");
  if (draft !== undefined && typeof draft !== "boolean") fail("`draft` must be true or false");

  return metadata as PostMetadata;
}

type PostMeta = { readingTime: number; toc: TocItem[] };

// remark-post-meta adds `postMeta` to every post at build time. It isn't in the MDX source, so
// editors that type .mdx imports from their content (the MDX extension) don't know it exists:
// read it through a plain shape instead of `file.postMeta`.
function readPostMeta(slug: string, file: object): PostMeta {
  const { postMeta } = file as { postMeta?: PostMeta };
  if (!postMeta) {
    throw new Error(
      `No postMeta in src/content/blog/${slug}/index.mdx: is remark-post-meta in next.config.ts?`,
    );
  }
  return postMeta;
}

const posts: Post[] = Object.entries(postFiles).map(([slug, file]) => ({
  slug,
  ...parseMetadata(slug, file.metadata),
  ...readPostMeta(slug, file),
}));

const isVisible = (post: Post) => !post.draft || process.env.NODE_ENV === "development";

/** Published posts, newest first. Keep at least one: /blog/[slug] needs a slug to prerender. */
export function getPosts(): Post[] {
  return posts.filter(isVisible).toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/** The big card at the top of /blog: the post marked `featured`, or else the newest one. */
export function getFeaturedPost(): Post | undefined {
  const all = getPosts();
  return all.find((post) => post.featured) ?? all[0];
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getPosts().filter((post) => post.category === category);
}

/** Up to `count` other posts to read next: the same category first, then the newest of the rest. */
export function getRelatedPosts(post: Post, count = 3): Post[] {
  const others = getPosts().filter((other) => other.slug !== post.slug);
  return [
    ...others.filter((other) => other.category === post.category),
    ...others.filter((other) => other.category !== post.category),
  ].slice(0, count);
}

/** The post body as a React component. */
export function getPostContent(slug: Post["slug"]): MDXContent {
  return postFiles[slug as keyof typeof postFiles].default;
}
