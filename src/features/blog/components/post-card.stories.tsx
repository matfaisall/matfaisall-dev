import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostCard } from "@/features/blog/components/post-card";
import { examplePost as post } from "@/features/blog/fixtures";

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
