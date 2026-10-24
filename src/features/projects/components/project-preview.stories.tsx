import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectPreview } from "@/features/projects/components/project-preview";

// The layout is picked from the slug, so each story uses a slug that lands on a different one.
const meta = {
  title: "Features/Projects/ProjectPreview",
  component: ProjectPreview,
  tags: ["autodocs"],
  args: { slug: "example-project", title: "Example Project" },
  decorators: [
    (Story) => (
      <div className="group aspect-[16/9] w-96 overflow-hidden rounded-xl border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Landing: Story = {};

export const Docs: Story = {
  args: { slug: "example-dashboard", title: "Example Dashboard" },
};

export const Dashboard: Story = {
  args: { slug: "example-docs-site", title: "Example Docs Site" },
};
