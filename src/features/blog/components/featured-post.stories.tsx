import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturedPost } from "@/features/blog/components/featured-post";
import { exampleAuthor, examplePost } from "@/features/blog/fixtures";

const meta = {
  title: "Features/Blog/FeaturedPost",
  component: FeaturedPost,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { post: examplePost, author: exampleAuthor },
} satisfies Meta<typeof FeaturedPost>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without a `cover`, the post gets the illustration for its category. */
export const Default: Story = {};
