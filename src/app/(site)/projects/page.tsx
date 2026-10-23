import { siteConfig } from "@/config/site";
import { ProjectList } from "@/features/projects/components/project-list";
import { getProjects } from "@/features/projects/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects",
  description: `Projects designed and built by ${siteConfig.name}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="mb-12 font-semibold text-4xl tracking-tight">Projects</h1>
      <ProjectList projects={getProjects()} />
    </section>
  );
}
