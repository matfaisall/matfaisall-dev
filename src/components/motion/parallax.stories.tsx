import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Parallax } from "@/components/motion/parallax";

const meta = {
  title: "Motion/Parallax",
  component: Parallax,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { speed: 0.4 },
  argTypes: {
    speed: { control: { type: "range", min: -1, max: 1, step: 0.1 } },
  },
  // Extra space above and below so there is something to scroll through.
  decorators: [
    (Story) => (
      <div className="flex min-h-[250vh] items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Parallax>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "grid size-64 place-items-center rounded-3xl bg-primary text-primary-foreground",
    children: "Scroll me",
  },
};
