export type Experience = {
  company: string;
  role: string;
  /** "YYYY-MM", e.g. "2024-03". */
  start: string;
  /** Leave empty for your current position. */
  end?: string;
  summary: string;
};

/** One thing you focus on, shown as a card with an illustration on the home page. */
export type Capability = {
  title: string;
  summary: string;
  /** Which illustration the card shows. */
  visual: "performance" | "motion" | "accessibility";
};

/** One tool in the tech stack grid on the home page. */
export type Tech = {
  name: string;
  /** A square WebP in /public/stack, e.g. "/stack/react.webp". Shown at 40px, so 120px is plenty. */
  icon: string;
  /** Official documentation. The tile opens it in a new tab. */
  docs: string;
  /** For a black, single-colour logo (Next.js, shadcn/ui): inverted to white in dark mode. */
  invertInDark?: boolean;
};

export type About = {
  /** One sentence for the home page hero. */
  headline: string;
  /** A few sentences introducing who you are. */
  bio: string;
  /** Most important first: the hero highlights the first three. */
  skills: string[];
  capabilities: Capability[];
  /**
   * The tools grid on the home page shows eight at a time and swaps to the next eight every few
   * seconds, so a multiple of eight rotates without repeats.
   */
  stack: Tech[];
  experience: Experience[];
};
