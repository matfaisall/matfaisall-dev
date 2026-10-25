import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ShareLinks } from "@/features/blog/components/share-links";

const meta = {
  title: "Features/Blog/ShareLinks",
  component: ShareLinks,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    url: "https://matfaisall.dev/blog/typescript-satisfies",
    title: "TypeScript's satisfies, and when to reach for it",
  },
} satisfies Meta<typeof ShareLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
