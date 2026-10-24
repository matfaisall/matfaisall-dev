import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProjectPreview } from "@/features/projects/components/project-preview";
import type { Project } from "@/features/projects/types";

// Components receive data through props; the page decides what to load.
export function ProjectCard({ project }: { project: Project }) {
  const href = project.links.live ?? project.links.repository;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-muted/20 transition-colors hover:border-foreground/20">
      <div className="relative aspect-[16/9] overflow-hidden border-border border-b">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectPreview slug={project.slug} title={project.title} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between font-mono text-muted-foreground text-xs">
          <span>{project.year}</span>
          {href && (
            <ArrowUpRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          )}
        </div>
        <h3 className="font-medium text-lg tracking-tight">
          {href ? (
            <a href={href} className="after:absolute after:inset-0">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
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
