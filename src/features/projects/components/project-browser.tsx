"use client";

import { type ReactNode, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/features/projects/industries";
import type { ProjectIndustry } from "@/features/projects/types";
import { cn } from "@/lib/utils";

/** A card rendered on the server, with what the tabs filter it by. */
export type BrowserItem = { slug: string; industry: ProjectIndustry; card: ReactNode };

type Filter = ProjectIndustry | "all";

/**
 * The industry tabs on /projects over the spotlight card and the grid. The cards come in already
 * rendered, so only the filtering runs in the browser. Switching tabs fades the grid in again.
 */
export function ProjectBrowser({
  spotlight,
  tiles,
}: {
  spotlight?: BrowserItem;
  tiles: BrowserItem[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const items = spotlight ? [spotlight, ...tiles] : tiles;
  const shown = (item: BrowserItem) => filter === "all" || item.industry === filter;

  const tabs = [
    { id: "all" as Filter, label: "All projects", dot: undefined, count: items.length },
    ...Object.entries(industries).map(([id, { label, dot }]) => ({
      id: id as Filter,
      label,
      dot,
      count: items.filter((item) => item.industry === id).length,
    })),
  ].filter((tab) => tab.count > 0);

  return (
    <>
      <div className="flex items-center justify-between gap-6 border-border border-b">
        {/* min-w-0: a fieldset is never narrower than its content otherwise, and the row would not scroll. */}
        <fieldset className="mask-r-from-85% sm:mask-none scrollbar-none -mb-px flex min-w-0 gap-6 overflow-x-auto">
          <legend className="sr-only">Filter projects by industry</legend>
          {tabs.map((tab) => {
            const active = tab.id === filter;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 text-sm transition-colors",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.dot && (
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", tab.dot)} />
                )}
                {tab.label}
                <span className={cn("font-mono text-xs", active && "text-primary")}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </fieldset>
        <p className="hidden shrink-0 text-muted-foreground text-sm sm:block">Newest first</p>
      </div>

      {spotlight && shown(spotlight) && <div className="mt-10">{spotlight.card}</div>}
      <Reveal
        key={filter}
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          spotlight && shown(spotlight) ? "mt-6" : "mt-10",
        )}
        stagger={0.08}
        y={24}
      >
        {tiles.filter(shown).map((tile) => (
          <div key={tile.slug}>{tile.card}</div>
        ))}
      </Reveal>
    </>
  );
}
