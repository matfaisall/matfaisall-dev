"use client";

import { type ComponentProps, useRef } from "react";
import { DURATION, EASE, FULL_MOTION, gsap, SCROLL_START, STAGGER, useGSAP } from "@/lib/gsap";

type RevealProps = ComponentProps<"div"> & {
  /** Seconds between each direct child's entrance. */
  stagger?: number;
  /** Vertical distance (px) the content travels in from. */
  y?: number;
};

/**
 * Fades its direct children up into view when the block scrolls into the viewport.
 * Server Components can wrap content with it to get scroll animations for free.
 */
export function Reveal({ stagger = STAGGER.base, y = 40, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(el.children, {
          autoAlpha: 0,
          y,
          duration: DURATION.base,
          ease: EASE.out,
          stagger,
          scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
        });
      });
    },
    { scope: ref, dependencies: [stagger, y], revertOnUpdate: true },
  );

  return (
    <div ref={ref} data-animate {...props}>
      {children}
    </div>
  );
}
