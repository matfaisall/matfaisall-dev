import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCard } from "@/features/projects/components/project-card";
import type { Project } from "@/features/projects/types";

const project: Project = {
  slug: "example-project",
  title: "Example Project",
  summary: "Short summary of what the project does and the problem it solves.",
  year: 2026,
  tags: ["Next.js", "TypeScript", "GSAP"],
  featured: true,
  links: { repository: "https://github.com/matfaisall" },
};

const meta = {
  title: "Features/Projects/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  args: { project },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLink: Story = {
  args: { project: { ...project, links: {} } },
};
