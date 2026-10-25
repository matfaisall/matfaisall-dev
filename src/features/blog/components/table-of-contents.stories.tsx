import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { examplePost } from "@/features/blog/fixtures";

const meta = {
  title: "Features/Blog/TableOfContents",
  component: TableOfContents,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { items: examplePost.toc },
  decorators: [
    (Story) => (
      <div className="w-52">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The first heading is marked until the page scrolls; h3s sit one step further in. */
export const Default: Story = {};
