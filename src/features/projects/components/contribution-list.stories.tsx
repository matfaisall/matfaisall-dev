import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContributionList } from "@/features/projects/components/contribution-list";
import { getContributions } from "@/features/projects/data";

const meta = {
  title: "Features/Projects/ContributionList",
  component: ContributionList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { contributions: getContributions() },
} satisfies Meta<typeof ContributionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
