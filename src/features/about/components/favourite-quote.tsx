import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { Quote } from "@/features/about/types";

/**
 * The one line you work by, in a card after Mintlify's founders' note: the quote in serif and the
 * author under it. Lines sweep through the band behind the card; the card fades up and the quote
 * slides in word by word. Made for `<Section bleed>`.
 */
export function FavouriteQuote({ quote }: { quote: Quote }) {
  return (
    <div className="relative isolate overflow-hidden px-6 py-14 md:px-12 md:py-24">
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
        className="mask-x-from-80% absolute inset-0 -z-1 size-full"
      >
        <path d="M-20 330 C300 330 420 120 1220 70" className="stroke-border" />
        <path
          d="M-20 350 C320 350 460 170 1220 130"
          className="stroke-primary/60"
          strokeDasharray="1 6"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path d="M-20 370 C340 370 500 220 1220 190" className="stroke-border" />
        <path d="M-20 60 C380 60 700 260 1220 300" className="stroke-border" />
      </svg>
      <div
        aria-hidden="true"
        className="-translate-1/2 absolute top-1/2 left-1/2 -z-1 h-64 w-2/3 rounded-full bg-primary/10 blur-3xl"
      />

      <Reveal className="mx-auto max-w-160">
        <figure className="flex flex-col gap-4 rounded-md border border-border bg-card p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-12">
          <blockquote lang={quote.lang}>
            <TextReveal
              as="p"
              className="text-balance font-display text-3xl/9 tracking-[-0.02em] md:text-4xl/10"
            >
              “{quote.text}”
            </TextReveal>
            {quote.translation && (
              <p className="mt-3 text-base/6 text-muted-foreground">{quote.translation}</p>
            )}
          </blockquote>
          <figcaption className="flex items-center gap-2.5 text-muted-foreground text-sm/5">
            <span aria-hidden="true" className="h-px w-5 bg-primary" />
            <span>
              <span className="font-medium text-foreground">{quote.author}</span>
              {quote.source && `, ${quote.source}`}
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
