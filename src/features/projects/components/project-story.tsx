import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { accentPanels } from "@/features/projects/accents";
import { projectYears } from "@/features/projects/format";
import type { Project } from "@/features/projects/types";
import { cn } from "@/lib/utils";

/** "React, TanStack Query and Recharts" */
const listOf = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

/**
 * A wide project card in the style of Mintlify's customer stories: a coloured panel with the
 * name, summary, two big numbers and a link, next to the cover photo.
 */
export function ProjectStory({ project }: { project: Project }) {
  const highlights = project.highlights?.slice(0, 2) ?? [
    { value: projectYears(project), label: "Shipped" },
    { value: String(project.tags.length), label: listOf(project.tags) },
  ];

  return (
    <article className="grid h-full overflow-hidden rounded-xl lg:h-120 lg:grid-cols-2">
      <div
        className={cn(
          "relative flex flex-col p-8 text-white lg:p-10",
          accentPanels[project.accent],
        )}
      >
        <div
          aria-hidden="true"
          className="mask-radial-from-0% mask-radial-to-70% mask-radial-at-right absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.22)_1px,transparent_1px)] bg-size-[16px_16px]"
        />
        <h3 className="relative font-semibold text-sm uppercase tracking-[0.2em]">
          {project.title}
        </h3>
        <p className="relative mt-6 max-w-md text-balance text-2xl text-white/85 leading-snug tracking-tight lg:mt-8 lg:text-[2rem] lg:leading-tight">
          {project.summary}
        </p>
        <dl className="relative mt-10 grid grid-cols-2 gap-6 lg:mt-auto">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-white/80 leading-snug">{highlight.label}</dt>
              <dd className="font-medium text-4xl tracking-tight lg:text-5xl">{highlight.value}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-10">
          <Button asChild size="sm" className="bg-white text-stone-950 hover:bg-white/90">
            <Link href={`/projects/${project.slug}`}>
              View project
              <span className="sr-only">: {project.title}</span>
              <CaretRightIcon aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative aspect-5/4 bg-muted lg:aspect-auto">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="object-cover"
        />
        {project.cover.credit && (
          <p className="absolute right-3 bottom-3 max-w-[calc(100%-1.5rem)] truncate rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] text-white/85 backdrop-blur-sm">
            Photo: {project.cover.credit}
          </p>
        )}
      </div>
    </article>
  );
}
