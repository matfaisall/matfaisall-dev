import type { ReactNode } from "react";
import { PlainMargins } from "@/components/layout/plain-margins";
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
  /**
   * Put the content in its own edge-to-edge band under the heading: hairlines above and below,
   * no rails, nothing clipped at the container. For carousels and other wide content.
   */
  bleed?: boolean;
  /**
   * What fills the margins beside the rails: the site-wide dot pattern or the plain background.
   * Alternate them down a page so the margins don't read as one long texture.
   */
  margins?: "dots" | "plain";
  className?: string;
  children: ReactNode;
};

/**
 * One band of a page between the rails: a two-tone heading with an amber tick on the left rail,
 * then the content. Bands are separated by a hairline that runs the full width of the viewport.
 */
export function Section({
  id,
  title,
  description,
  action,
  bleed = false,
  margins = "dots",
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  const heading = (
    <div
      className={cn(
        "flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between",
        !bleed && "mb-12",
      )}
    >
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
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-16 border-border border-t",
        margins === "plain" && "relative",
        className,
      )}
    >
      {margins === "plain" && <PlainMargins />}
      {bleed ? (
        <>
          <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:px-12 md:pt-28 md:pb-16">
            {heading}
          </div>
          {/* Covers the rails, so they stop at the hairline and pick up again in the next band. */}
          <div className="relative border-border border-t bg-background py-4">
            <div
              aria-hidden="true"
              className="mask-radial-from-0% mask-radial-to-50% mask-radial-at-left pointer-events-none absolute inset-0 bg-dots"
            />
            <div className="relative">{children}</div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          {heading}
          {children}
        </div>
      )}
    </section>
  );
}
