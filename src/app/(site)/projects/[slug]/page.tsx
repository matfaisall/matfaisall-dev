import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { CreativeWork } from "schema-dts";
import { ArticleSkeleton } from "@/components/layout/article-skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, getProjects } from "@/features/projects/data";
import { absoluteUrl, createPageMetadata, personSchema } from "@/lib/seo";

type Params = PageProps<"/projects/[slug]">["params"];

// Prerender one page per project at build time.
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

// The shell renders instantly on navigation; the project depends on the URL, so it streams
// in behind <Suspense>. Prerendered pages still contain the full project for search engines.
export default function ProjectPage({ params }: { params: Params }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Suspense fallback={<ArticleSkeleton />}>
        <ProjectDetails params={params} />
      </Suspense>
    </article>
  );
}

async function ProjectDetails({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd<CreativeWork>
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: absoluteUrl(`/projects/${project.slug}`),
          dateCreated: String(project.year),
          keywords: project.tags.join(", "),
          author: personSchema(),
        }}
      />
      <p className="font-mono text-muted-foreground text-sm">{project.year}</p>
      <h1 className="mt-2 font-semibold text-4xl tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
      {project.cover && (
        <figure className="mt-12">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              preload
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
          {project.cover.credit && (
            <figcaption className="mt-3 text-muted-foreground text-xs">
              Photo: {project.cover.credit}
            </figcaption>
          )}
        </figure>
      )}
    </>
  );
}
