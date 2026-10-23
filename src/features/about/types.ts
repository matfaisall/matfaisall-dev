export type Experience = {
  company: string;
  role: string;
  /** "YYYY-MM", e.g. "2024-03". */
  start: string;
  /** Leave empty for your current position. */
  end?: string;
  summary: string;
};

export type About = {
  /** A few sentences introducing who you are. */
  bio: string;
  skills: string[];
  experience: Experience[];
};
