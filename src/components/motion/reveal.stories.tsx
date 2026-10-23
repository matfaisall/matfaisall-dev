import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Reveal } from "@/components/motion/reveal";

const meta = {
  title: "Motion/Reveal",
  component: Reveal,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { stagger: 0.1, y: 40 },
  argTypes: {
    stagger: { control: { type: "range", min: 0, max: 0.5, step: 0.05 } },
    y: { control: { type: "range", min: 0, max: 120, step: 10 } },
  },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  args: {
    className: "grid gap-4 sm:grid-cols-3",
    children: ["Design", "Build", "Ship"].map((step) => (
      <div key={step} className="rounded-2xl border border-border bg-muted p-6 font-medium">
        {step}
      </div>
    )),
  },
};
