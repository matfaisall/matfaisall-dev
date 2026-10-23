import { getProjectBySlug, getProjects } from "@/features/projects/data";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Project preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderOgImage({
    eyebrow: "Project",
    title: project?.title ?? "Project",
    description: project?.summary,
  });
}
