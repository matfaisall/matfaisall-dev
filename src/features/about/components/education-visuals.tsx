import type { ComponentType } from "react";
import { CursorTag } from "@/components/ui/cursor-tag";
import type { Education } from "@/features/about/types";
import { cn } from "@/lib/utils";

// A binary search tree in a 240 × 120 box; the highlighted path is one lookup.
const nodes = [
  { id: "root", x: 120, y: 16, path: true },
  { id: "l", x: 64, y: 58 },
  { id: "r", x: 176, y: 58, path: true },
  { id: "ll", x: 36, y: 100 },
  { id: "lr", x: 92, y: 100 },
  { id: "rl", x: 148, y: 100, path: true },
  { id: "rr", x: 204, y: 100 },
];
const edges = [
  ["root", "l"],
  ["root", "r"],
  ["l", "ll"],
  ["l", "lr"],
  ["r", "rl"],
  ["r", "rr"],
];
const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

/** The degree: a search tree with one lookup lit up. */
function GraphVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg aria-hidden="true" viewBox="0 0 240 120" fill="none" className="h-30 w-60">
        {edges.map(([from, to]) => {
          const a = byId[from];
          const b = byId[to];
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={a.path && b.path ? "stroke-primary" : "stroke-border"}
              strokeWidth={a.path && b.path ? 1.5 : 1}
            />
          );
        })}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="7"
            className={node.path ? "fill-primary stroke-primary" : "fill-background stroke-border"}
          />
        ))}
      </svg>
      <span className="absolute right-5 bottom-4 rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        O(<span className="text-primary">log n</span>)
      </span>
    </div>
  );
}

function Component({ name, accent = false }: { name: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-1 font-mono text-[10px] shadow-sm",
        accent
          ? "border-primary/60 bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground",
      )}
    >
      {`<${name} />`}
    </span>
  );
}

/** React: a small component tree, the one being built highlighted. */
function ComponentsVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Component name="App" />
      <span className="h-4 w-px bg-border" />
      <span className="h-px w-36 bg-border" />
      <div className="flex w-52 justify-between">
        {["NoteList", "NoteForm"].map((name) => (
          <div key={name} className="flex flex-col items-center">
            <span className="h-4 w-px bg-border" />
            <Component name={name} accent={name === "NoteForm"} />
          </div>
        ))}
      </div>
      <CursorTag name="You" className="right-[calc(50%-7.5rem)] bottom-6" />
    </div>
  );
}

const stages = ["Empathize", "Define", "Ideate", "Prototype", "Test"];
const CURRENT_STAGE = stages.indexOf("Prototype");

const stageDot = {
  done: "border-primary bg-primary",
  current: "border-primary bg-background ring-3 ring-primary/20",
  next: "border-border bg-background",
};

function stageState(index: number): keyof typeof stageDot {
  if (index < CURRENT_STAGE) return "done";
  if (index === CURRENT_STAGE) return "current";
  return "next";
}

/** Design Thinking: the five stages on one line, prototyping in progress. */
function ProcessVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64">
        <svg
          aria-hidden="true"
          viewBox="0 0 256 40"
          fill="none"
          className="absolute inset-x-0 top-0 h-10 w-full"
        >
          <path
            d="M8 20 C40 4 72 36 104 20 S168 4 200 20 S240 30 248 20"
            className="stroke-border"
            strokeDasharray="3 4"
          />
          <path d="M8 20 C40 4 72 36 104 20 S168 4 200 20" className="stroke-primary" />
        </svg>
        <ol className="relative flex justify-between">
          {stages.map((stage, index) => {
            const state = stageState(index);
            return (
              <li key={stage} className="flex w-0 flex-col items-center gap-2 pt-3.75">
                <span className={cn("size-2.5 shrink-0 rounded-full border-2", stageDot[state])} />
                <span
                  className={cn(
                    "font-mono text-[9px]",
                    state === "next" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {stage}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mx-auto mt-5 flex w-28 flex-col gap-1.5 rounded-md border border-border bg-background p-2 shadow-sm">
          <span className="h-1.5 w-1/2 rounded-full bg-muted" />
          <span className="h-1.5 w-4/5 rounded-full bg-muted" />
          <span className="mt-1 h-3 w-12 rounded-sm bg-primary" />
        </div>
        <CursorTag name="User 07" className="right-10 -bottom-4" />
      </div>
    </div>
  );
}

const visuals: Record<NonNullable<Education["visual"]>, ComponentType> = {
  graph: GraphVisual,
  components: ComponentsVisual,
  process: ProcessVisual,
};

/** The illustration at the top of an education card, over a fading dot pattern. */
export function EducationVisual({ visual }: { visual: NonNullable<Education["visual"]> }) {
  const Visual = visuals[visual];
  return (
    <>
      <div className="mask-radial-from-20% mask-radial-to-80% absolute inset-0 bg-dots" />
      <Visual />
    </>
  );
}
