"use client";

import { type ComponentProps, useRef } from "react";
import { DURATION, EASE, FULL_MOTION, gsap, SCROLL_START, useGSAP } from "@/lib/gsap";

type WipeProps = ComponentProps<"div"> & {
  /** Seconds the sweep takes from the left edge to the right. */
  duration?: number;
};

/**
 * Uncovers its content from left to right when it scrolls into view, like a chart line being
 * drawn. Server Components can wrap an SVG or a whole illustration with it.
 */
export function Wipe({ duration = DURATION.slow * 2, children, ...props }: WipeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration,
            ease: EASE.inOut,
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [duration], revertOnUpdate: true },
  );

  return (
    <div ref={ref} data-animate {...props}>
      {children}
    </div>
  );
}
