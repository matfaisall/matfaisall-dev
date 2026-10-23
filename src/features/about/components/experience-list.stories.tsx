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
        company: "Company Name",
        role: "Frontend Engineer",
        start: "2024-03",
        summary: "What you built, owned or improved there, in one or two sentences.",
      },
      {
        company: "Previous Company",
        role: "Junior Developer",
        start: "2022-01",
        end: "2024-02",
        summary: "What you built, owned or improved there, in one or two sentences.",
      },
    ],
  },
} satisfies Meta<typeof ExperienceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { experience: [] } };
