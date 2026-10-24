export type Experience = {
  company: string;
  role: string;
  /** "YYYY-MM", e.g. "2024-03". */
  start: string;
  /** "YYYY-MM". Leave it out for your current position. */
  end?: string;
  employment?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  workplace?: "On-site" | "Remote" | "Hybrid";
  /** One or two sentences on the work as a whole. */
  summary?: string;
  /** What you built, owned or improved: a few short lines. */
  highlights?: string[];
  stack?: string[];
  /** Which illustration the card shows next to the text. */
  visual?: "sprint" | "review" | "pipeline";
};

/** A degree, a bootcamp or a training programme. */
export type Education = {
  school: string;
  program: string;
  kind: "Degree" | "Bootcamp" | "Programme";
  /** "YYYY-MM". */
  start: string;
  /** "YYYY-MM". Leave it out while it's ongoing. */
  end?: string;
  summary?: string;
  /** Topics it covered, shown as tags at the bottom of the card. */
  focus?: string[];
  /** Which illustration sits at the top of the card. */
  visual?: "graph" | "components" | "process";
};

export type Certificate = {
  title: string;
  /** Leave it out when you don't want to name the issuer. */
  issuer?: string;
};

export type Quote = {
  text: string;
  author: string;
  /** Who the author is or where the line comes from, e.g. "Computer scientist". */
  source?: string;
  /** The quote's language when it isn't English, e.g. "id", so screen readers pronounce it right. */
  lang?: string;
  /** An English translation, for a quote in another language. */
  translation?: string;
};

/** A point on the growth curve on the About page, oldest first. */
export type Milestone = {
  /** "YYYY-MM". */
  date: string;
  /** A few words, e.g. "Joined Infosys". */
  label: string;
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
  /** The About page's opening line. Wrap words in *asterisks* to set them in the accent italic. */
  intro: string;
  /**
   * The About page's introduction, one string per paragraph. Wrap the key phrases in *asterisks*
   * to set them in the foreground colour against the muted text.
   */
  bio: string[];
  /** A 4:5 photo of you in /public, e.g. "/about/muhammad-faisal.webp". */
  portrait: { src: string; alt: string };
  /** Most important first: the hero highlights the first three. */
  skills: string[];
  capabilities: Capability[];
  /**
   * The tools grid on the home page shows eight at a time and swaps to the next eight every few
   * seconds, so a multiple of eight rotates without repeats.
   */
  stack: Tech[];
  /** Newest first. */
  experience: Experience[];
  /** Newest first. */
  education: Education[];
  certificates: Certificate[];
  /** Results to show large in the growth band next to the counts taken from your data. */
  impact: { value: string; label: string }[];
  /** Oldest first: plotted along the growth curve. */
  milestones: Milestone[];
  /** The one line you work by. */
  quote: Quote;
};
