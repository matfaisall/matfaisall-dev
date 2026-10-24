import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrowthStats } from "@/features/about/components/growth-stats";

const meta = {
  title: "Features/About/GrowthStats",
  component: GrowthStats,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    stats: [
      { label: "Shipping to production since", value: "2023" },
      { label: "Companies I've shipped for", value: "03" },
      { label: "Faster load times", value: "40%" },
      { label: "Certificates earned along the way", value: "09" },
    ],
    milestones: [
      { date: "2018-09", label: "Started university" },
      { date: "2022-02", label: "First programme" },
      { date: "2023-11", label: "First job" },
      { date: "2025-07", label: "Went remote" },
      { date: "2025-12", label: "Current job" },
    ],
  },
} satisfies Meta<typeof GrowthStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Milestone labels show from the `lg` breakpoint; below it the nodes stay on the curve. */
export const Default: Story = {};
