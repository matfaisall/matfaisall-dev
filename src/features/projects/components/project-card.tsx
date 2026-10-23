import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/features/projects/types";

// Components receive data through props; the page decides what to load.
export function ProjectCard({ project }: { project: Project }) {
  const href = project.links.live ?? project.links.repository;

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between font-mono text-muted-foreground text-xs">
        <span>{project.year}</span>
        {href && <ArrowUpRightIcon className="size-4" aria-hidden="true" />}
      </div>
      <h3 className="font-semibold text-xl tracking-tight">
        {href ? (
          <a href={href} className="after:absolute after:inset-0">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
