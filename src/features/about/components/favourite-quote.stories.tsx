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

/** A quote in another language: `lang` for screen readers and a translation under it. */
export const Translated: Story = {
  args: {
    quote: {
      text: "Sedikit demi sedikit, lama-lama menjadi bukit.",
      author: "Indonesian proverb",
      lang: "id",
      translation: "Little by little, it becomes a hill.",
    },
  },
};
