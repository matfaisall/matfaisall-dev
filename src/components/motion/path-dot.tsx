"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PathDotProps = {
  /** The SVG path to follow, in the coordinates of the `<svg>` the dot is rendered in. */
  path: string;
  /** Seconds per lap. */
  duration?: number;
  /** Radius in the SVG's units. */
  radius?: number;
  /** Fill it, e.g. `fill-primary`. */
  className?: string;
};

/**
 * A dot travelling along an SVG path on a loop, for illustrations. Render it inside the `<svg>`
 * that draws the path. Only with full motion, and paused while it's off screen.
 */
export function PathDot({ path, duration = 2.4, radius = 4, className }: PathDotProps) {
  const ref = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.to(el, {
          motionPath: { path },
          duration,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      });
    },
    { scope: ref, dependencies: [path, duration], revertOnUpdate: true },
  );

  return <circle ref={ref} r={radius} className={cn("invisible", className)} />;
}
