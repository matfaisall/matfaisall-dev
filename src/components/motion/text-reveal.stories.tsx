import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextReveal } from "@/components/motion/text-reveal";

const meta = {
  title: "Motion/TextReveal",
  component: TextReveal,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    as: "h1",
    trigger: "load",
    children: "Hi, I'm Faisal. I build fast, animated web experiences.",
    className: "max-w-3xl font-semibold text-6xl tracking-tight",
  },
  argTypes: {
    as: { control: "inline-radio", options: ["h1", "h2", "h3", "p"] },
    trigger: { control: "inline-radio", options: ["load", "scroll"] },
  },
} satisfies Meta<typeof TextReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {};

export const Paragraph: Story = {
  args: {
    as: "p",
    children:
      "I care about clean code as much as the last millisecond of an easing curve, because great experiences are built in both places.",
    className: "max-w-2xl text-2xl text-muted-foreground",
  },
};
