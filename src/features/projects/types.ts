/** Panel colour of a project's card in the home page carousel. */
export type ProjectAccent = "orange" | "blue" | "violet" | "emerald";

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
  /**
   * Screenshot or photo for the cards and the project page. A remote `src` needs its host in
   * `images.remotePatterns` (next.config.ts); files in /public work as "/projects/<file>".
   * Without one, cards draw a placeholder browser window.
   */
  cover?: {
    src: string;
    alt: string;
    /** Who took a stock photo, e.g. "Luke Chesser on Unsplash". Shown small on the image. */
    credit?: string;
  };
  /** Panel colour in the home carousel. Without one, colours rotate by position. */
  accent?: ProjectAccent;
  /**
   * Up to two results shown large in the home carousel, e.g. { value: "40%", label: "Faster
   * first load" }. Without them, the card shows the year and the stack.
   */
  highlights?: { value: string; label: string }[];
};
