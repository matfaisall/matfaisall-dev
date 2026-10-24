"use client";

import { type ReactNode, useRef } from "react";
import {
  DURATION,
  EASE,
  FULL_MOTION,
  gsap,
  SCROLL_START,
  SplitText,
  STAGGER,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** Text, optionally with inline elements such as an accent `<em>`: SplitText keeps them. */
  children: ReactNode;
  /** HTML element to render. Use the right heading level for SEO, not the one that looks right. */
  as?: "h1" | "h2" | "h3" | "p";
  /** "load" animates right away (above the fold), "scroll" when the text enters the viewport. */
  trigger?: "load" | "scroll";
  /** For a heading other elements point at, e.g. with `aria-labelledby`. */
  id?: string;
  className?: string;
};

/** Slides text up word by word from behind a line mask. For headings and short statements. */
export function TextReveal({
  children,
  as: Tag = "h2",
  trigger = "scroll",
  id,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          // Re-split on resize or font load so lines always match the layout.
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: DURATION.slow,
              ease: EASE.expo,
              stagger: STAGGER.tight,
              scrollTrigger:
                trigger === "scroll" ? { trigger: el, start: SCROLL_START, once: true } : undefined,
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [children, trigger], revertOnUpdate: true },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      data-animate
      // Line masks clip descenders (g, p, y); a little padding keeps them visible.
      className={cn("*:mb-[-0.15em] *:pb-[0.15em]", className)}
    >
      {children}
    </Tag>
  );
}
