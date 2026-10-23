import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Prose } from "@/components/ui/prose";

const meta = {
  title: "UI/Prose",
  component: Prose,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    className: "max-w-2xl",
    children: (
      <>
        <h2>A heading</h2>
        <p>
          Body text with a link to <a href="https://github.com/matfaisall">my GitHub profile</a>,
          some <strong>bold</strong> text and <code>inline code</code>.
        </p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
        <blockquote>A quote that stands out from the text.</blockquote>
      </>
    ),
  },
};
