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

export type About = {
  /** One sentence for the home page hero. */
  headline: string;
  /** A few sentences introducing who you are. */
  bio: string;
  /** Most important first: the hero highlights the first three. */
  skills: string[];
  capabilities: Capability[];
  experience: Experience[];
};
