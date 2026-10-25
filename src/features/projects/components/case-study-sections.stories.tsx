import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CaseStudyModules,
  CaseStudyScreens,
} from "@/features/projects/components/case-study-sections";
import { getProjects } from "@/features/projects/data";

const project = getProjects()[0];

const meta = {
  title: "Features/Projects/CaseStudySections",
  component: CaseStudyModules,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { project },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseStudyModules>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The parts you owned as numbered rows. */
export const Modules: Story = {};

/** The screenshots, each framed as a browser window with its caption. */
export const Screens: Story = {
  render: (args) => <CaseStudyScreens {...args} />,
};
