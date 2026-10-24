import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { aboutFile, contactFile, projectsFile } from "@/features/about/components/code-files";
import { CodeWindow } from "@/features/about/components/code-window";

const files = [
  aboutFile({
    handle: "matfaisall",
    name: "Muhammad Faisal",
    role: "Frontend Engineer",
    location: "Indonesia",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    focus: ["performance", "motion", "accessibility"],
  }),
  projectsFile([
    { title: "Example Project", year: 2026 },
    { title: "Example Dashboard", year: 2026 },
    { title: "Example Landing Page", year: 2025 },
  ]),
  contactFile({ email: "hello@example.com", githubUrl: "https://github.com/matfaisall" }),
];

const meta = {
  title: "Features/About/CodeWindow",
  component: CodeWindow,
  tags: ["autodocs"],
  args: { handle: "matfaisall", files, className: "w-[36rem]" },
} satisfies Meta<typeof CodeWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a file in the sidebar to open it. On narrow screens the tabs switch files instead. */
export const Default: Story = {};

export const SingleFile: Story = {
  args: { files: files.slice(0, 1) },
};
