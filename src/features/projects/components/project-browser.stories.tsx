import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectBrowser } from "@/features/projects/components/project-browser";
import { ProjectSpotlight } from "@/features/projects/components/project-spotlight";
import { ProjectTile } from "@/features/projects/components/project-tile";
import { getProjects, getSpotlightProject } from "@/features/projects/data";

const spotlight = getSpotlightProject();
const rest = getProjects().filter((project) => project.slug !== spotlight?.slug);

const meta = {
  title: "Features/Projects/ProjectBrowser",
  component: ProjectBrowser,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    spotlight: spotlight && {
      slug: spotlight.slug,
      industry: spotlight.industry,
      card: <ProjectSpotlight project={spotlight} />,
    },
    tiles: rest.map((project) => ({
      slug: project.slug,
      industry: project.industry,
      card: <ProjectTile project={project} />,
    })),
  },
} satisfies Meta<typeof ProjectBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pick a tab to filter the cards; the counts come from the cards passed in. */
export const Default: Story = {};
