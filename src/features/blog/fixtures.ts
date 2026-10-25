import type { Author, Post } from "@/features/blog/types";

// Sample data for the blog's Storybook stories. The site itself never imports this file.

export const exampleAuthor: Author = {
  name: "Muhammad Faisal",
  role: "Frontend Engineer",
  avatar: "/avatar.webp",
};

const toc: Post["toc"] = [
  { depth: 2, text: "Two kinds of components", id: "two-kinds-of-components" },
  { depth: 2, text: '"use client" is a boundary', id: "use-client-is-a-boundary" },
  { depth: 3, text: "Push the boundary down", id: "push-the-boundary-down" },
  { depth: 2, text: "What you get", id: "what-you-get" },
];

export const examplePosts: Post[] = [
  {
    slug: "react-server-components-without-the-jargon",
    title: "React Server Components, without the jargon",
    summary: "What runs where, and why 'use client' is a boundary rather than a label.",
    publishedAt: "2026-10-16",
    category: "frontend",
    tags: ["React", "Next.js"],
    readingTime: 4,
    toc,
  },
  {
    slug: "api-errors-your-frontend-can-use",
    title: "Designing API errors your frontend can actually use",
    summary: "A consistent error shape and field-level details people can act on.",
    publishedAt: "2026-09-18",
    category: "backend",
    tags: ["API design"],
    readingTime: 5,
    toc,
  },
  {
    slug: "typescript-satisfies",
    title: "TypeScript's satisfies, and when to reach for it",
    summary: "Check a value against a type without losing what TypeScript knows about it.",
    publishedAt: "2026-10-02",
    category: "languages",
    tags: ["TypeScript"],
    readingTime: 3,
    toc,
  },
];

export const [examplePost] = examplePosts;
