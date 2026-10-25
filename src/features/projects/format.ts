import type { Project } from "@/features/projects/types";
import { formatMonth } from "@/lib/date";

/** "2024–2025", or "2026" when it started and ended in the same year. */
export function projectYears(project: Pick<Project, "start" | "year">): string {
  const startYear = Number(project.start.slice(0, 4));
  return startYear === project.year ? String(project.year) : `${startYear}–${project.year}`;
}

/** "Feb 2024 – Aug 2025", or "Apr 2026 – Present" while you're still on it. */
export function projectPeriod(project: Pick<Project, "start" | "end">): string {
  return `${formatMonth(project.start)} – ${project.end ? formatMonth(project.end) : "Present"}`;
}
