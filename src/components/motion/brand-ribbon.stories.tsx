import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandRibbon } from "@/components/motion/brand-ribbon";

const meta = {
  title: "Motion/BrandRibbon",
  component: BrandRibbon,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { className: "h-[32rem] w-full" },
} satisfies Meta<typeof BrandRibbon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Switch the toolbar theme: each theme has its own amber gradient. */
export const Default: Story = {};

export const FadedLeft: Story = {
  args: { className: "h-[32rem] w-full mask-l-from-40% mask-l-to-80%" },
};
