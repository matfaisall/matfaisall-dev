import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyHero } from "@/features/projects/components/case-study-hero";
import { getNextProject, getProjectBySlug, getProjects } from "@/features/projects/data";

const projects = getProjects();
const project = projects[0];

const meta = {
  title: "Features/Projects/CaseStudyHero",
  component: CaseStudyHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { project, next: getNextProject(project) },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl pb-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseStudyHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An internal tool: a pill says there's no public link. */
export const Default: Story = {};

/** A public site with its address set shows a "Visit the site" button. */
export const WithLiveLink: Story = {
  args: (() => {
    const site = getProjectBySlug("nuha-care") ?? project;
    return {
      project: { ...site, links: { live: "https://example.com" } },
      next: getNextProject(site),
    };
  })(),
};
