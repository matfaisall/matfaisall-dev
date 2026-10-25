import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStory } from "@/features/projects/components/project-story";
import { getSpotlightProject } from "@/features/projects/data";

// The real project data is plain TypeScript, so the stories use it as it is.
const project = getSpotlightProject();
if (!project) throw new Error("No spotlight project in src/features/projects/data.ts");

const meta = {
  title: "Features/Projects/ProjectStory",
  component: ProjectStory,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { project },
} satisfies Meta<typeof ProjectStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The panel takes the project's accent; the cover fills the other half. */
export const Default: Story = {};

/** Without highlights the card shows the years and the tags. */
export const WithoutHighlights: Story = {
  args: { project: { ...project, highlights: undefined } },
};
