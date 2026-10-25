import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { IndustryBadge } from "@/features/projects/components/industry-badge";
import { ProjectVisualPanel } from "@/features/projects/components/project-visuals";
import { projectYears } from "@/features/projects/format";
import type { Project } from "@/features/projects/types";

/**
 * The big card at the top of /projects: the project and a link to its case study on one side,
 * its illustration on the other. The whole card is the link.
 */
export function ProjectSpotlight({ project }: { project: Project }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-border bg-muted/20 transition-colors hover:border-primary/40 lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-9">
        <p className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 font-mono text-primary text-xs uppercase tracking-wider">
            Featured
          </span>
          <IndustryBadge industry={project.industry} />
          <span className="font-mono text-muted-foreground text-xs">{projectYears(project)}</span>
        </p>
        <div className="flex flex-col gap-3">
          <h2 className="font-medium text-3xl tracking-tight">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h2>
          <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
        </div>
        <p className="mt-auto flex flex-wrap items-center justify-between gap-3 border-border border-t pt-6 text-sm">
          <span className="text-muted-foreground">
            {project.role} · {project.company}
          </span>
          <span aria-hidden="true" className="flex items-center gap-1.5 font-medium text-primary">
            Read the case study
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </p>
      </div>
      <ProjectVisualPanel
        visual={project.visual}
        className="min-h-80 border-border border-t lg:min-h-95 lg:border-t-0 lg:border-l"
      />
    </article>
  );
}
