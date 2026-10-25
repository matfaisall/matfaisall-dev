import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryTabs } from "@/features/blog/components/category-tabs";

const meta = {
  title: "Features/Blog/CategoryTabs",
  component: CategoryTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof CategoryTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllArticles: Story = {};

export const OneCategory: Story = { args: { active: "architecture" } };
