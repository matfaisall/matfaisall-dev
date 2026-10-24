"use client";

/**
 * RibbonCanvas — "3D" twisted-ribbon background drawn with plain Canvas 2D.
 *
 * No 3D model, no Three.js, no WebGL. The depth illusion comes from:
 *  1. Many thin lines, each a sum of two sine waves.
 *  2. A small phase offset per line, so neighbouring lines peak at different x
 *     and cross each other -> reads as a twisted surface.
 *  3. A sin(πu) "bulge" envelope -> the middle swells as if closer to the camera.
 *  4. A horizontal gradient stroke -> wireframe/hologram look.
 */

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export interface RibbonSettings {
  /** Logical drawing box. The canvas "covers" this box (like object-fit: cover). */
  width: number;
  height: number;
  /** Number of lines in the ribbon. */
  count: number;
  /** Points per line. Higher = smoother curve, more CPU per frame. */
  resolution: number;
  /** Vertical distance between lines (logical units). */
  spacing: number;
  /** Wave height (logical units). */
  amplitude: number;
  /** Full sine cycles across the width. */
  frequency: number;
  /** Phase difference between neighbouring lines — this creates the twist. */
  phase: number;
  /** Weight of the secondary wave (0 = flat wave, ~0.4 = twisted ribbon). */
  twist: number;
  /** How much the middle swells (0 = uniform thickness). */
  bulge: number;
  /** Animation speed multiplier. 0 freezes the motion. */
  speed: number;
  /** Line width in logical units (scales with the canvas). */
  strokeWidth: number;
  colorStart: string;
  colorEnd: string;
  /** Left-to-right draw-in duration in ms. 0 disables the intro. */
  introMs: number;
}

export const DEFAULT_RIBBON_SETTINGS: Readonly<RibbonSettings> = Object.freeze({
  width: 1720,
  height: 1080,
  count: 24,
  resolution: 81,
  spacing: 5,
  amplitude: 160,
  frequency: 0.75,
  phase: 0.14,
  twist: 0.4,
  bulge: 0.65,
  speed: 1,
  strokeWidth: 1.2,
  colorStart: "#18e299",
  colorEnd: "#baff24",
  introMs: 1500,
});

// ---------------------------------------------------------------------------
// Pure math (no DOM) — easy to unit-test or reuse for SVG/WebGL output
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2;

const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (x: number): number => {
  const v = clamp01(x);
  return v * v * (3 - 2 * v);
};

export const pointsPerLine = (s: RibbonSettings): number => Math.max(2, Math.floor(s.resolution));

/**
 * Writes one line's points into `out` as [x0, y0, x1, y1, ...].
 * `out` is reused across frames so the render loop allocates nothing (no GC jank).
 */
export function computeRibbonLine(
  lineIndex: number,
  timeSec: number,
  s: RibbonSettings,
  out: Float32Array,
): void {
  const points = pointsPerLine(s);
  const lastIndex = points - 1;
  const centered = lineIndex - (s.count - 1) / 2;
  const linePhase = s.phase * centered;
  const omega = s.frequency * TAU;
  const baseY = s.height / 2 + centered * s.spacing;

  for (let p = 0; p < points; p++) {
    const u = p / lastIndex; // 0..1 across the width
    const envelope = 1 + s.bulge * Math.sin(u * Math.PI);
    const primary = Math.sin(omega * u + linePhase + timeSec * 0.8);
    const secondary = Math.sin(0.5 * omega * u - 2 * linePhase + timeSec * 0.7);
    const offset = (primary + s.twist * secondary) * 0.5 * envelope;

    out[p * 2] = u * s.width;
    out[p * 2 + 1] = baseY + offset * s.amplitude;
  }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  s: RibbonSettings,
  timeSec: number,
  introProgress: number,
  stroke: CanvasGradient,
  buffer: Float32Array,
): void {
  const { width: cw, height: ch } = ctx.canvas;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cw, ch);
  if (introProgress <= 0) return;

  // "cover" fit: logical box fills the canvas, centred, aspect ratio preserved.
  const scale = Math.max(cw / s.width, ch / s.height);
  ctx.setTransform(scale, 0, 0, scale, (cw - s.width * scale) / 2, (ch - s.height * scale) / 2);

  ctx.save();
  if (introProgress < 1) {
    // Cheaper than setLineDash + measuring every line's length each frame.
    ctx.beginPath();
    ctx.rect(0, 0, s.width * introProgress, s.height);
    ctx.clip();
  }

  // All lines in ONE path -> ONE stroke() call instead of `count` calls.
  ctx.beginPath();
  const points = pointsPerLine(s);
  for (let i = 0; i < s.count; i++) {
    computeRibbonLine(i, timeSec, s, buffer);
    ctx.moveTo(buffer[0], buffer[1]);
    for (let p = 1; p < points; p++) {
      ctx.lineTo(buffer[p * 2], buffer[p * 2 + 1]);
    }
  }
  ctx.strokeStyle = stroke;
  ctx.lineWidth = s.strokeWidth;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

// ---------------------------------------------------------------------------
// prefers-reduced-motion as an external store (SSR-safe, reacts to OS changes)
// ---------------------------------------------------------------------------

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false, // server snapshot
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface RibbonCanvasProps {
  /** Partial overrides; pass a stable object (module constant or useMemo). */
  settings?: Partial<RibbonSettings>;
  /** Cap for devicePixelRatio. 3x screens cost 2.25x the pixels of 2x for no visible gain. */
  maxDpr?: number;
  className?: string;
}

/** Max frame delta (ms). Prevents a jump after tab switches, jank, or debugger pauses. */
const MAX_FRAME_DELTA_MS = 50;

export function RibbonCanvas({
  settings,
  maxDpr = 2,
  className = "pointer-events-none block size-full",
}: RibbonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const merged = useMemo<RibbonSettings>(
    () => ({ ...DEFAULT_RIBBON_SETTINGS, ...settings }),
    [settings],
  );

  // Read settings through a ref so prop changes don't tear down the render loop.
  const settingsRef = useRef<RibbonSettings>(merged);
  useEffect(() => {
    settingsRef.current = merged;
  }, [merged]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      // Decorative element: fail quietly, but leave a trace for debugging.
      console.warn("[RibbonCanvas] 2D context unavailable; skipping animation.");
      return;
    }

    let rafId = 0;
    let running = false;
    let lastTs: number | null = null;
    let animTimeSec = 0;
    let introElapsedMs = reducedMotion ? Number.POSITIVE_INFINITY : 0;

    let buffer = new Float32Array(0);
    let gradient: CanvasGradient | null = null;
    let gradientKey = "";

    const render = (): void => {
      const s = settingsRef.current;

      const needed = pointsPerLine(s) * 2;
      if (buffer.length !== needed) buffer = new Float32Array(needed);

      // Gradient coordinates are resolved in the transform active at stroke time,
      // so one gradient in logical space survives resizes. Rebuild only on change.
      const key = `${s.width}|${s.colorStart}|${s.colorEnd}`;
      if (!gradient || key !== gradientKey) {
        gradient = ctx.createLinearGradient(0, 0, s.width, 0);
        gradient.addColorStop(0, s.colorStart);
        gradient.addColorStop(1, s.colorEnd);
        gradientKey = key;
      }

      const intro = s.introMs > 0 ? smoothstep(introElapsedMs / s.introMs) : 1;
      drawFrame(ctx, s, animTimeSec, intro, gradient, buffer);
    };

    const tick = (ts: number): void => {
      if (lastTs !== null) {
        const dtMs = Math.min(ts - lastTs, MAX_FRAME_DELTA_MS);
        // Accumulate (not `ts - startTs`): pauses and speed changes never cause jumps.
        animTimeSec += (dtMs / 1000) * settingsRef.current.speed;
        introElapsedMs += dtMs;
      }
      lastTs = ts;
      render();
      rafId = requestAnimationFrame(tick);
    };

    const start = (): void => {
      if (running || reducedMotion) return;
      running = true;
      lastTs = null; // time spent off-screen must not count
      rafId = requestAnimationFrame(tick);
    };

    const stop = (): void => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return; // display:none / collapsed parent

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; // clears the bitmap and resets context state
        canvas.height = h;
      }
      // Repaint now: a paused or reduced-motion canvas would otherwise stay blank.
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Only animate while (nearly) on screen — zero CPU/GPU cost when scrolled away.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { rootMargin: "10% 0px" },
    );
    intersectionObserver.observe(canvas);

    // Browsers may drop a canvas backing store under memory pressure (mostly mobile).
    const onContextRestored = (): void => render();
    canvas.addEventListener("contextrestored", onContextRestored);

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("contextrestored", onContextRestored);
    };
  }, [maxDpr, reducedMotion]);

  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: a canvas without tabIndex is not focusable; this one is decoration.
    <canvas ref={canvasRef} aria-hidden="true" className={className} />
  );
}

export default RibbonCanvas;
