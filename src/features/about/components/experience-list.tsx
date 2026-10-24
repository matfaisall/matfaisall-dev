import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ExperienceVisual } from "@/features/about/components/experience-visuals";
import type { Experience } from "@/features/about/types";
import { formatMonth, formatSpan } from "@/lib/date";
import { cn } from "@/lib/utils";

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
      {experience.map((item) => (
        <li key={`${item.company}-${item.start}`}>
          {/* Each row fades up as it scrolls in: the dates first, then the card. */}
          <Reveal className="relative grid gap-4 md:grid-cols-[13rem_1fr] md:gap-8">
            <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start md:pt-7 md:pl-8">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8.5 left-0 hidden size-2.75 rounded-full border-2 border-primary md:block",
                  item.end ? "bg-background" : "bg-primary",
                )}
              />
              <p className="font-mono text-muted-foreground text-sm tabular-nums">
                <time dateTime={item.start}>{formatMonth(item.start)}</time>
                {" — "}
                {item.end ? <time dateTime={item.end}>{formatMonth(item.end)}</time> : "Present"}
              </p>
              {item.end ? (
                <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                  {formatSpan(item.start, item.end)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                  <span aria-hidden="true" className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  Now
                </span>
              )}
            </div>

            <article
              className={cn(
                "grid overflow-hidden rounded-2xl border border-border bg-muted/20",
                item.visual && "lg:grid-cols-[minmax(0,1fr)_21rem]",
              )}
            >
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <div>
                  <h3 className="font-medium text-xl tracking-tight">{item.role}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {[item.company, item.employment, item.workplace].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {item.summary && <p className="max-w-2xl leading-relaxed">{item.summary}</p>}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="flex max-w-2xl flex-col gap-2.5 text-muted-foreground leading-relaxed">
                    {item.highlights.map((highlight) => (
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
                {item.stack && item.stack.length > 0 && (
                  <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-2 pt-2">
                    {item.stack.map((tool) => (
                      <li key={tool}>
                        <Badge>{tool}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {item.visual && (
                <div
                  aria-hidden="true"
                  className="relative h-60 overflow-hidden border-border border-t sm:h-72 lg:h-auto lg:min-h-72 lg:border-t-0 lg:border-l"
                >
                  <ExperienceVisual visual={item.visual} />
                </div>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
