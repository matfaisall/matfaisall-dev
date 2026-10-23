import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Get in touch" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "secondary", "outline", "ghost"] },
    size: { control: "inline-radio", options: ["default", "sm", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const WithIcon: Story = {
  args: {
    children: (
      <>
        View project <ArrowUpRightIcon />
      </>
    ),
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="https://github.com/matfaisall">Rendered as an anchor</a>,
  },
};
