import {
  CheckIcon,
  CursorIcon,
  GitPullRequestIcon,
  LightningIcon,
} from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";
import type { Experience } from "@/features/about/types";
import { cn } from "@/lib/utils";

const bar = "block rounded-full bg-muted";
const panel = "rounded-lg border border-border bg-background/95 shadow-sm";

/** A Mintlify-style cursor with a name tag, for showing someone at work in an illustration. */
export function CursorTag({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("absolute flex items-start gap-0.5", className)}>
      <CursorIcon weight="fill" className="size-3.5 text-primary" />
      <span className="mt-2.5 rounded-sm bg-primary px-1 py-0.5 font-medium text-[10px] text-primary-foreground leading-none">
        {name}
      </span>
    </span>
  );
}

/** Thin lines sweeping through an illustration behind its panels, one of them amber. */
export function FlowLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      fill="none"
      className={cn("mask-x-from-70% absolute inset-0 size-full", className)}
    >
      <path d="M-10 250 C120 240 200 120 410 90" className="stroke-border" />
      <path d="M-10 270 C140 262 230 160 410 140" className="stroke-primary/50" />
      <path d="M-10 290 C150 286 260 200 410 190" className="stroke-border" />
    </svg>
  );
}

const columns = [
  { title: "To do", cards: ["w-4/5", "w-3/5"] },
  { title: "Doing", cards: ["w-2/3"] },
  { title: "Done", cards: ["w-3/4", "w-1/2"] },
];

/** The current job: a sprint board with a card being dragged into progress. */
function SprintVisual() {
  return (
    <div className={cn(panel, "absolute inset-x-6 top-1/2 -translate-y-1/2 p-3")}>
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>Sprint board</span>
        <span className="rounded-sm bg-primary/10 px-1 text-primary">this week</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-1.5 rounded-md bg-muted/40 p-1.5">
            <span className="font-mono text-[9px] text-muted-foreground">{column.title}</span>
            {column.cards.map((width) => (
              <span
                key={width}
                className="flex flex-col gap-1 rounded-sm border border-border bg-background p-1.5"
              >
                <span className={cn(bar, "h-1.5", width)} />
                <span className="flex items-center justify-between">
                  <span className={cn(bar, "h-1 w-1/3")} />
                  {column.title === "Done" && (
                    <CheckIcon weight="bold" className="size-2.5 text-primary" />
                  )}
                </span>
              </span>
            ))}
            {column.title === "Doing" && (
              <span className="relative flex -rotate-3 flex-col gap-1 rounded-sm border border-primary/60 bg-background p-1.5 shadow-lg">
                <span className="h-1 w-6 rounded-full bg-primary" />
                <span className={cn(bar, "h-1.5 w-4/5")} />
                <span className={cn(bar, "h-1 w-1/2")} />
                <CursorTag name="Faisal" className="-right-6 -bottom-5" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const diff = [
  { sign: " ", width: "w-3/5" },
  { sign: "-", width: "w-1/2" },
  { sign: "+", width: "w-4/5" },
  { sign: "+", width: "w-2/3" },
  { sign: " ", width: "w-2/5" },
  { sign: "+", width: "w-3/4" },
];

/** Remote work: a pull request diff with a reviewer's approval floating over it. */
function ReviewVisual() {
  return (
    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
      <div className={cn(panel, "overflow-hidden")}>
        <div className="flex items-center gap-1.5 border-border border-b px-3 py-2 font-mono text-[10px]">
          <GitPullRequestIcon className="size-3 text-primary" />
          <span className="truncate">feat: responsive hero</span>
          <span className="ml-auto text-primary">+42</span>
          <span className="text-muted-foreground">−7</span>
        </div>
        <div className="flex flex-col py-1.5 font-mono text-[9px]">
          {diff.map((line, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed illustration that never reorders.
              key={index}
              className={cn(
                "flex items-center gap-2 px-3 py-0.75",
                line.sign === "+" && "bg-primary/10",
                line.sign === "-" && "bg-muted/60",
              )}
            >
              <span className="w-3 text-muted-foreground tabular-nums">{index + 12}</span>
              <span className={line.sign === "+" ? "text-primary" : "text-muted-foreground"}>
                {line.sign}
              </span>
              <span
                className={cn(
                  "h-1.5 rounded-full",
                  line.width,
                  line.sign === "+" ? "bg-primary/40" : "bg-muted",
                )}
              />
            </span>
          ))}
        </div>
      </div>
      <div
        className={cn(
          panel,
          "absolute -right-2 -bottom-10 flex w-44 flex-col gap-2 p-2.5 shadow-lg",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-4 rounded-full bg-linear-to-br from-primary/70 to-muted" />
          <span className={cn(bar, "h-1.5 w-16")} />
        </div>
        <span className={cn(bar, "h-1.5 w-full")} />
        <span className="inline-flex items-center gap-1 self-start rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary">
          <CheckIcon weight="bold" className="size-2.5" />
          Approved
        </span>
      </div>
    </div>
  );
}

const steps = [
  { label: "Applicant", state: "done" },
  { label: "Documents", state: "done" },
  { label: "Scoring", state: "active" },
  { label: "Approval", state: "todo" },
] as const;

/** Enterprise apps: a loan application moving through its stages, and the load-time win. */
function PipelineVisual() {
  return (
    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
      <div className={cn(panel, "p-3 pr-16")}>
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>Loan application</span>
          <span>LOS</span>
        </div>
        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <li key={step.label} className="relative flex items-center gap-2.5 pb-3 last:pb-0">
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "absolute top-4 bottom-0 left-1.75 w-px",
                    step.state === "done" ? "bg-primary" : "bg-border",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative grid size-3.75 shrink-0 place-items-center rounded-full border",
                  step.state === "done" && "border-primary bg-primary text-primary-foreground",
                  step.state === "active" && "border-primary bg-background ring-3 ring-primary/20",
                  step.state === "todo" && "border-border bg-background",
                )}
              >
                {step.state === "done" && <CheckIcon weight="bold" className="size-2" />}
                {step.state === "active" && <span className="size-1.5 rounded-full bg-primary" />}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px]",
                  step.state === "todo" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </span>
              <span className={cn(bar, "ml-auto h-1.5 w-10")} />
            </li>
          ))}
        </ol>
      </div>
      <div className={cn(panel, "absolute -right-2 -bottom-8 w-40 p-2.5 shadow-lg")}>
        <div className="mb-2 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
          <span>Load time</span>
          <span className="inline-flex items-center gap-0.5 text-primary">
            <LightningIcon weight="fill" className="size-2.5" />
            −40%
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="h-2 w-full rounded-full bg-muted" />
          <span className="h-2 w-3/5 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

const visuals: Record<NonNullable<Experience["visual"]>, ComponentType> = {
  sprint: SprintVisual,
  review: ReviewVisual,
  pipeline: PipelineVisual,
};

/** The illustration panel of an experience card: dots, flowing lines and the role's own visual. */
export function ExperienceVisual({ visual }: { visual: NonNullable<Experience["visual"]> }) {
  const Visual = visuals[visual];
  return (
    <>
      <div className="mask-radial-from-20% mask-radial-to-80% absolute inset-0 bg-dots" />
      <FlowLines />
      <Visual />
    </>
  );
}
