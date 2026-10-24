import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wipe } from "@/components/motion/wipe";

const meta = {
  title: "Motion/Wipe",
  component: Wipe,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { duration: 2.4 },
  argTypes: {
    duration: { control: { type: "range", min: 0.4, max: 4, step: 0.2 } },
  },
} satisfies Meta<typeof Wipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: {
    className: "max-w-xl text-primary",
    children: (
      <svg aria-hidden="true" viewBox="0 0 400 120" fill="none" className="w-full">
        <path d="M0 110 C160 105 260 80 400 10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
};
