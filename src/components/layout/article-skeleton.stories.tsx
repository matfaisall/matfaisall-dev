import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleSkeleton } from "@/components/layout/article-skeleton";

const meta = {
  title: "Layout/ArticleSkeleton",
  component: ArticleSkeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ArticleSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
