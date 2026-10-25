import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostHeader } from "@/features/blog/components/post-header";
import { examplePost } from "@/features/blog/fixtures";

const meta = {
  title: "Features/Blog/PostHeader",
  component: PostHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { post: examplePost },
} satisfies Meta<typeof PostHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Updated: Story = { args: { post: { ...examplePost, updatedAt: "2026-11-02" } } };
