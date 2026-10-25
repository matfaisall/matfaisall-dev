import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { WindowBar } from "@/features/projects/components/window-bar";
import type { Project } from "@/features/projects/types";

// The body of a case study, one band each, separated by hairlines that run from rail to rail.

const band = "border-border border-t px-6 py-18 md:px-12 md:py-24";

/** A section heading with an amber tick on the left rail. */
function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="relative max-w-2xl text-balance font-medium text-3xl tracking-tight md:text-4xl"
    >
      <span
        aria-hidden="true"
        className="absolute top-[0.2em] -left-6 h-[0.9em] w-0.5 bg-primary md:-left-12"
      />
      {children}
    </h2>
  );
}

/** The parts you owned, as numbered rows: the title on the left, what it does on the right. */
export function CaseStudyModules({ project }: { project: Project }) {
  return (
    <section aria-labelledby="built-heading" className={band}>
      <Heading id="built-heading">
        What I built. <span className="text-muted-foreground">The parts I owned.</span>
      </Heading>
      <Reveal className="mt-10 border-border border-t md:mt-12" y={16}>
        {project.modules.map((module, index) => (
          <div
            key={module.title}
            className="grid gap-x-6 gap-y-2 border-border border-b py-6 md:grid-cols-[2.5rem_15rem_1fr]"
          >
            <span className="font-mono text-primary text-xs leading-6">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-medium">{module.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{module.description}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/** Screenshots of the product, each in a browser window with its caption under it. */
export function CaseStudyScreens({ project }: { project: Project }) {
  if (project.screenshots.length === 0) return null;
  return (
    <section aria-labelledby="screens-heading" className={band}>
      <Heading id="screens-heading">
        Screens. <span className="text-muted-foreground">A look at the product.</span>
      </Heading>
      <Reveal className="mt-12 grid gap-x-5 gap-y-10 md:grid-cols-2" y={24}>
        {project.screenshots.map((screen) => (
          <figure key={screen.src} className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <WindowBar label={project.title} />
              <div className="relative aspect-16/10 bg-muted">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(min-width: 1152px) 32rem, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="font-mono text-muted-foreground text-xs">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
