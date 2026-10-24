import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RibbonCanvas } from "@/components/motion/ribbon-canvas";

const meta = {
  title: "Motion/RibbonCanvas",
  component: RibbonCanvas,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-[32rem] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RibbonCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The original Mintlify-style green. */
export const Default: Story = {};

export const Amber: Story = {
  args: { settings: { colorStart: "#f97316", colorEnd: "#fcd34d" } },
};

export const Calm: Story = {
  args: { settings: { count: 16, amplitude: 100, speed: 0.4 } },
};
