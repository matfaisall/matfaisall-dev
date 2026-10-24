"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Tech } from "@/features/about/types";
import { cn } from "@/lib/utils";

/** Tiles on screen at once: two rows of four. */
const SLOTS = 8;
/** Columns on wide screens; the swap staggers diagonally across them. */
const COLUMNS = 4;
/** How long a set of tools stays put before the next set swaps in (ms). */
const REST = 5000;
/** Delay between neighbouring tiles, so a swap runs across the grid like a wave (ms). */
const STAGGER = 55;
/** Time to fade a set out: the 500ms transition plus the last tile's stagger, rounded up (ms). */
const FADE_OUT = 750;

/**
 * Eight tool tiles that swap to the next eight every few seconds, the way Mintlify's customer logo
 * grid does: each tile drops a few pixels and fades out, then the next tool rises into place, in a
 * diagonal wave. Every tile links to the tool's docs in a new tab.
 *
 * It holds still while a mouse is over it or a tile has keyboard focus (so a tile never changes
 * under the cursor), while it's off screen and while the tab is hidden. Focus left behind by a click
 * or tap doesn't count: browsers keep it on the link after opening the docs, and the grid would stay
 * paused until the visitor clicked somewhere else.
 */
export function TechGrid({ stack }: { stack: Tech[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const rotates = stack.length > SLOTS;
  const paused = hovered || focused || !onScreen || !tabVisible;

  useEffect(() => {
    const list = ref.current;
    if (!list || !rotates) return;
    // One callback can carry several entries for the list, oldest first (e.g. after a fast jump
    // down the page). Only the latest says where it is now.
    const observer = new IntersectionObserver((entries) =>
      setOnScreen(!!entries.at(-1)?.isIntersecting),
    );
    observer.observe(list);
    const onVisibilityChange = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [rotates]);

  // Rest, fade out, swap in the next eight, repeat.
  useEffect(() => {
    if (!rotates || paused) return;
    let timer = 0;
    const rest = () => {
      timer = window.setTimeout(fadeOut, REST);
    };
    const fadeOut = () => {
      setSwapping(true);
      timer = window.setTimeout(swap, FADE_OUT);
    };
    const swap = () => {
      setOffset((current) => (current + SLOTS) % stack.length);
      setSwapping(false);
      rest();
    };
    rest();
    return () => {
      window.clearTimeout(timer);
      // Paused halfway through a swap: bring the current tools back instead of leaving tiles blank.
      setSwapping(false);
    };
  }, [rotates, paused, stack.length]);

  // Warm the cache with the next set's icons, so they're there the moment they swap in.
  useEffect(() => {
    if (!rotates || !onScreen) return;
    for (let slot = 0; slot < SLOTS; slot++) {
      const image = new window.Image();
      image.src = stack[(offset + SLOTS + slot) % stack.length].icon;
    }
  }, [rotates, onScreen, offset, stack]);

  const visible = rotates
    ? Array.from({ length: SLOTS }, (_, slot) => stack[(offset + slot) % stack.length])
    : stack;

  return (
    <ul
      ref={ref}
      // Touch has no hover, and a tap would otherwise count as one.
      onPointerEnter={(event) => setHovered(event.pointerType === "mouse")}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      className="grid grid-cols-2 gap-3 border-border border-t p-3 sm:grid-cols-4 md:border-t-0 md:border-l"
    >
      {visible.map((tech, slot) => (
        // Keyed by position: the tile stays put and only its contents swap.
        // biome-ignore lint/suspicious/noArrayIndexKey: the slot is the identity here.
        <li key={slot}>
          <a
            href={tech.docs}
            target="_blank"
            rel="noreferrer"
            className="group relative flex aspect-3/2 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30 outline-none transition-colors hover:border-foreground/20 hover:bg-muted/60 focus-visible:border-primary sm:aspect-square"
          >
            <span
              className={cn(
                "flex flex-col items-center gap-3 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0,0,0,1)] motion-reduce:translate-y-0",
                swapping ? "translate-y-1.5 opacity-0" : "translate-y-0 opacity-100",
              )}
              style={{
                transitionDelay: `${((slot % COLUMNS) + Math.floor(slot / COLUMNS)) * STAGGER}ms`,
              }}
            >
              <Image
                src={tech.icon}
                alt=""
                width={40}
                height={40}
                // Already a hand-sized WebP of a couple of KB; resizing it again gains nothing.
                unoptimized
                className={cn(
                  "size-10 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none",
                  tech.invertInDark && "dark:invert",
                )}
              />
              <span className="font-medium text-muted-foreground text-sm transition-colors group-hover:text-foreground">
                {tech.name}
                <span className="sr-only"> documentation (opens in a new tab)</span>
              </span>
            </span>
            <ArrowUpRightIcon
              aria-hidden="true"
              className="motion-reduce:translate-0 absolute top-3 right-3 size-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
