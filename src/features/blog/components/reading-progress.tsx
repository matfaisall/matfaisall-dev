"use client";

import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ReadingProgressProps = {
  /** The post's reading time, from its metadata. */
  minutes: number;
  /** The id of the element holding the post's text: progress runs from its top to its bottom. */
  bodyId: string;
  className?: string;
};

/**
 * How far into a post the reader is: an amber bar that fills while they scroll through the text,
 * the minutes left, and a way back to the top. It mirrors the scroll position and never moves on
 * its own, so unlike the decorative animations it also runs with reduced motion.
 */
export function ReadingProgress({ minutes, bodyId, className }: ReadingProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [minutesLeft, setMinutesLeft] = useState(minutes);
  const [started, setStarted] = useState(false);

  useGSAP(
    () => {
      const body = document.getElementById(bodyId);
      if (!body || !bar.current) return;

      const update = (progress: number) => {
        gsap.set(bar.current, { scaleX: progress });
        // React skips the render when the value is unchanged, so this only updates per minute.
        setMinutesLeft(Math.ceil(minutes * (1 - progress)));
        setStarted(progress > 0.02);
      };

      // From the text's first line under the sticky header to its last line on screen.
      ScrollTrigger.create({
        trigger: body,
        start: "top 96px",
        end: "bottom bottom",
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });
    },
    { scope: ref, dependencies: [bodyId, minutes] },
  );

  const status = !started
    ? `${minutes} min read`
    : minutesLeft > 0
      ? `${minutesLeft} min left`
      : "All read. Thanks!";

  return (
    <div ref={ref} className={cn("w-full flex-col gap-3", className)}>
      <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
        Reading progress
      </p>
      <span aria-hidden="true" className="block h-1 w-full overflow-hidden rounded-full bg-muted">
        <span ref={bar} className="block h-full origin-left scale-x-0 rounded-full bg-primary" />
      </span>
      <p className="text-sm tabular-nums">{status}</p>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        className={cn(
          "inline-flex items-center gap-1.5 self-start text-muted-foreground text-sm transition-[color,opacity] hover:text-foreground",
          started ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        tabIndex={started ? 0 : -1}
      >
        <ArrowUpIcon aria-hidden="true" className="size-3.5" />
        Back to top
      </button>
    </div>
  );
}
