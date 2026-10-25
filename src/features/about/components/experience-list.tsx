import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ExperienceVisual } from "@/features/about/components/experience-visuals";
import { LiveDot } from "@/features/about/components/live-dot";
import type { Experience } from "@/features/about/types";
import { formatMonth, formatSpan } from "@/lib/date";
import { cn } from "@/lib/utils";

const chip = "rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs";

/** The left column of a row: the role's node on the timeline, its dates and how long it lasted. */
function RoleDates({ role }: { role: Experience }) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start md:pt-7 md:pl-8">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-8.5 left-0 hidden size-2.75 rounded-full border-2 border-primary md:block",
          role.end ? "bg-background" : "bg-primary",
        )}
      />
      <p className="font-mono text-muted-foreground text-sm tabular-nums">
        <time dateTime={role.start}>{formatMonth(role.start)}</time>
        {" — "}
        {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
      </p>
      {role.end ? (
        <span className={chip}>{formatSpan(role.start, role.end)}</span>
      ) : (
        <span className={cn(chip, "inline-flex items-center gap-1.5")}>
          <LiveDot className="size-1.5" />
          Now
        </span>
      )}
    </div>
  );
}

/** The right column: the role, the work and the stack, with the role's illustration beside it. */
function RoleCard({ role }: { role: Experience }) {
  return (
    <article
      className={cn(
        "grid overflow-hidden rounded-2xl border border-border bg-muted/20",
        role.visual && "lg:grid-cols-[minmax(0,1fr)_21rem]",
      )}
    >
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-medium text-xl tracking-tight">{role.role}</h3>
          <p className="mt-1 text-muted-foreground">
            {[role.company, role.employment, role.workplace].filter(Boolean).join(" · ")}
          </p>
        </div>
        {role.summary && <p className="max-w-2xl leading-relaxed">{role.summary}</p>}
        {role.highlights && role.highlights.length > 0 && (
          <ul className="flex max-w-2xl flex-col gap-2.5 text-muted-foreground leading-relaxed">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-xs bg-primary"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}
        {role.stack && role.stack.length > 0 && (
          <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-2 pt-2">
            {role.stack.map((tool) => (
              <li key={tool}>
                <Badge>{tool}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
      {role.visual && (
        <div
          aria-hidden="true"
          className="relative h-60 overflow-hidden border-border border-t sm:h-72 lg:h-auto lg:min-h-72 lg:border-t-0 lg:border-l"
        >
          <ExperienceVisual visual={role.visual} />
        </div>
      )}
    </article>
  );
}

/**
 * Roles on a timeline, newest first: the dates by a node on the line, then a bento card with the
 * work on one side and an illustration of it on the other.
 */
export function ExperienceList({ experience }: { experience: Experience[] }) {
  if (experience.length === 0) {
    return <p className="text-muted-foreground">No experience added yet.</p>;
  }

  return (
    <ol className="relative flex flex-col gap-6 md:gap-8">
      <span
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-1.25 hidden w-px bg-linear-to-b from-primary via-border to-transparent md:block"
      />
      {experience.map((role) => (
        <li key={`${role.company}-${role.start}`}>
          {/* Each row fades up as it scrolls in: the dates first, then the card. */}
          <Reveal className="relative grid gap-4 md:grid-cols-[13rem_1fr] md:gap-8">
            <RoleDates role={role} />
            <RoleCard role={role} />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
