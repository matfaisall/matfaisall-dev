import type { About } from "@/features/about/types";

// Content for the "who am I" sections. Name, role and links live in `@/config/site`.
// TODO: review the draft copy below and fill in your work history.
export const about: About = {
  headline: "Building fast, animated and accessible web experiences.",
  bio: "I'm a frontend engineer who turns ideas into interfaces that load fast, move with intent and work for everyone.",
  skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Storybook"],
  capabilities: [
    {
      title: "Fast by default",
      summary: "Server-first rendering, lean bundles and media that never shifts the layout.",
      visual: "performance",
    },
    {
      title: "Motion with intent",
      summary:
        "Animation that guides attention and explains change, tuned to shared motion tokens.",
      visual: "motion",
    },
    {
      title: "Accessible to everyone",
      summary: "Semantic HTML, full keyboard support and contrast that holds up in both themes.",
      visual: "accessibility",
    },
  ],
  // Picked from the dependencies of your public GitHub repos. Icons are Simple Icons glyphs
  // (https://simpleicons.org, CC0) in each brand's colour, saved as 120px lossless WebP.
  stack: [
    { name: "React", icon: "/stack/react.webp", docs: "https://react.dev/learn" },
    {
      name: "Next.js",
      icon: "/stack/nextjs.webp",
      docs: "https://nextjs.org/docs",
      invertInDark: true,
    },
    {
      name: "TypeScript",
      icon: "/stack/typescript.webp",
      docs: "https://www.typescriptlang.org/docs/",
    },
    {
      name: "JavaScript",
      icon: "/stack/javascript.webp",
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { name: "Tailwind CSS", icon: "/stack/tailwindcss.webp", docs: "https://tailwindcss.com/docs" },
    {
      name: "CSS",
      icon: "/stack/css.webp",
      docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "HTML",
      icon: "/stack/html.webp",
      docs: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "Redux",
      icon: "/stack/redux.webp",
      docs: "https://redux.js.org/introduction/getting-started",
    },
    { name: "Vite", icon: "/stack/vite.webp", docs: "https://vite.dev/guide/" },
    {
      name: "shadcn/ui",
      icon: "/stack/shadcn-ui.webp",
      docs: "https://ui.shadcn.com/docs",
      invertInDark: true,
    },
    { name: "Git", icon: "/stack/git.webp", docs: "https://git-scm.com/doc" },
    { name: "GSAP", icon: "/stack/gsap.webp", docs: "https://gsap.com/docs/v3/" },
    { name: "Node.js", icon: "/stack/nodejs.webp", docs: "https://nodejs.org/docs/latest/api/" },
    {
      name: "TanStack Query",
      icon: "/stack/tanstack-query.webp",
      docs: "https://tanstack.com/query/latest/docs/framework/react/overview",
    },
    { name: "Storybook", icon: "/stack/storybook.webp", docs: "https://storybook.js.org/docs" },
    { name: "Jest", icon: "/stack/jest.webp", docs: "https://jestjs.io/docs/getting-started" },
  ],
  experience: [],
};
