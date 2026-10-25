import Image from "next/image";
import { CursorTag } from "@/components/ui/cursor-tag";
import { WindowBar } from "@/features/projects/components/window-bar";
import { projectPeriod } from "@/features/projects/format";
import type { Project } from "@/features/projects/types";

/** "822", or "188 of 281" when the repo's total says something. */
const commitCount = ({ mine, total }: NonNullable<Project["commits"]>) =>
  total ? `${mine} of ${total}` : String(mine);

/**
 * Two columns under the case study's headline: the cover screenshot in a browser window on one
 * side; on the other, in plain words, what the product is, who uses it and what for, then the
 * facts of my part.
 */
export function CaseStudyOverview({ project }: { project: Project }) {
  const answers = [
    { label: "What it is", text: project.overview.what },
    { label: "Who it's for", text: project.overview.who },
    { label: "What it's used for", text: project.overview.use },
  ];
  const facts = [
    { label: "Role", value: project.role },
    { label: "Period", value: projectPeriod(project) },
    project.commits && { label: "My commits", value: commitCount(project.commits) },
  ].filter((fact) => fact !== undefined);

  return (
    <section
      aria-labelledby="overview-heading"
      className="grid gap-10 px-6 pt-10 pb-18 md:px-12 md:pt-12 md:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
    >
      <h2 id="overview-heading" className="sr-only">
        Overview
      </h2>
      <figure className="relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-primary/5 px-5 pt-8 sm:px-8 sm:pt-10">
        <div aria-hidden="true" className="mask-radial-from-30% absolute inset-0 bg-dots" />
        <AccentLines />
        <div className="relative">
          <div className="-mb-px overflow-hidden rounded-t-xl border border-border border-b-0 bg-background shadow-2xl shadow-black/25">
            <WindowBar label={project.title} />
            <div className="relative aspect-16/10">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                preload
                sizes="(min-width: 1152px) 32rem, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <CursorTag name="Faisal" size="md" className="top-1/3 -right-4 hidden sm:flex" />
        </div>
      </figure>

      <div className="flex flex-col justify-center">
        <dl>
          {answers.map((answer) => (
            <div key={answer.label} className="border-border border-b py-5 first:pt-0">
              <dt className="font-mono text-primary text-xs uppercase tracking-wider">
                {answer.label}
              </dt>
              <dd className="mt-2 text-pretty leading-relaxed">{answer.text}</dd>
            </div>
          ))}
        </dl>
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse gap-1">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
                {fact.label}
              </dt>
              <dd className="font-medium text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Three amber curves rising across the panel, one solid and two dotted. */
function AccentLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1056 520"
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-0 size-full stroke-primary"
    >
      <path
        d="M0 470 C 300 460 520 360 1056 120"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 470 C 320 455 560 300 1056 40"
        strokeOpacity="0.45"
        strokeDasharray="1 7"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 470 C 340 450 600 250 1056 -40"
        strokeOpacity="0.25"
        strokeDasharray="1 7"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
