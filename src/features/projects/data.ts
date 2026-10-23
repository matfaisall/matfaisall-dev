import type { Project } from "@/features/projects/types";

// Every entry gets a page at /projects/<slug>, a sitemap entry and a social preview image.
// Keep at least one entry: with Cache Components, /projects/[slug] needs one slug to prerender.
// TODO: replace the example with your real projects.
const projects: Project[] = [
  {
    slug: "example-project",
    title: "Example Project",
    summary: "Short summary of what the project does and the problem it solves.",
    year: 2026,
    tags: ["Next.js", "TypeScript"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
  },
];

/** All projects, newest first. */
export function getProjects(): Project[] {
  return projects.toSorted((a, b) => b.year - a.year);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
