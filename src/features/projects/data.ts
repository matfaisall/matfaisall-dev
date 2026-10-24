import type { Project } from "@/features/projects/types";

// Every entry gets a page at /projects/<slug>, a sitemap entry and a social preview image.
// Keep at least one entry: with Cache Components, /projects/[slug] needs one slug to prerender.
// TODO: replace the examples with your real projects.
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
  {
    slug: "example-dashboard",
    title: "Example Dashboard",
    summary: "Placeholder for a data-heavy app: charts, tables and realtime updates.",
    year: 2026,
    tags: ["React", "TanStack Query", "Recharts"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
  },
  {
    slug: "example-landing-page",
    title: "Example Landing Page",
    summary: "Placeholder for a marketing site with scroll-driven GSAP animation.",
    year: 2025,
    tags: ["Next.js", "GSAP", "Tailwind CSS"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
  },
  {
    slug: "example-docs-site",
    title: "Example Docs Site",
    summary: "Placeholder for a documentation site built with MDX and a component library.",
    year: 2025,
    tags: ["MDX", "Storybook"],
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
