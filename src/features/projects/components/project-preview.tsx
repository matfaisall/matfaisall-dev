import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

const layouts = ["dashboard", "landing", "docs"] as const;
type Layout = (typeof layouts)[number];

/** Same slug, same layout: a tiny stable hash so each project keeps its look between builds. */
function layoutFor(slug: string): Layout {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return layouts[hash % layouts.length];
}

const bar = "rounded-full bg-muted";

function Dashboard() {
  return (
    <div className="grid h-full grid-cols-[3.5rem_1fr] gap-3">
      <div className="flex flex-col gap-2">
        <span className={cn(bar, "h-2 w-full bg-primary/70")} />
        <span className={cn(bar, "h-2 w-4/5")} />
        <span className={cn(bar, "h-2 w-3/5")} />
        <span className={cn(bar, "h-2 w-4/5")} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {["w-2/3", "w-1/2", "w-3/4"].map((width) => (
            <div key={width} className="flex flex-col gap-1.5 rounded-md border border-border p-2">
              <span className={cn(bar, "h-1.5 w-1/2")} />
              <span className={cn(bar, "h-2.5 bg-foreground/25", width)} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-md border border-border p-2">
          {[40, 65, 50, 80, 55, 90, 70, 100, 60, 85].map((height, index) => (
            <span
              key={height}
              className={cn("flex-1 rounded-sm", index === 7 ? "bg-primary" : "bg-muted")}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex h-full flex-col items-center gap-3 pt-3">
      <span className={cn(bar, "h-1.5 w-16 bg-primary/30")} />
      <span className={cn(bar, "h-3.5 w-3/4 bg-foreground/25")} />
      <span className={cn(bar, "h-3.5 w-1/2 bg-foreground/25")} />
      <span className={cn(bar, "h-2 w-2/3")} />
      <div className="mt-1 flex gap-2">
        <span className="h-5 w-16 rounded-md bg-primary" />
        <span className="h-5 w-16 rounded-md border border-border" />
      </div>
      <div className="mt-2 w-full flex-1 rounded-t-md border border-border bg-muted/50" />
    </div>
  );
}

function Docs() {
  return (
    <div className="grid h-full grid-cols-[4rem_1fr] gap-4">
      <div className="flex flex-col gap-2">
        <span className={cn(bar, "h-1.5 w-1/2")} />
        <span className={cn(bar, "h-2 w-full bg-primary/70")} />
        <span className={cn(bar, "h-2 w-4/5")} />
        <span className={cn(bar, "h-2 w-full")} />
        <span className={cn(bar, "h-2 w-3/5")} />
      </div>
      <div className="flex flex-col gap-2">
        <span className={cn(bar, "h-3 w-2/3 bg-foreground/25")} />
        <span className={cn(bar, "h-2 w-full")} />
        <span className={cn(bar, "h-2 w-5/6")} />
        <div className="mt-1 flex flex-1 flex-col gap-1.5 rounded-md border border-border bg-muted/40 p-2">
          <span className={cn(bar, "h-1.5 w-1/2 bg-primary/60")} />
          <span className={cn(bar, "h-1.5 w-3/4 bg-foreground/15")} />
          <span className={cn(bar, "h-1.5 w-2/3 bg-foreground/15")} />
        </div>
      </div>
    </div>
  );
}

const screens: Record<Layout, ComponentType> = {
  dashboard: Dashboard,
  landing: Landing,
  docs: Docs,
};

/**
 * Placeholder artwork for a project card: a mini browser window with a skeleton UI. Swap it for a
 * real screenshot once the project has one.
 */
export function ProjectPreview({ slug, title }: { slug: string; title: string }) {
  const Screen = screens[layoutFor(slug)];

  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <div className="mask-b-from-10% mask-b-to-90% absolute inset-0 bg-grid" />
      <div className="absolute inset-x-8 top-8 -bottom-6 flex flex-col overflow-hidden rounded-t-lg border border-border bg-background shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1.5 dark:shadow-black/40">
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-border border-b px-3">
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="mx-auto truncate rounded-sm bg-muted px-6 py-0.5 font-mono text-[9px] text-muted-foreground">
            {title}
          </span>
        </div>
        <div className="flex-1 p-4">
          <Screen />
        </div>
      </div>
    </div>
  );
}
