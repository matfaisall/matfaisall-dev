import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FavouriteQuote } from "@/features/about/components/favourite-quote";

const meta = {
  title: "Features/About/FavouriteQuote",
  component: FavouriteQuote,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    quote: {
      text: "Simplicity is prerequisite for reliability.",
      author: "Edsger W. Dijkstra",
      source: "Computer scientist",
    },
  },
} satisfies Meta<typeof FavouriteQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
