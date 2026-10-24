import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PathDot } from "@/components/motion/path-dot";

const curve = "M20 120 C54.4 59 76.8 20 180 20";

const meta = {
  title: "Motion/PathDot",
  component: PathDot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { path: curve, duration: 2.4, radius: 4, className: "fill-primary" },
  argTypes: {
    duration: { control: { type: "range", min: 0.6, max: 6, step: 0.2 } },
  },
  decorators: [
    (Story) => (
      <svg aria-hidden="true" viewBox="0 0 200 140" fill="none" className="h-36 w-52">
        <path d={curve} className="stroke-border" strokeWidth="2" />
        <Story />
      </svg>
    ),
  ],
} satisfies Meta<typeof PathDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
