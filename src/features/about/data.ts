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
  experience: [],
};
