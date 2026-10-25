import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReadingProgress } from "@/features/blog/components/reading-progress";

const meta = {
  title: "Features/Blog/ReadingProgress",
  component: ReadingProgress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { minutes: 5, bodyId: "story-body", className: "flex" },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-[11rem_1fr] gap-12">
        <div className="sticky top-6 self-start">
          <Story />
        </div>
        <div id="story-body" className="flex h-[250vh] flex-col gap-4 text-muted-foreground">
          <p>Scroll down: the bar fills and the minutes count down as this text passes.</p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ReadingProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
