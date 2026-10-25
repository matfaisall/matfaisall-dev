import type { ProjectAccent } from "@/features/projects/types";

// The panel colour of each project's card in the home carousel: deep enough for white text in
// both themes. Every class is written out in full so Tailwind finds it when it scans this file.
export const accentPanels: Record<ProjectAccent, string> = {
  amber: "bg-amber-800",
  emerald: "bg-emerald-800",
  sky: "bg-sky-800",
  violet: "bg-violet-800",
  orange: "bg-orange-700",
  rose: "bg-rose-800",
  teal: "bg-teal-800",
};
