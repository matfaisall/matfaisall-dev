import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Capabilities } from "@/features/about/components/capabilities";

const meta = {
  title: "Features/About/Capabilities",
  component: Capabilities,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    capabilities: [
      {
        title: "Fast by default",
        summary: "Server-first rendering, lean bundles and media that never shifts the layout.",
        visual: "performance",
      },
      {
        title: "Motion with intent",
        summary: "Animation that guides attention and explains change.",
        visual: "motion",
      },
      {
        title: "Accessible to everyone",
        summary: "Semantic HTML, full keyboard support and contrast that holds up in both themes.",
        visual: "accessibility",
      },
    ],
  },
} satisfies Meta<typeof Capabilities>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
