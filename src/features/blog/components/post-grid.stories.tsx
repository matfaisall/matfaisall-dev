import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostGrid } from "@/features/blog/components/post-grid";
import { examplePosts } from "@/features/blog/fixtures";

const meta = {
  title: "Features/Blog/PostGrid",
  component: PostGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { posts: examplePosts },
} satisfies Meta<typeof PostGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { posts: [], empty: "No posts here yet." } };
