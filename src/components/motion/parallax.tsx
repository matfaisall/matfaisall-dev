"use client";

import { type ComponentProps, useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

type ParallaxProps = ComponentProps<"div"> & {
  /**
   * How far the content drifts while it scrolls through the viewport, as a share of its height.
   * Positive moves up (feels closer), negative moves down (feels further away).
   */
  speed?: number;
};

/** Moves its content at a different speed than the page while scrolling. For images and decoration. */
export function Parallax({ speed = 0.2, children, ...props }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.fromTo(
          el,
          { yPercent: speed * 50 },
          {
            yPercent: speed * -50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [speed], revertOnUpdate: true },
  );

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
