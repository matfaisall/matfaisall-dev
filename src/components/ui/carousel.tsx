"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type RefObject,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselState = {
  /** Index of the slide aligned with the start of the track. */
  active: number;
  canPrevious: boolean;
  canNext: boolean;
};

type CarouselContextValue = CarouselState & {
  trackRef: RefObject<HTMLElement | null>;
  scrollTo: (index: number) => void;
  /** Moves by `delta` slides from where the carousel is heading, not where it is right now. */
  step: (delta: number) => void;
  sync: () => void;
  /** Forget the slide a button click is heading to, because the user took over scrolling. */
  release: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = use(CarouselContext);
  if (!context) throw new Error("Carousel parts must be rendered inside <Carousel>.");
  return context;
}

const slidesOf = (track: HTMLElement) => [
  ...track.querySelectorAll<HTMLElement>(":scope > [data-carousel-slide]"),
];

/**
 * Scroll position that puts a slide where the first one sits at rest. Measured from the first
 * slide, so it holds whatever start padding the track has (a computed `scroll-padding` with a
 * percentage can't be read back as pixels).
 */
const positionOf = (track: HTMLElement, slide: HTMLElement) =>
  slide.offsetLeft - (slidesOf(track)[0]?.offsetLeft ?? 0);

/**
 * A horizontal, swipeable list of slides that snaps one slide at a time. It wraps the whole area
 * so the controls can live elsewhere, for example next to a section title:
 *
 *   <Carousel>
 *     <CarouselPrevious /> <CarouselNext />
 *     <CarouselTrack label="Projects">
 *       <CarouselSlide index={0}>…</CarouselSlide>
 *     </CarouselTrack>
 *   </Carousel>
 *
 * Scrolling is native (touch, trackpad, Shift + wheel), so it needs no carousel library.
 */
export function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  // Where a button click is scrolling to. A second click while that smooth scroll is still running
  // counts from here, so quick double clicks move two slides instead of one.
  const targetRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const [state, setState] = useState<CarouselState>({
    active: 0,
    canPrevious: false,
    canNext: false,
  });

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = slidesOf(track);
    const left = track.scrollLeft;
    const distance = (slide: HTMLElement) => Math.abs(positionOf(track, slide) - left);
    let active = 0;
    slides.forEach((slide, index) => {
      if (distance(slide) < distance(slides[active])) active = index;
    });
    activeRef.current = active;
    if (targetRef.current === active) targetRef.current = null;
    const next = {
      active,
      canPrevious: left > 1,
      canNext: left < track.scrollWidth - track.clientWidth - 1,
    };
    // Scroll events fire every frame; only re-render when something visible changed.
    setState((current) =>
      current.active === next.active &&
      current.canPrevious === next.canPrevious &&
      current.canNext === next.canNext
        ? current
        : next,
    );
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = slidesOf(track);
    const target = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[target];
    if (!slide) return;
    targetRef.current = target;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: positionOf(track, slide), behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const step = useCallback(
    (delta: number) => scrollTo((targetRef.current ?? activeRef.current) + delta),
    [scrollTo],
  );

  const release = useCallback(() => {
    targetRef.current = null;
  }, []);

  const value = useMemo(
    () => ({ ...state, trackRef, scrollTo, step, sync, release }),
    [state, scrollTo, step, sync, release],
  );

  return <CarouselContext value={value}>{children}</CarouselContext>;
}

type CarouselTrackProps = ComponentProps<"section"> & {
  /** Names the carousel for screen readers, e.g. "Selected work". */
  label: string;
};

/** The scrolling row. Give slides a width with `basis-*` on `<CarouselSlide>`. */
export function CarouselTrack({ label, className, children, ...props }: CarouselTrackProps) {
  const { trackRef, sync, release } = useCarousel();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    // The user took over (or the scroll finished): later clicks count from where the track is.
    const takeOver = ["wheel", "pointerdown", "touchstart", "keydown", "scrollend"] as const;
    track.addEventListener("scroll", sync, { passive: true });
    for (const type of takeOver) track.addEventListener(type, release, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", sync);
      for (const type of takeOver) track.removeEventListener(type, release);
      observer.disconnect();
    };
  }, [trackRef, sync, release]);

  return (
    <section
      ref={trackRef}
      aria-label={label}
      aria-roledescription="carousel"
      className={cn(
        "relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type CarouselSlideProps = ComponentProps<"div"> & {
  /** Position in the track, used to tell whether this slide is the active one. */
  index: number;
};

/**
 * One slide. It carries `data-active`, so the active slide can be styled, e.g.
 * `data-[active=false]:opacity-50`. Clicking a slide that isn't active brings it into place first.
 */
export function CarouselSlide({ index, className, children, ...props }: CarouselSlideProps) {
  const { active, scrollTo } = useCarousel();
  const isActive = index === active;

  return (
    // Clicking a peeking slide is a pointer shortcut; keyboards use the previous and next buttons.
    <div
      data-carousel-slide
      data-active={isActive}
      onClickCapture={(event) => {
        if (isActive) return;
        event.preventDefault();
        event.stopPropagation();
        scrollTo(index);
      }}
      className={cn("shrink-0 basis-full snap-start", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CarouselPrevious({ label = "Previous slide" }: { label?: string }) {
  const { canPrevious, step } = useCarousel();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={label}
      disabled={!canPrevious}
      onClick={() => step(-1)}
    >
      <CaretLeftIcon aria-hidden="true" />
    </Button>
  );
}

export function CarouselNext({ label = "Next slide" }: { label?: string }) {
  const { canNext, step } = useCarousel();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={label}
      disabled={!canNext}
      onClick={() => step(1)}
    >
      <CaretRightIcon aria-hidden="true" />
    </Button>
  );
}
