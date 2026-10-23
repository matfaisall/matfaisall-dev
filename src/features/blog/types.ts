/** What each MDX post exports as `metadata`. */
export type PostMetadata = {
  title: string;
  /** One sentence. Used on cards and as the SEO description. */
  summary: string;
  /** "YYYY-MM-DD". */
  publishedAt: string;
  /** "YYYY-MM-DD". Set it when you make a meaningful edit. */
  updatedAt?: string;
  tags: string[];
  /** Drafts show up in development only. */
  draft?: boolean;
};

export type Post = PostMetadata & {
  /** URL segment: /blog/<slug>. Same as the MDX file name. */
  slug: string;
};
