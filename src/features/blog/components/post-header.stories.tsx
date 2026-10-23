import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostHeader } from "@/features/blog/components/post-header";

const meta = {
  title: "Features/Blog/PostHeader",
  component: PostHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    post: {
      slug: "hello-world",
      title: "Hello, world",
      summary: "Why I built this site and what I'll be writing about.",
      publishedAt: "2026-10-23",
      tags: ["Meta"],
    },
  },
} satisfies Meta<typeof PostHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Updated: Story = {
  args: {
    post: {
      slug: "hello-world",
      title: "Hello, world",
      summary: "Why I built this site and what I'll be writing about.",
      publishedAt: "2026-10-23",
      updatedAt: "2026-11-02",
      tags: ["Meta"],
    },
  },
};
