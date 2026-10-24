import type { About } from "@/features/about/types";

// Content for the "who am I" sections. Name, role and links live in `@/config/site`.
// Work history and education follow your LinkedIn profile; the bio and certificates come from the
// personal-branding repo.
export const about: About = {
  headline: "Building fast, animated and accessible web experiences.",
  intro: "I turn complex requirements into interfaces that *feel simple.*",
  bio: [
    "Right now I'm at *DII*, building clean, responsive interfaces with *React, Next.js, TypeScript and Tailwind CSS*.",
    "Before that I spent almost two years at *Infosys Solusi Terpadu* on enterprise products, from Electronic Data Capture to Loan Origination Systems, then joined Ragdalion part-time and remote. The job was always the same: *make complex flows feel simple.*",
    "I'm driven by curiosity: always exploring new tools, frameworks and better ways to build for the web.",
  ],
  portrait: { src: "/about/muhammad-faisal.webp", alt: "Portrait of Muhammad Faisal" },
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
  experience: [
    {
      // TODO: add a summary and highlights for your work here.
      company: "PT Data Integrasi Inovasi",
      role: "Frontend Developer",
      start: "2025-12",
      workplace: "On-site",
      visual: "sprint",
    },
    {
      company: "PT Ragdalion Revolusi Industri",
      role: "Frontend Web Developer",
      start: "2025-07",
      end: "2025-12",
      employment: "Part-time",
      workplace: "Remote",
      visual: "review",
    },
    {
      company: "PT Infosys Solusi Terpadu",
      role: "Frontend Web Developer",
      start: "2023-11",
      end: "2025-08",
      // Hidden for now: uncomment to show the summary, highlights and stack on the card again.
      // summary:
      //   "Drove frontend development for enterprise-grade applications, turning complex business requirements into intuitive, high-performance interfaces.",
      // highlights: [
      //   "Built scalable web apps with React, Next.js and TypeScript.",
      //   "Delivered Electronic Data Capture (EDC) and Loan Origination Systems (LOS) with cross-functional teams.",
      //   "Cut load times by 40% with code splitting and lazy loading.",
      //   "Built responsive UI with Tailwind CSS; managed state with Redux and React Query.",
      // ],
      // stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Query"],
      visual: "pipeline",
    },
  ],
  education: [
    {
      school: "Universitas Muhammadiyah Ponorogo",
      program: "S1, Informatics Engineering",
      kind: "Degree",
      start: "2018-09",
      end: "2022-07",
      // TODO: add a summary (your thesis or what you focused on) and focus tags.
      visual: "graph",
    },
    {
      school: "Dicoding Academy",
      program: "IDCamp 2022: React JS Developer Roadmap",
      kind: "Programme",
      start: "2022-06",
      end: "2022-08",
      summary:
        "Indosat Ooredoo Hutchison's IDCamp scholarship: front-end web development, JavaScript and React.",
      focus: ["JavaScript", "React", "Front-end web"],
      visual: "components",
    },
    {
      school: "Binar Academy",
      program: "UI/UX Research and Design",
      kind: "Programme",
      start: "2022-02",
      end: "2022-07",
      summary:
        "Studi Independen Bersertifikat Kampus Merdeka: researching and designing apps with the Design Thinking method.",
      focus: ["UX research", "Design Thinking", "UI design"],
      visual: "process",
    },
  ],
  certificates: [
    { title: "Fullstack Web & Mobile Developer", issuer: "Pijar Camp" },
    { title: "Belajar Membuat Aplikasi Web dengan React", issuer: "Dicoding" },
    { title: "Belajar Membuat Front-End Web untuk Pemula", issuer: "Dicoding" },
    { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding" },
    { title: "UI/UX Research and Design", issuer: "Binar Academy" },
    { title: "Responsive Web Design", issuer: "freeCodeCamp" },
    { title: "Legacy JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp" },
    // TODO: add the issuer of these two.
    { title: "Pemrograman TypeScript: Pemula sampai Mahir" },
    { title: "Pemrograman JavaScript: Pemula sampai Mahir" },
  ],
  impact: [{ value: "40%", label: "Faster load times at Infosys" }],
  milestones: [
    { date: "2018-09", label: "Started Informatics" },
    { date: "2022-02", label: "UI/UX at Binar" },
    { date: "2022-06", label: "React at IDCamp" },
    { date: "2023-11", label: "Joined Infosys" },
    { date: "2025-07", label: "Remote at Ragdalion" },
    { date: "2025-12", label: "Joined Data Integrasi" },
  ],
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    source: "Computer scientist",
  },
};
