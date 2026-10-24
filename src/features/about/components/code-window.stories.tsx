import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeWindow } from "@/features/about/components/code-window";

const meta = {
  title: "Features/About/CodeWindow",
  component: CodeWindow,
  tags: ["autodocs"],
  args: {
    handle: "matfaisall",
    name: "Muhammad Faisal",
    role: "Frontend Engineer",
    location: "Indonesia",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    focus: ["performance", "motion", "accessibility"],
    className: "w-[36rem]",
  },
} satisfies Meta<typeof CodeWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
