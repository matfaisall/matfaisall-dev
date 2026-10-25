/** The panel colour of the project's card in the home carousel. Everything else is amber. */
export type ProjectAccent = "amber" | "emerald" | "sky" | "violet" | "orange" | "rose" | "teal";

/** The filter tabs on /projects. Each has its own colour, in features/projects/industries.ts. */
export type ProjectIndustry = "healthcare" | "banking" | "hr";

/** Which illustration the project's card on /projects draws. */
export type ProjectVisual =
  | "rollout"
  | "website"
  | "onboarding"
  | "groups"
  | "jobs"
  | "tenants"
  | "approvals";

export type ProjectImage = {
  /** A file in /public, e.g. "/projects/nuha-crm/cover.webp" (16:10 works best), or a URL whose
   * host is in `images.remotePatterns` (next.config.ts). */
  src: string;
  alt: string;
  /** Who took a stock photo, e.g. "Luke Chesser on Unsplash". Shown small on the image. */
  credit?: string;
};

export type Project = {
  /** URL segment: /projects/<slug>. Lowercase, words separated by dashes. */
  slug: string;
  title: string;
  /** One or two sentences. Used on cards and as the SEO description. */
  summary: string;
  /** The case study's opening line. Wrap its end in *asterisks* to set it in the accent italic. */
  headline: string;
  industry: ProjectIndustry;
  company: string;
  role: string;
  /** "YYYY-MM". */
  start: string;
  /** "YYYY-MM". Leave it out while you're still on it. */
  end?: string;
  /** Three short tags for the card, e.g. ["Next.js", "GSAP", "SEO"]. */
  tags: string[];
  /** Featured projects are shown on the home page. */
  featured: boolean;
  /** The big card at the top of /projects. Give it to one project. */
  spotlight?: boolean;
  /** "internal": no public link to show. "public": set `links.live` once you can share it. */
  status: "internal" | "public";
  links: {
    live?: string;
    repository?: string;
  };
  /** From `git log --author`: your commits, and the repo's total when it says something. */
  commits?: { mine: number; total?: number };
  /** The case study's hero image and the home carousel photo. */
  cover: ProjectImage;
  /** Shown in the case study's "Screens" section, each with a caption. */
  screenshots: (ProjectImage & { caption: string })[];
  accent: ProjectAccent;
  visual: ProjectVisual;
  /**
   * Up to two results shown large on the project's card in the home carousel, e.g.
   * { value: "22", label: "Modules in one back office" }.
   */
  highlights?: { value: string; label: string }[];
  /** Plain answers shown next to the cover in the case study, a sentence or two each. */
  overview: {
    /** What the product is. */
    what: string;
    /** Who uses it. */
    who: string;
    /** What they use it for. */
    use: string;
  };
  /** What you built, as cards: three or four parts you owned. */
  modules: { title: string; description: string }[];
  /** The full stack, listed at the top of the case study. */
  stack: string[];
  /** Worked out from `end` (or `start`): used to sort and in the home page's code window. */
  year: number;
};

/** A project you only touched, listed under "Also contributed to" on /projects. */
export type Contribution = {
  title: string;
  description: string;
  company: string;
  /** e.g. "2023–2024". */
  period: string;
};
