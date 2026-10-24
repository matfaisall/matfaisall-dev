import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStory } from "@/features/projects/components/project-story";
import type { Project } from "@/features/projects/types";

const project: Project = {
  slug: "example-dashboard",
  title: "Example Dashboard",
  summary: "A data-heavy app with charts, tables and realtime updates.",
  year: 2026,
  tags: ["React", "TanStack Query", "Recharts"],
  featured: true,
  links: { repository: "https://github.com/matfaisall" },
  cover: {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    alt: "Performance analytics charts on a laptop screen",
    credit: "Luke Chesser on Unsplash",
  },
  accent: "blue",
};

const meta = {
  title: "Features/Projects/ProjectStory",
  component: ProjectStory,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { project, fallbackAccent: "orange" },
} satisfies Meta<typeof ProjectStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without highlights the card shows the year and the stack. */
export const Default: Story = {};

export const WithHighlights: Story = {
  args: {
    project: {
      ...project,
      highlights: [
        { value: "40%", label: "Faster first load" },
        { value: "12k", label: "Rows rendered without jank" },
      ],
    },
  },
};

/** No cover yet: the drawn browser window stands in, on the fallback colour. */
export const WithoutCover: Story = {
  args: { project: { ...project, cover: undefined, accent: undefined } },
};
