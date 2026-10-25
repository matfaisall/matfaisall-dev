import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectSpotlight } from "@/features/projects/components/project-spotlight";
import { getProjects, getSpotlightProject } from "@/features/projects/data";

const project = getSpotlightProject() ?? getProjects()[0];

const meta = {
  title: "Features/Projects/ProjectSpotlight",
  component: ProjectSpotlight,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { project },
} satisfies Meta<typeof ProjectSpotlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
