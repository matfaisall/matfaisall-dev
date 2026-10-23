export type Project = {
  /** URL segment: /projects/<slug>. Lowercase, words separated by dashes. */
  slug: string;
  title: string;
  /** One or two sentences. Used on cards and as the SEO description. */
  summary: string;
  year: number;
  tags: string[];
  /** Featured projects are shown on the home page. */
  featured: boolean;
  links: {
    live?: string;
    repository?: string;
  };
};
