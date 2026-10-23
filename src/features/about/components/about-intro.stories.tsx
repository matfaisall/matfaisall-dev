import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutIntro } from "@/features/about/components/about-intro";

const meta = {
  title: "Features/About/AboutIntro",
  component: AboutIntro,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "Faisal",
    role: "Frontend Engineer",
    bio: "I build fast, accessible interfaces and care about the details that make a product feel alive.",
    skills: ["TypeScript", "React", "Next.js", "GSAP"],
  },
} satisfies Meta<typeof AboutIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutBio: Story = { args: { bio: "", skills: [] } };
