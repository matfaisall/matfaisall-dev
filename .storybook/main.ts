import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  // Stories live next to the component they document: `button.tsx` → `button.stories.tsx`.
  // Docs pages live in src/stories; blog posts in src/content are MDX too but are not stories.
  stories: ["../src/stories/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
  // Next.js compiles Tailwind through Turbopack; Storybook runs on Vite, so it needs the Vite plugin.
  viteFinal: async (viteConfig) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(viteConfig, { plugins: [tailwindcss()] });
  },
};

export default config;
