import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IndustryBadge } from "@/features/projects/components/industry-badge";
import { ProjectVisualPanel } from "@/features/projects/components/project-visuals";
import { projectYears } from "@/features/projects/format";
import type { Project } from "@/features/projects/types";

/** One project in the /projects grid: its illustration, industry and years, name, summary, tags. */
export function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-muted/20 transition-colors hover:border-primary/40">
      <ProjectVisualPanel
        visual={project.visual}
        className="h-52 shrink-0 border-border border-b"
      />
      <div className="flex flex-1 flex-col gap-2.5 p-5.5">
        <p className="flex flex-wrap items-center gap-2.5">
          <IndustryBadge industry={project.industry} />
          <span className="font-mono text-muted-foreground text-xs">{projectYears(project)}</span>
        </p>
        <h3 className="mt-1 font-medium text-lg">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
