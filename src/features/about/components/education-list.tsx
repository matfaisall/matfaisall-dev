import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { EducationVisual } from "@/features/about/components/education-visuals";
import type { Education } from "@/features/about/types";
import { formatMonth, formatSpan } from "@/lib/date";

/**
 * Degrees and programmes as bento cards, newest first: an illustration on top, focus tags last.
 * The cards fade up one after another as the grid scrolls in.
 */
export function EducationList({ education }: { education: Education[] }) {
  if (education.length === 0) {
    return <p className="text-muted-foreground">No education added yet.</p>;
  }

  return (
    <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {education.map((item) => (
        <article
          key={`${item.school}-${item.start}`}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-muted/20"
        >
          {item.visual && (
            <div
              aria-hidden="true"
              className="relative h-48 overflow-hidden border-border border-b"
            >
              <EducationVisual visual={item.visual} />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-muted-foreground text-sm tabular-nums">
                <time dateTime={item.start}>{formatMonth(item.start)}</time>
                {" — "}
                {item.end ? <time dateTime={item.end}>{formatMonth(item.end)}</time> : "Present"}
              </p>
              <Badge>{item.kind}</Badge>
            </div>
            <div>
              <h3 className="font-medium text-lg tracking-tight">{item.program}</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {item.school}
                {item.end && (
                  <span className="whitespace-nowrap text-primary">
                    {" "}
                    · {formatSpan(item.start, item.end)}
                  </span>
                )}
              </p>
            </div>
            {item.summary && (
              <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
            )}
            {item.focus && item.focus.length > 0 && (
              <ul
                aria-label="Focus"
                className="mt-auto flex flex-wrap gap-2 border-border border-t pt-5"
              >
                {item.focus.map((topic) => (
                  <li key={topic}>
                    <Badge>{topic}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </Reveal>
  );
}
