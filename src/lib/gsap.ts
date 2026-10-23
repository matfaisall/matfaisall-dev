"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins once; every animated component imports gsap from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Wrap every animation in `gsap.matchMedia().add(FULL_MOTION, …)` so reduced-motion users get a static page. */
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Motion tokens: use these instead of raw numbers so every animation on the site feels the same.
export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

export const EASE = {
  /** Default for elements entering the screen. */
  out: "power3.out",
  /** Snappier, for text and large movements. */
  expo: "expo.out",
  /** For elements moving between two states. */
  inOut: "power2.inOut",
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.1,
  loose: 0.15,
} as const;

/** ScrollTrigger start position for "animate when it enters the viewport". */
export const SCROLL_START = "top 85%";

export { gsap, ScrollTrigger, SplitText, useGSAP };
