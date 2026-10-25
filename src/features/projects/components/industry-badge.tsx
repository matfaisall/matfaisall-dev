import { industries } from "@/features/projects/industries";
import type { ProjectIndustry } from "@/features/projects/types";
import { cn } from "@/lib/utils";

/** A project's industry as a small mono pill in that industry's colour. */
export function IndustryBadge({
  industry,
  className,
}: {
  industry: ProjectIndustry;
  className?: string;
}) {
  const { label, badge, dot } = industries[industry];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider",
        badge,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}
