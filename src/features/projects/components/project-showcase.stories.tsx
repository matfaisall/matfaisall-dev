import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProjectShowcase } from "@/features/projects/components/project-showcase";
import type { Project } from "@/features/projects/types";

const base = {
  summary: "Short summary of what the project does and the problem it solves.",
  year: 2026,
  tags: ["Next.js", "TypeScript"],
  featured: true,
  links: {},
} satisfies Partial<Project>;

const projects: Project[] = [
  { ...base, slug: "one", title: "First Project" },
  { ...base, slug: "two", title: "Second Project" },
  { ...base, slug: "three", title: "Third Project" },
];

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

/** Projects without covers or accents: colours rotate and the drawn preview stands in. */
export const Default: Story = {};
