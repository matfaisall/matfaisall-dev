import type { Contribution } from "@/features/projects/types";

/** "Also contributed to" on /projects: one row per project, its name, what you did, where, when. */
export function ContributionList({ contributions }: { contributions: Contribution[] }) {
  return (
    <ul className="overflow-hidden rounded-xl border border-border">
      {contributions.map((contribution) => (
        <li
          key={contribution.title}
          className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-border border-b px-5.5 py-4.5 last:border-b-0"
        >
          <span className="flex-[1_1_13rem] font-medium">{contribution.title}</span>
          <span className="flex-[2_1_20rem] text-muted-foreground text-sm">
            {contribution.description}
          </span>
          <span className="font-mono text-muted-foreground text-xs">
            {contribution.company} · {contribution.period}
          </span>
        </li>
      ))}
    </ul>
  );
}
