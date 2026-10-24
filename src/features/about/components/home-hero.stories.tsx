import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HomeHero } from "@/features/about/components/home-hero";

const meta = {
  title: "Features/About/HomeHero",
  component: HomeHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    name: "Muhammad Faisal",
    handle: "matfaisall",
    role: "Frontend Engineer",
    location: "Indonesia",
    headline: "Building fast, animated and accessible web experiences.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    focus: ["performance", "motion", "accessibility"],
    githubUrl: "https://github.com/matfaisall",
    email: "hello@example.com",
    projects: [
      { title: "Example Project", year: 2026 },
      { title: "Example Dashboard", year: 2026 },
      { title: "Example Landing Page", year: 2025 },
    ],
  },
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
