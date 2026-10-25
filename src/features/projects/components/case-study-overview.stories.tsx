import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyOverview } from "@/features/projects/components/case-study-overview";
import { getProjects } from "@/features/projects/data";

const projects = getProjects();

const meta = {
  title: "Features/Projects/CaseStudyOverview",
  component: CaseStudyOverview,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { project: projects[0] },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseStudyOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The cover on one side; what it is, who it's for and what it's used for on the other. */
export const Default: Story = {};

/** Where the repo's total commits say something, the facts show both. */
export const WithTotalCommits: Story = {
  args: { project: projects.find((project) => project.commits?.total) ?? projects[0] },
};
