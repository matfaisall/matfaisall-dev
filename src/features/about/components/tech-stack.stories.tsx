import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TechStack } from "@/features/about/components/tech-stack";

const meta = {
  title: "Features/About/TechStack",
  component: TechStack,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    githubUrl: "https://github.com/matfaisall",
    stack: [
      { name: "React", icon: "/stack/react.webp", docs: "https://react.dev/learn" },
      {
        name: "Next.js",
        icon: "/stack/nextjs.webp",
        docs: "https://nextjs.org/docs",
        invertInDark: true,
      },
      {
        name: "TypeScript",
        icon: "/stack/typescript.webp",
        docs: "https://www.typescriptlang.org/docs/",
      },
      {
        name: "JavaScript",
        icon: "/stack/javascript.webp",
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Tailwind CSS",
        icon: "/stack/tailwindcss.webp",
        docs: "https://tailwindcss.com/docs",
      },
      {
        name: "CSS",
        icon: "/stack/css.webp",
        docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "HTML",
        icon: "/stack/html.webp",
        docs: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      { name: "GSAP", icon: "/stack/gsap.webp", docs: "https://gsap.com/docs/v3/" },
      { name: "Redux", icon: "/stack/redux.webp", docs: "https://redux.js.org/" },
      { name: "Vite", icon: "/stack/vite.webp", docs: "https://vite.dev/guide/" },
      { name: "Node.js", icon: "/stack/nodejs.webp", docs: "https://nodejs.org/docs/latest/api/" },
      { name: "Jest", icon: "/stack/jest.webp", docs: "https://jestjs.io/docs/getting-started" },
      { name: "Storybook", icon: "/stack/storybook.webp", docs: "https://storybook.js.org/docs" },
      {
        name: "Material UI",
        icon: "/stack/mui.webp",
        docs: "https://mui.com/material-ui/getting-started/",
      },
      {
        name: "TanStack Query",
        icon: "/stack/tanstack-query.webp",
        docs: "https://tanstack.com/query/latest/docs/framework/react/overview",
      },
      {
        name: "shadcn/ui",
        icon: "/stack/shadcn-ui.webp",
        docs: "https://ui.shadcn.com/docs",
        invertInDark: true,
      },
    ],
  },
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sixteen tools: eight at a time, swapping every five seconds. Hover the grid to hold it. */
export const Default: Story = {};

/** Eight or fewer tools stay put. */
export const Static: Story = {
  args: { stack: meta.args.stack.slice(0, 8) },
};
