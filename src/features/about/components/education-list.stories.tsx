import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EducationList } from "@/features/about/components/education-list";

const meta = {
  title: "Features/About/EducationList",
  component: EducationList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    education: [
      {
        school: "University Name",
        program: "S1, Informatics Engineering",
        kind: "Degree",
        start: "2018-09",
        end: "2022-07",
        visual: "graph",
      },
      {
        school: "Academy Name",
        program: "Frontend Programme",
        kind: "Programme",
        start: "2022-06",
        end: "2022-08",
        summary: "What the programme covered, in one sentence.",
        focus: ["JavaScript", "React"],
        visual: "components",
      },
      {
        school: "Bootcamp Name",
        program: "Fullstack Web Developer",
        kind: "Bootcamp",
        start: "2023-07",
        focus: ["UX research", "Design Thinking"],
        visual: "process",
      },
    ],
  },
} satisfies Meta<typeof EducationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
