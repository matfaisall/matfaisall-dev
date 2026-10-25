import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProjectShowcase } from "@/features/projects/components/project-showcase";
import { getFeaturedProjects } from "@/features/projects/data";

const projects = getFeaturedProjects();

const meta = {
  title: "Features/Projects/ProjectShowcase",
  component: ProjectShowcase,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { projects },
  render: (args) => (
    <Carousel>
      <div className="py-12">
        <div className="mx-auto mb-6 flex max-w-6xl justify-end gap-2 px-6 md:px-12">
          <CarouselPrevious label="Previous project" />
          <CarouselNext label="Next project" />
        </div>
        <ProjectShowcase {...args} />
      </div>
    </Carousel>
  ),
} satisfies Meta<typeof ProjectShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The featured projects, each on its own accent. */
export const Default: Story = {};
