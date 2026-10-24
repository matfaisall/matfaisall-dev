import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutHero } from "@/features/about/components/about-hero";

const meta = {
  title: "Features/About/AboutHero",
  component: AboutHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    name: "Muhammad Faisal",
    role: "Frontend Engineer",
    location: "Indonesia",
    intro: "I turn complex requirements into interfaces that *feel simple.*",
    bio: [
      "Right now I'm at *Current Company*, building clean, responsive interfaces with *React and Next.js*.",
      "I'm driven by curiosity and continuous learning.",
    ],
    portrait: { src: "/about/muhammad-faisal.webp", alt: "Portrait of Muhammad Faisal" },
    current: { role: "Frontend Developer", company: "Current Company" },
    githubUrl: "https://github.com/matfaisall",
    linkedinUrl: "https://www.linkedin.com/in/matfaisall",
    email: "hello@example.com",
  },
} satisfies Meta<typeof AboutHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Words between *asterisks* are set in the accent italic in `intro`, and in the foreground colour
 * in `bio`.
 */
export const Default: Story = {};

/** Between jobs: no status line above the introduction. */
export const WithoutCurrentRole: Story = { args: { current: undefined } };
