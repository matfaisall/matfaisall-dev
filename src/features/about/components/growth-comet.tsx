"use client";

import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

// Dash lengths as shares of the curve (each path has pathLength="1"): a long faint tail and a
// short bright head riding at its front.
const TAIL = 0.1;
const HEAD = 0.012;
const LAP = 6;

/**
 * A comet running up a growth curve on a loop, drawn as two dashes travelling along `d`. Only with
 * full motion, and paused while it's off screen. Render it inside the chart's `<svg>`.
 */
export function GrowthComet({ d }: { d: string }) {
  const ref = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const [tail, head] = el?.querySelectorAll("path") ?? [];
      if (!el || !tail || !head) return;

      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 });
        // The dashes start just before the curve and leave just past its end, so a lap has no jump.
        gsap
          .timeline({
            repeat: -1,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          })
          .fromTo(
            tail,
            { attr: { "stroke-dashoffset": TAIL } },
            { attr: { "stroke-dashoffset": -1 }, duration: LAP, ease: "none" },
          )
          .fromTo(
            head,
            { attr: { "stroke-dashoffset": HEAD } },
            { attr: { "stroke-dashoffset": HEAD - TAIL - 1 }, duration: LAP, ease: "none" },
            0,
          );
      });
    },
    { scope: ref, dependencies: [d], revertOnUpdate: true },
  );

  return (
    <g ref={ref} className="invisible" strokeLinecap="round">
      <path
        d={d}
        pathLength="1"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.45"
        strokeDasharray={`${TAIL} 1.2`}
        strokeDashoffset={TAIL}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        pathLength="1"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={`${HEAD} 1.2`}
        strokeDashoffset={HEAD}
        vectorEffect="non-scaling-stroke"
        className="drop-shadow-[0_0_6px_currentColor]"
      />
    </g>
  );
}
