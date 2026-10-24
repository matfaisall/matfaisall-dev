import { RibbonCanvas, type RibbonSettings } from "@/components/motion/ribbon-canvas";
import { cn } from "@/lib/utils";

// Amber versions of the ribbon gradient: deeper on light so the lines hold up on white, brighter
// on dark. Canvas can't read CSS variables, so keep these in step with --primary in globals.css.
const lightRibbon: Partial<RibbonSettings> = { colorStart: "#c2410c", colorEnd: "#f59e0b" };
const darkRibbon: Partial<RibbonSettings> = { colorStart: "#f97316", colorEnd: "#fcd34d" };

/**
 * RibbonCanvas in the brand colours of the current theme. One canvas per theme, and CSS shows one:
 * the hidden canvas has no size, so it never draws or animates until the theme switches to it.
 * Position and fade it from the outside, e.g. `absolute inset-0 mask-l-from-40%`.
 */
export function BrandRibbon({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <RibbonCanvas settings={lightRibbon} className="block size-full dark:hidden" />
      <RibbonCanvas settings={darkRibbon} className="hidden size-full dark:block" />
    </div>
  );
}
