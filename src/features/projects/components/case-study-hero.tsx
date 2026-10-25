import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Marked } from "@/components/ui/marked";
import { IndustryBadge } from "@/features/projects/components/industry-badge";
import { projectYears } from "@/features/projects/format";
import type { Project } from "@/features/projects/types";

/** The top of a case study: back link, eyebrow, headline, links and the stack. */
export function CaseStudyHero({ project, next }: { project: Project; next: Project }) {
  return (
    <Reveal className="flex flex-col items-start gap-5 px-6 pt-10 md:px-12 md:pt-14" y={24}>
      <Link
        href="/projects"
        className="group inline-flex min-h-11 items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
          <ArrowLeftIcon
            aria-hidden="true"
            weight="bold"
            className="size-3 transition-transform group-hover:-translate-x-0.5"
          />
        </span>
        All projects
      </Link>
      <p className="flex flex-wrap items-center gap-2.5 font-mono text-muted-foreground text-xs uppercase tracking-wider">
        <IndustryBadge industry={project.industry} />
        <span>{project.company}</span>
        <span aria-hidden="true" className="text-muted-foreground/50">
          /
        </span>
        <span>{projectYears(project)}</span>
      </p>
      <h1 className="max-w-4xl text-balance font-medium text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
        <Marked
          text={project.headline}
          mark={(part) => <em className="font-display font-normal text-primary">{part}</em>}
        />
      </h1>
      <div className="mt-1 flex flex-wrap gap-2.5">
        {project.links.live ? (
          <Button asChild variant="secondary">
            <a href={project.links.live} target="_blank" rel="noreferrer">
              Visit the site
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <span className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-muted-foreground text-sm">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
            {project.status === "internal" ? "Internal tool, no public link" : "Public site"}
          </span>
        )}
        {project.links.repository && (
          <Button asChild variant="outline">
            <a href={project.links.repository} target="_blank" rel="noreferrer">
              Source code
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </Button>
        )}
        <Button asChild variant="ghost" className="bg-muted/60">
          <Link href={`/projects/${next.slug}`}>
            Next project
            <span className="sr-only">: {next.title}</span>
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <ul aria-label="Stack" className="flex max-w-3xl flex-wrap gap-2 pt-2">
        {project.stack.map((item) => (
          <li key={item}>
            <Badge>{item}</Badge>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
