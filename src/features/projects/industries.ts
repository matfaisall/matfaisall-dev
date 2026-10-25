import type { ProjectIndustry } from "@/features/projects/types";

type Industry = {
  label: string;
  /** The badge on the cards and the case study: a faint wash and the text in the colour. */
  badge: string;
  /** The dot in the badge and in the filter tabs. */
  dot: string;
};

// The industries on /projects, in the order of the filter tabs. Projects all share the brand amber;
// only the industries have colours of their own. Every class is written out in full so Tailwind
// finds it when it scans this file.
export const industries: Record<ProjectIndustry, Industry> = {
  healthcare: {
    label: "Healthcare",
    badge: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  banking: {
    label: "Banking",
    badge: "bg-sky-500/12 text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  hr: {
    label: "HR & hiring",
    badge: "bg-violet-500/12 text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};
