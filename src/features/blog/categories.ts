// The blog's categories, in the order of the tabs on /blog. Every post picks exactly one with
// `category: "<slug>"`; use `tags` for anything finer. Each one gets /blog/category/<slug>.
export const categories = [
  {
    slug: "frontend",
    label: "Frontend",
    description: "React, Next.js, CSS, animation, accessibility and UI performance.",
  },
  {
    slug: "backend",
    label: "Backend",
    description: "APIs, databases, Node.js and authentication.",
  },
  {
    slug: "architecture",
    label: "Architecture",
    description: "System design, patterns, folder structure and scaling.",
  },
  {
    slug: "languages",
    label: "Languages",
    description: "TypeScript, JavaScript and the other languages I write.",
  },
  {
    slug: "tooling",
    label: "Tooling",
    description: "Git, testing, CI/CD and developer experience.",
  },
  {
    slug: "notes",
    label: "Notes",
    description: "Learning notes, career and reflections.",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
