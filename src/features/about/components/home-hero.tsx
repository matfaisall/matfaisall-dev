import { ArrowRightIcon, CaretRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Fragment } from "react";
import { BrandRibbon } from "@/components/motion/brand-ribbon";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import { CodeWindow } from "@/features/about/components/code-window";

type HomeHeroProps = {
  name: string;
  handle: string;
  role: string;
  location: string;
  headline: string;
  /** The first three are highlighted in the intro; the first four go in the code window. */
  skills: string[];
  focus: string[];
  githubUrl: string;
};

/** "Next.js, React and TypeScript", with each item emphasised. */
function HighlightedList({ items }: { items: string[] }) {
  return items.map((item, index) => (
    <Fragment key={item}>
      {index > 0 && (index === items.length - 1 ? " and " : ", ")}
      <span className="font-medium text-foreground">{item}</span>
    </Fragment>
  ));
}

export function HomeHero({
  name,
  handle,
  role,
  location,
  headline,
  skills,
  focus,
  githubUrl,
}: HomeHeroProps) {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden bg-background">
      {/* Edge to edge: this band covers the rails, so the grid and ribbon run off both sides. */}
      <div
        aria-hidden="true"
        className="mask-radial-from-0% mask-radial-to-70% mask-radial-at-top-right absolute inset-0 bg-grid"
      />
      {/* Desktop only: stacked, the code window would cover it. The mask is drawn in container
          units, so at any width the ribbon enters from the left edge, vanishes behind the copy
          (the container's left half) and comes back for the code window and the right edge. */}
      <BrandRibbon className="absolute inset-0 hidden [mask-image:linear-gradient(to_right,black,transparent_calc(50%_-_38rem),transparent_calc(50%_-_2rem),black_calc(50%_+_6rem))] lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-14 pb-20 md:px-12 md:pt-24 md:pb-28 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-start">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-background/70 py-1 pr-1.5 pl-2.5 text-sm backdrop-blur-sm transition-colors hover:border-foreground/20"
          >
            {role}
            <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
              @{handle}
            </span>
            <CaretRightIcon
              className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <TextReveal
            as="h1"
            trigger="load"
            className="mt-6 text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
          >
            {headline}
          </TextReveal>

          <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
            I'm {name}, a {role.toLowerCase()} based in {location}, crafting interfaces with{" "}
            <HighlightedList items={skills.slice(0, 3)} />.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/projects">
                View my work
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <GithubLogoIcon aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <CodeWindow
          handle={handle}
          name={name}
          role={role}
          location={location}
          skills={skills.slice(0, 4)}
          focus={focus}
          className="lg:translate-y-8"
        />
      </div>
    </section>
  );
}
