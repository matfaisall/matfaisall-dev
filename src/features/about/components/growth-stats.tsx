import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Wipe } from "@/components/motion/wipe";
import { GrowthComet } from "@/features/about/components/growth-comet";
import type { Milestone } from "@/features/about/types";
import { cn } from "@/lib/utils";

type Stat = {
  /** Shown large: a year, a count, a percentage. */
  value: string;
  label: string;
};

// The chart is drawn in a 1000 × 600 box stretched over the whole band, so every x is a
// per-mille of the band's width and every y a per-six-hundred of its height.
const WIDTH = 1000;
const HEIGHT = 600;
const BASELINE = 560;
const STEEPNESS = 3;

/** y of a growth curve `height` tall at t ∈ [0, 1]: flat on the left, rising faster and faster. */
function rise(t: number, height: number) {
  return BASELINE - (height * (Math.exp(STEEPNESS * t) - 1)) / (Math.exp(STEEPNESS) - 1);
}

function curve(height: number) {
  const points = Array.from({ length: 81 }, (_, index) => {
    const t = index / 80;
    return `${(t * WIDTH).toFixed(1)} ${rise(t, height).toFixed(1)}`;
  });
  return `M${points.join(" L")}`;
}

const MAIN_HEIGHT = 500;
const mainCurve = curve(MAIN_HEIGHT);
// Steeper curves fanning out above the main one, drawn as dots and running off the top.
const fanCurves = [700, 920, 1180].map(curve);

// Columns of dots hanging under the curve, denser to the right, like a bar chart in dot matrix.
const bars = Array.from({ length: 24 }, (_, index) => {
  const t = (index + 0.5) / 24;
  const top = rise(t, MAIN_HEIGHT) + 18;
  const depth = Math.min(70 + ((index * 7) % 5) * 26, HEIGHT - top);
  return {
    left: `${t * 100}%`,
    top: `${(top / HEIGHT) * 100}%`,
    height: `${(depth / HEIGHT) * 100}%`,
    opacity: 0.15 + 0.5 * t,
  };
});

const dotMatrix: CSSProperties = {
  backgroundImage: "radial-gradient(currentColor 1px, transparent 1.5px)",
  backgroundSize: "6px 6px",
};

// Where the milestones sit along the curve, as fractions of the width.
const FIRST_MILESTONE = 0.36;
const LAST_MILESTONE = 0.92;

/**
 * Where a milestone's label sits around its node. Labels alternate above and below the line so
 * neighbours don't collide; the last one sits up and to the left, so it never runs off the edge.
 */
function labelPosition(index: number, isLast: boolean) {
  if (isLast) return "right-3 bottom-3";
  return cn("left-0 -translate-x-1/2", index % 2 === 0 ? "bottom-3.5" : "top-3.5");
}

function GrowthChart({ milestones }: { milestones: Milestone[] }) {
  const step =
    milestones.length > 1 ? (LAST_MILESTONE - FIRST_MILESTONE) / (milestones.length - 1) : 0;

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        fill="none"
        className="mask-x-from-90% mask-t-from-75% absolute inset-0 size-full text-primary"
      >
        <defs>
          <linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${mainCurve} L${WIDTH} ${HEIGHT} L0 ${HEIGHT}Z`} fill="url(#growth-area)" />
        {fanCurves.map((d, index) => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.01 7"
            strokeOpacity={0.55 - index * 0.12}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={mainCurve}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <GrowthComet d={mainCurve} />
      </svg>

      {bars.map((bar) => (
        <span
          key={bar.left}
          className="mask-b-from-10% absolute w-2 -translate-x-1/2 text-primary md:w-5"
          style={{ ...dotMatrix, ...bar }}
        />
      ))}

      <ol>
        {milestones.map((milestone, index) => {
          const t = FIRST_MILESTONE + step * index;
          const isLast = index === milestones.length - 1;
          return (
            <li
              key={milestone.date}
              className="absolute"
              style={{ left: `${t * 100}%`, top: `${(rise(t, MAIN_HEIGHT) / HEIGHT) * 100}%` }}
            >
              <span
                className={cn(
                  "-translate-1/2 absolute size-3 rounded-full border-2 border-primary",
                  isLast ? "bg-primary" : "bg-background",
                )}
              />
              {isLast && (
                <span className="-translate-1/2 absolute size-3 animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
              )}
              <span
                className={cn(
                  "absolute hidden items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs shadow-sm lg:flex",
                  labelPosition(index, isLast),
                )}
              >
                <time dateTime={milestone.date} className="font-mono text-primary">
                  {milestone.date.slice(0, 4)}
                </time>
                {milestone.label}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}

/**
 * Big numbers over an amber growth curve, after Mintlify's "Built to scale" band: a solid curve
 * with dotted ones fanning out above it, columns of dots underneath and your milestones along the
 * line. The chart draws itself in from the left. Made for `<Section bleed>`.
 */
export function GrowthStats({ stats, milestones }: { stats: Stat[]; milestones: Milestone[] }) {
  return (
    <div className="relative isolate overflow-hidden">
      <Wipe
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-1 h-64 md:h-120 lg:h-150"
      >
        <GrowthChart milestones={milestones} />
      </Wipe>
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-72 md:px-12 md:pt-16 md:pb-80">
        <Reveal>
          <dl className="grid max-w-xl grid-cols-2 gap-x-10 gap-y-10 md:gap-x-16 md:gap-y-14">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="text-muted-foreground text-sm md:text-base">{stat.label}</dt>
                <dd className="font-medium text-4xl tabular-nums tracking-tight md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}
