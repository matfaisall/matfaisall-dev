import type { Project } from "@/features/projects/types";

// Every entry gets a page at /projects/<slug>, a sitemap entry and a social preview image.
// Keep at least one entry: with Cache Components, /projects/[slug] needs one slug to prerender.
// TODO: replace the examples with your real projects, and the stock photos with screenshots.
// The example covers are free Unsplash photos (https://unsplash.com/license).
const unsplash = (photo: string) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1600&q=80`;

const projects: Project[] = [
  {
    slug: "example-project",
    title: "Example Project",
    summary: "Short summary of what the project does and the problem it solves.",
    year: 2026,
    tags: ["Next.js", "TypeScript"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
    cover: {
      src: unsplash("photo-1487338875411-8880f74114a2"),
      alt: "Two monitors side by side on a desk, showing design work",
      credit: "Tran Mau Tri Tam on Unsplash",
    },
    accent: "orange",
  },
  {
    slug: "example-dashboard",
    title: "Example Dashboard",
    summary: "Placeholder for a data-heavy app: charts, tables and realtime updates.",
    year: 2026,
    tags: ["React", "TanStack Query", "Recharts"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
    cover: {
      src: unsplash("photo-1551288049-bebda4e38f71"),
      alt: "Performance analytics charts on a laptop screen",
      credit: "Luke Chesser on Unsplash",
    },
    accent: "blue",
  },
  {
    slug: "example-landing-page",
    title: "Example Landing Page",
    summary: "Placeholder for a marketing site with scroll-driven GSAP animation.",
    year: 2025,
    tags: ["Next.js", "GSAP", "Tailwind CSS"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
    cover: {
      src: unsplash("photo-1627594953927-b6e174ee13cc"),
      alt: "A laptop keyboard lit by vivid blue and purple light",
      credit: "AltumCode on Unsplash",
    },
    accent: "violet",
  },
  {
    slug: "example-docs-site",
    title: "Example Docs Site",
    summary: "Placeholder for a documentation site built with MDX and a component library.",
    year: 2025,
    tags: ["MDX", "Storybook"],
    featured: true,
    links: { repository: "https://github.com/matfaisall" },
    cover: {
      src: unsplash("photo-1589884629000-60c572c6ba7a"),
      alt: "A laptop on a wooden desk next to notebooks and papers",
      credit: "Jonathan Kemper on Unsplash",
    },
    accent: "emerald",
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
