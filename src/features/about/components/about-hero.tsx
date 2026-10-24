import {
  CursorIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import type { About } from "@/features/about/types";

type AboutHeroProps = {
  name: string;
  role: string;
  location: string;
  /** Words wrapped in *asterisks* are set in the accent italic. */
  intro: string;
  /** Words wrapped in *asterisks* are set in the foreground colour. */
  bio: string[];
  portrait: About["portrait"];
  /** Your current position, shown as a live status line above the introduction. */
  current?: { role: string; company: string };
  githubUrl: string;
  linkedinUrl: string;
  email: string;
};

/** Splits "… that *feel simple.*" on the asterisks and wraps every starred part with `mark`. */
function Marked({ text, mark }: { text: string; mark: (part: string) => ReactNode }) {
  return text.split("*").map((part, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: the parts of one fixed string never reorder.
    <Fragment key={index}>{index % 2 === 1 ? mark(part) : part}</Fragment>
  ));
}

/**
 * The portrait as a small photo card: a second card fanned out behind it, the location pinned to
 * the bottom edge and a Mintlify-style cursor tag with your first name.
 */
function PortraitCard({
  portrait,
  name,
  location,
}: {
  portrait: About["portrait"];
  name: string;
  location: string;
}) {
  return (
    <figure className="relative w-full max-w-48 self-start sm:max-w-60 md:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-16 -z-1 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-2 rotate-4 rounded-xl border border-border bg-muted/50"
      >
        <div className="mask-radial-from-10% mask-radial-to-90% absolute inset-0 rounded-xl bg-dots" />
      </div>
      <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-muted shadow-2xl shadow-black/30">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          preload
          sizes="15rem"
          className="object-cover"
        />
      </div>
      <figcaption className="absolute -bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs shadow-sm">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        {location}
      </figcaption>
      <span
        aria-hidden="true"
        className="absolute top-2/3 -right-5 flex items-start gap-0.5 md:-right-8"
      >
        <CursorIcon weight="fill" className="size-4 text-primary" />
        <span className="mt-3 rounded-md bg-primary px-1.5 py-0.5 font-medium text-primary-foreground text-xs">
          {name.split(" ").at(-1)}
        </span>
      </span>
    </figure>
  );
}

/** The About page opening: a serif headline, then a small portrait card next to the introduction. */
export function AboutHero({
  name,
  role,
  location,
  intro,
  bio,
  portrait,
  current,
  githubUrl,
  linkedinUrl,
  email,
}: AboutHeroProps) {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Covers the site background and redraws it: the grid fills the margins outside the rails,
          lined up with them and fading out at the top and bottom, while between the rails the
          background stays plain apart from a patch of grid in the top-right corner. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1">
        <div className="mask-t-from-70% mask-b-from-40% absolute inset-y-0 left-0 w-[calc(50%-36rem)] bg-grid bg-top-right" />
        <div className="mask-t-from-70% mask-b-from-40% absolute inset-y-0 right-0 w-[calc(50%-36rem)] bg-grid" />
        <div className="relative mx-auto h-full max-w-6xl border-border md:border-x">
          <div className="mask-radial-from-0% mask-radial-to-55% mask-radial-at-top-right absolute inset-0 bg-grid" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:px-12 md:pt-24 md:pb-28">
        <p className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 py-1 pr-1.5 pl-2.5 text-sm">
          About me
          <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
            {role}
          </span>
        </p>
        <TextReveal
          as="h1"
          trigger="load"
          id="about-heading"
          className="mt-6 max-w-4xl text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
        >
          <Marked text={intro} mark={(part) => <em className="text-primary">{part}</em>} />
        </TextReveal>

        <Reveal className="mt-12 grid gap-12 md:mt-20 md:grid-cols-[15rem_1fr] md:gap-16 lg:gap-24">
          <PortraitCard portrait={portrait} name={name} location={location} />

          <div className="flex max-w-xl flex-col gap-8">
            {current && (
              <p className="inline-flex items-center gap-2.5 self-start rounded-lg border border-border bg-background py-1 pr-3 pl-2.5 text-xs sm:text-sm">
                <span aria-hidden="true" className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span>
                  {current.role} at <span className="font-medium">{current.company}</span>
                </span>
              </p>
            )}
            <div className="flex flex-col gap-4 text-base/7 text-muted-foreground">
              {bio.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  <Marked
                    text={paragraph}
                    mark={(part) => <strong className="font-medium text-foreground">{part}</strong>}
                  />
                </p>
              ))}
            </div>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Button asChild variant="outline">
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    <GithubLogoIcon aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="outline">
                  <a href={linkedinUrl} target="_blank" rel="noreferrer">
                    <LinkedinLogoIcon aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="outline">
                  <a href={`mailto:${email}`}>
                    <EnvelopeSimpleIcon aria-hidden="true" />
                    {email}
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
