import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { TechGrid } from "@/features/about/components/tech-grid";
import type { Tech } from "@/features/about/types";

type TechStackProps = {
  stack: Tech[];
  githubUrl: string;
};

/**
 * The tools you work with, like Mintlify's customer logo band: a short line and a link on the
 * left, a grid of eight rotating tiles on the right, split by a hairline. It sits between the rails.
 */
export function TechStack({ stack, githubUrl }: TechStackProps) {
  return (
    <section aria-labelledby="stack-heading" className="border-border border-t">
      <div className="mx-auto grid max-w-6xl md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col items-start justify-between gap-8 px-6 py-10 md:px-12 md:py-12">
          <h2
            id="stack-heading"
            className="max-w-xs text-balance font-medium text-2xl text-muted-foreground leading-snug tracking-tight md:text-[1.75rem]"
          >
            A few of the <span className="text-foreground">tools I build with</span>, from typed
            components to motion.
          </h2>
          <Button asChild variant="secondary" size="sm">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              See them on GitHub
              <CaretRightIcon aria-hidden="true" />
            </a>
          </Button>
        </div>
        <TechGrid stack={stack} />
      </div>
    </section>
  );
}
