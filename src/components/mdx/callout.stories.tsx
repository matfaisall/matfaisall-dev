import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Callout } from "@/components/mdx/callout";

const meta = {
  title: "MDX/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { type: "note", children: "Text inside the callout, written in Markdown in a post." },
  argTypes: { type: { control: "inline-radio", options: ["note", "tip", "warning"] } },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Note: Story = {};

export const Tip: Story = { args: { type: "tip", title: "Good to know" } };

export const Warning: Story = { args: { type: "warning" } };
