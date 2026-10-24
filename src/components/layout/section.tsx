import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Anchor for in-page links. Also names the heading for screen readers. */
  id: string;
  /** First sentence of the heading, e.g. "Selected work." */
  title: string;
  /** Second sentence, shown muted next to the title. */
  description?: string;
  /** Link or button at the end of the heading row, e.g. "All projects". */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * One band of a page between the rails: a two-tone heading with an amber tick on the left rail,
 * then the content. Bands are separated by a hairline that runs the full width of the viewport.
 */
export function Section({ id, title, description, action, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-16 border-border border-t", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id={headingId}
            className="relative max-w-2xl text-balance font-medium text-3xl tracking-tight md:text-4xl"
          >
            <span
              aria-hidden="true"
              className="absolute top-[0.2em] -left-6 h-[0.9em] w-0.5 bg-primary md:-left-12"
            />
            {title}
            {description && <span className="text-muted-foreground"> {description}</span>}
          </h2>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
