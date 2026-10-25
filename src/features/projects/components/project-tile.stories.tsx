import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectTile } from "@/features/projects/components/project-tile";
import { getProjects } from "@/features/projects/data";

const projects = getProjects();

const meta = {
  title: "Features/Projects/ProjectTile",
  component: ProjectTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { project: projects[1] },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every project, to compare the seven illustrations and accents side by side. */
export const AllProjects: Story = {
  decorators: [() => <div />],
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectTile key={project.slug} project={project} />
      ))}
    </div>
  ),
};
