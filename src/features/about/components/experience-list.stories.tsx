import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExperienceList } from "@/features/about/components/experience-list";

const meta = {
  title: "Features/About/ExperienceList",
  component: ExperienceList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    experience: [
      {
        company: "Current Company",
        role: "Frontend Developer",
        start: "2025-12",
        workplace: "On-site",
        visual: "sprint",
      },
      {
        company: "Side Project Studio",
        role: "Frontend Web Developer",
        start: "2025-07",
        end: "2025-12",
        employment: "Part-time",
        workplace: "Remote",
        visual: "review",
      },
      {
        company: "Previous Company",
        role: "Frontend Web Developer",
        start: "2023-11",
        end: "2025-08",
        summary: "What you owned there, in one or two sentences.",
        highlights: ["Something you built.", "Something you made faster or simpler."],
        stack: ["React", "Next.js", "TypeScript"],
        visual: "pipeline",
      },
    ],
  },
} satisfies Meta<typeof ExperienceList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The current role (no `end`) gets a filled node and a "Now" chip; past roles show how long they
 * lasted. `visual` picks the illustration beside the text.
 */
export const Default: Story = {};

export const WithoutVisuals: Story = {
  args: {
    experience: [
      {
        company: "Previous Company",
        role: "Frontend Web Developer",
        start: "2023-11",
        end: "2025-08",
        summary: "What you owned there, in one or two sentences.",
      },
    ],
  },
};

export const Empty: Story = { args: { experience: [] } };
