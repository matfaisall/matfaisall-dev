import type { StaticImageData } from "next/image";
import type { CategorySlug } from "@/features/blog/categories";

/** What each MDX post exports as `metadata`. */
export type PostMetadata = {
  title: string;
  /** One sentence. Used on cards and as the SEO description. */
  summary: string;
  /** "YYYY-MM-DD". */
  publishedAt: string;
  /** "YYYY-MM-DD". Set it when you make a meaningful edit. */
  updatedAt?: string;
  /** One of the slugs in features/blog/categories.ts, e.g. "frontend". */
  category: CategorySlug;
  tags: string[];
  /**
   * An image imported next to the post, e.g. `import cover from "./cover.webp"`. 16:9 works best.
   * Leave it out and the post gets an illustrated cover for its category.
   */
  cover?: StaticImageData;
  /** Describes the cover for screen readers. Required when `cover` is set. */
  coverAlt?: string;
  /** Pins the post to the big card at the top of /blog. Without one, the newest post goes there. */
  featured?: boolean;
  /** Drafts show up in development only. */
  draft?: boolean;
};

/** A heading in the post's table of contents. */
export type TocItem = { depth: 2 | 3; text: string; id: string };

export type Post = PostMetadata & {
  /** URL segment: /blog/<slug>. Same as the post's folder name. */
  slug: string;
  /** Minutes, from the word count. */
  readingTime: number;
  toc: TocItem[];
};

/** Who wrote the posts: shown on the featured card and next to every post. */
export type Author = {
  name: string;
  role: string;
  /** A square photo in /public, e.g. "/avatar.webp". */
  avatar: string;
};
