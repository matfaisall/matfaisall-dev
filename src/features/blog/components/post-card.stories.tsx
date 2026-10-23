import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostCard } from "@/features/blog/components/post-card";
import type { Post } from "@/features/blog/types";

const post: Post = {
  slug: "hello-world",
  title: "Hello, world",
  summary: "Why I built this site and what I'll be writing about.",
  publishedAt: "2026-10-23",
  tags: ["Meta", "Next.js"],
};

const meta = {
  title: "Features/Blog/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: { post },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
