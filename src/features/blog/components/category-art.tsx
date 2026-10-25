import type { ComponentType } from "react";
import type { CategorySlug } from "@/features/blog/categories";
import { cn } from "@/lib/utils";

// One small illustration per category, drawn in a 320 × 180 box (16:9) so it scales with the card.
// Panels use the background and border colours, details the muted fill, and one accent the amber.

const panel = "fill-background stroke-border";
const bar = "fill-muted";

function FrontendArt() {
  return (
    <>
      <rect x="62" y="28" width="196" height="124" rx="8" className={panel} />
      <path d="M62 46 H258" className="stroke-border" />
      {[74, 84, 94].map((cx) => (
        <circle key={cx} cx={cx} cy="37" r="3" className={bar} />
      ))}
      <rect x="80" y="62" width="72" height="9" rx="4.5" className="fill-foreground/25" />
      <rect x="80" y="78" width="104" height="6" rx="3" className={bar} />
      <rect x="80" y="89" width="84" height="6" rx="3" className={bar} />
      <rect x="80" y="106" width="42" height="15" rx="4" className="fill-primary" />
      <rect x="128" y="106" width="42" height="15" rx="4" className="fill-none stroke-border" />
      <rect x="194" y="60" width="48" height="76" rx="6" className="fill-muted/60" />
      <path d="M150 116 l14 34 4-13 13-4z" className="fill-primary stroke-background" />
    </>
  );
}

function BackendArt() {
  return (
    <>
      {[34, 72, 110].map((y, index) => (
        <g key={y}>
          <rect x="52" y={y} width="104" height="30" rx="6" className={panel} />
          <circle cx="68" cy={y + 15} r="3.5" className={index === 0 ? "fill-primary" : bar} />
          <rect x="80" y={y + 12} width="40" height="6" rx="3" className={bar} />
          <rect x="128" y={y + 12} width="16" height="6" rx="3" className={bar} />
        </g>
      ))}
      <path d="M156 49 C 188 49 186 90 214 90" className="fill-none stroke-primary" />
      <path d="M156 125 C 188 125 186 90 214 90" className="fill-none stroke-border" />
      <circle cx="184" cy="66" r="3.5" className="fill-primary" />
      <rect x="214" y="58" width="58" height="64" rx="6" className={panel} />
      <rect x="226" y="72" width="34" height="6" rx="3" className="fill-foreground/25" />
      <rect x="226" y="84" width="24" height="6" rx="3" className={bar} />
      <rect x="226" y="100" width="34" height="10" rx="3" className="fill-primary/30" />
    </>
  );
}

const nodes = [
  { x: 130, y: 24, accent: true },
  { x: 50, y: 78 },
  { x: 130, y: 78, accent: true },
  { x: 210, y: 78 },
  { x: 90, y: 132 },
  { x: 170, y: 132, accent: true },
];

function ArchitectureArt() {
  return (
    <>
      <path
        d="M160 52 V78 M160 52 V65 H80 V78 M160 65 H240 V78"
        className="fill-none stroke-border"
      />
      <path
        d="M80 106 V119 H120 V132 M240 106 V119 H200 V132"
        className="fill-none stroke-border"
      />
      <path d="M160 52 V78 M160 106 V119 H200 V132" className="fill-none stroke-primary" />
      {nodes.map((node) => (
        <rect
          key={`${node.x}-${node.y}`}
          x={node.x}
          y={node.y}
          width="60"
          height="28"
          rx="6"
          className={node.accent ? "fill-background stroke-primary" : panel}
        />
      ))}
      {nodes.map((node) => (
        <rect
          key={`bar-${node.x}-${node.y}`}
          x={node.x + 12}
          y={node.y + 11}
          width="36"
          height="6"
          rx="3"
          className={node.accent ? "fill-primary/60" : bar}
        />
      ))}
    </>
  );
}

const codeLines = [
  { indent: 0, widths: [28, 52], accent: 0 },
  { indent: 1, widths: [40, 24, 36], accent: 1 },
  { indent: 2, widths: [60, 30] },
  { indent: 2, widths: [34, 46], accent: 0 },
  { indent: 1, widths: [18] },
  { indent: 0, widths: [12] },
];

function LanguagesArt() {
  return (
    <>
      <rect x="58" y="26" width="204" height="128" rx="8" className={panel} />
      <path d="M86 26 V154" className="stroke-border" />
      {codeLines.map((line, row) => {
        const y = 42 + row * 18;
        let x = 98 + line.indent * 14;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed illustration that never reorders.
          <g key={row}>
            <rect x="66" y={y} width="12" height="6" rx="3" className="fill-muted/70" />
            {line.widths.map((width, index) => {
              const rect = (
                <rect
                  key={x}
                  x={x}
                  y={y}
                  width={width}
                  height="6"
                  rx="3"
                  className={
                    index === line.accent
                      ? "fill-primary"
                      : index === 0
                        ? "fill-foreground/30"
                        : bar
                  }
                />
              );
              x += width + 6;
              return rect;
            })}
          </g>
        );
      })}
    </>
  );
}

function ToolingArt() {
  return (
    <>
      <rect x="44" y="34" width="156" height="112" rx="8" className={panel} />
      <path d="M44 52 H200" className="stroke-border" />
      {[56, 66, 76].map((cx) => (
        <circle key={cx} cx={cx} cy="43" r="3" className={bar} />
      ))}
      {[70, 90, 110].map((y, index) => (
        <g key={y}>
          <path d={`M58 ${y - 3} l5 3 -5 3`} className="fill-none stroke-primary" />
          <rect
            x="70"
            y={y - 3}
            width={[86, 60, 74][index]}
            height="6"
            rx="3"
            className={index === 2 ? "fill-primary/40" : bar}
          />
        </g>
      ))}
      <rect x="58" y="126" width="8" height="10" className="fill-primary" />
      <path d="M236 30 V150" className="stroke-border" strokeWidth="2" />
      <path
        d="M236 62 C 236 78 266 74 266 90 V104 C 266 120 236 116 236 130"
        className="fill-none stroke-primary"
        strokeWidth="2"
      />
      {[46, 62, 130].map((cy) => (
        <circle
          key={cy}
          cx="236"
          cy={cy}
          r="5"
          className="fill-background stroke-border"
          strokeWidth="2"
        />
      ))}
      {[90, 104].map((cy) => (
        <circle key={cy} cx="266" cy={cy} r="5" className="fill-primary" />
      ))}
    </>
  );
}

function NotesArt() {
  return (
    <>
      <g transform="rotate(-4 160 90)">
        <rect x="96" y="26" width="128" height="128" rx="6" className={panel} />
        {[50, 64, 78, 92, 106, 120, 134].map((y, index) => (
          <rect
            key={y}
            x="112"
            y={y}
            width={index % 3 === 2 ? 64 : 96}
            height="5"
            rx="2.5"
            className={bar}
          />
        ))}
        <rect x="108" y="74" width="80" height="13" rx="3" className="fill-primary/25" />
      </g>
      <g transform="rotate(38 236 110)">
        <rect x="228" y="56" width="14" height="78" rx="2" className="fill-primary" />
        <path d="M228 134 h14 l-7 14z" className="fill-foreground/40" />
      </g>
    </>
  );
}

const art: Record<CategorySlug, ComponentType> = {
  frontend: FrontendArt,
  backend: BackendArt,
  architecture: ArchitectureArt,
  languages: LanguagesArt,
  tooling: ToolingArt,
  notes: NotesArt,
};

/** Where each category's amber glow sits, so the covers don't all look the same. */
const glow: Record<CategorySlug, string> = {
  frontend: "-top-1/4 -right-1/4",
  backend: "-bottom-1/3 -left-1/4",
  architecture: "-top-1/3 left-1/4",
  languages: "-right-1/4 -bottom-1/3",
  tooling: "-top-1/4 -left-1/4",
  notes: "-right-1/3 -bottom-1/4",
};

/**
 * The illustrated cover a post gets when it has no image: a small drawing for its category over
 * dots and an amber glow. Fills its parent; give the parent a size or an aspect ratio.
 */
export function CategoryArt({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  const Art = art[category];
  return (
    <div
      aria-hidden="true"
      className={cn("relative size-full overflow-hidden bg-muted/30", className)}
    >
      <div
        className={cn("absolute size-3/4 rounded-full bg-primary/15 blur-3xl", glow[category])}
      />
      <div className="mask-radial-from-10% mask-radial-to-80% absolute inset-0 bg-dots" />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 180"
        fill="none"
        className="absolute inset-0 size-full"
      >
        <Art />
      </svg>
    </div>
  );
}
