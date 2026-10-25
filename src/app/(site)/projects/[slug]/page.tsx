import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { CreativeWork } from "schema-dts";
import { ArticleSkeleton } from "@/components/layout/article-skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { ContactCta } from "@/features/contact/components/contact-cta";
import { CaseStudyHero } from "@/features/projects/components/case-study-hero";
import { CaseStudyOverview } from "@/features/projects/components/case-study-overview";
import {
  CaseStudyModules,
  CaseStudyScreens,
} from "@/features/projects/components/case-study-sections";
import { getNextProject, getProjectBySlug, getProjects } from "@/features/projects/data";
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

// The shell renders instantly on navigation; the case study depends on the URL, so it streams
// in behind <Suspense>. Prerendered pages still contain the full case study for search engines.
export default function ProjectPage({ params }: { params: Params }) {
  return (
    <>
      <article className="mx-auto max-w-6xl">
        <Suspense
          fallback={
            <div className="px-6 py-14 md:px-12 md:py-20">
              <ArticleSkeleton />
            </div>
          }
        >
          <CaseStudy params={params} />
        </Suspense>
      </article>
      <ContactCta email={siteConfig.email} linkedinUrl={siteConfig.socials.linkedin} />
    </>
  );
}

async function CaseStudy({ params }: { params: Params }) {
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
          image: absoluteUrl(project.cover.src),
          dateCreated: project.start,
          keywords: project.stack.join(", "),
          author: personSchema(),
        }}
      />
      <CaseStudyHero project={project} next={getNextProject(project)} />
      <CaseStudyOverview project={project} />
      <CaseStudyModules project={project} />
      <CaseStudyScreens project={project} />
    </>
  );
}
