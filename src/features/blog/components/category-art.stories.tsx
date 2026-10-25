import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { categories } from "@/features/blog/categories";
import { CategoryArt } from "@/features/blog/components/category-art";

const meta = {
  title: "Features/Blog/CategoryArt",
  component: CategoryArt,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { category: "frontend" },
  argTypes: {
    category: { control: "select", options: categories.map((category) => category.slug) },
  },
  decorators: [
    (Story) => (
      <div className="relative aspect-video w-96 overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryArt>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The cover a post gets when it has no image. Pick a category in the controls. */
export const Default: Story = {};

export const AllCategories: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative aspect-video w-72 overflow-hidden rounded-lg border border-border"
          >
            <CategoryArt category={category.slug} />
          </div>
        ))}
      </div>
    ),
  ],
};
