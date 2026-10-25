"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/features/blog/types";
import { cn } from "@/lib/utils";

/**
 * "On this page": the post's h2 and h3 headings as links, the one you're reading marked with an
 * amber line. The list renders on the server; only the marker needs the browser.
 */
export function TableOfContents({
  items,
  label = true,
}: {
  items: TocItem[];
  /** Hide the "On this page" title, e.g. inside a disclosure that already says it. */
  label?: boolean;
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    if (headings.length === 0) return;

    // A heading counts as current once it passes the top quarter of the screen, under the header.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -75% 0px" },
    );
    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      {label && (
        <p className="mb-3 font-mono text-muted-foreground text-xs uppercase tracking-wider">
          On this page
        </p>
      )}
      <ul className="flex flex-col border-border border-l text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 leading-snug transition-colors",
                item.depth === 3 ? "pl-7" : "pl-4",
                item.id === active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
