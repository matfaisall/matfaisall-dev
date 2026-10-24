import { CheckIcon } from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Capability } from "@/features/about/types";

const waterfall = [
  { name: "document", start: 0, width: 20, accent: true },
  { name: "styles.css", start: 16, width: 14 },
  { name: "app.js", start: 18, width: 30 },
  { name: "inter.woff2", start: 22, width: 16 },
  { name: "hero.avif", start: 26, width: 30, accent: true },
];

function PerformanceVisual() {
  return (
    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-lg border border-border bg-background/90 p-4 shadow-sm">
      <div className="mb-3 flex justify-between font-mono text-[10px] text-muted-foreground">
        <span>Network</span>
        <span>Waterfall</span>
      </div>
      <div className="relative flex flex-col gap-2">
        {waterfall.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[4.5rem_1fr] items-center gap-2 font-mono text-[10px]"
          >
            <span className="truncate text-muted-foreground">{row.name}</span>
            <span className="relative h-1.5 rounded-full bg-muted">
              <span
                className={
                  row.accent
                    ? "absolute inset-y-0 rounded-full bg-primary"
                    : "absolute inset-y-0 rounded-full bg-foreground/30"
                }
                style={{ left: `${row.start}%`, width: `${row.width}%` }}
              />
            </span>
          </div>
        ))}
        {/* Marks the end of hero.avif: 5rem label column + 56% of the remaining track. */}
        <span className="absolute inset-y-0 left-[calc(2.2rem+56%)] border-primary border-l border-dashed">
          <span className="absolute -top-5 -translate-x-1/2 rounded-sm bg-primary px-1 font-mono text-[9px] text-primary-foreground">
            LCP
          </span>
        </span>
      </div>
    </div>
  );
}

// power3.out (the site's default entrance ease) as a cubic Bézier, drawn in a 160×100 box.
const curve = "M20 120 C54.4 59 76.8 20 180 20";

function MotionVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <svg aria-hidden="true" viewBox="0 0 200 140" className="h-36 w-52" fill="none">
        <rect x="20" y="20" width="160" height="100" className="stroke-border" />
        <path d="M20 120 L180 20" className="stroke-muted-foreground/40" strokeDasharray="3 4" />
        <path d="M20 120 L54.4 59 M180 20 L76.8 20" className="stroke-muted-foreground/60" />
        <path d={curve} className="stroke-primary" strokeWidth="2" />
        <circle cx="54.4" cy="59" r="3" className="fill-background stroke-primary" />
        <circle cx="76.8" cy="20" r="3" className="fill-background stroke-primary" />
        <circle r="4" className="fill-primary motion-reduce:hidden">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={curve} />
        </circle>
      </svg>
      <div className="flex gap-2 font-mono text-[10px]">
        <span className="rounded-sm border border-border bg-background px-1.5 py-0.5 text-muted-foreground">
          ease: <span className="text-primary">power3.out</span>
        </span>
        <span className="rounded-sm border border-border bg-background px-1.5 py-0.5 text-muted-foreground">
          0.8s
        </span>
      </div>
    </div>
  );
}

function AccessibilityVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-foreground px-3 py-1.5 font-medium text-background text-xs ring-2 ring-primary ring-offset-2 ring-offset-background">
          Send message
        </span>
        <kbd className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shadow-[0_1px_0_var(--border)]">
          Tab ⇥
        </kbd>
      </div>
      <ul className="flex w-52 flex-col gap-2 rounded-lg border border-border bg-background/90 p-3 text-xs shadow-sm">
        {["Keyboard reachable", "Contrast AA", "Labelled for screen readers"].map((check) => (
          <li key={check} className="flex items-center gap-2">
            <CheckIcon weight="bold" className="size-3.5 shrink-0 text-primary" />
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}

const visuals: Record<Capability["visual"], ComponentType> = {
  performance: PerformanceVisual,
  motion: MotionVisual,
  accessibility: AccessibilityVisual,
};

/** Bento cards, one per capability, each with a small illustration on top. */
export function Capabilities({ capabilities }: { capabilities: Capability[] }) {
  return (
    <Reveal className="grid gap-4 md:grid-cols-3">
      {capabilities.map((item) => {
        const Visual = visuals[item.visual];
        return (
          <article
            key={item.title}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-muted/20"
          >
            <div
              aria-hidden="true"
              className="relative h-60 overflow-hidden border-border border-b"
            >
              <div className="mask-radial-from-20% mask-radial-to-80% absolute inset-0 bg-dots" />
              <Visual />
            </div>
            <div className="flex flex-col gap-2 p-6">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
            </div>
          </article>
        );
      })}
    </Reveal>
  );
}
