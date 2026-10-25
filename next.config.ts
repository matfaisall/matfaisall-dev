import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Compiles `.mdx` files (blog posts in src/content/blog) into React components.
// Plugins are passed by name, or by absolute path for our own, because Turbopack can't receive
// JavaScript functions. remark-post-meta adds heading ids, the reading time and the table of
// contents; rehype-pretty-code highlights code blocks at build time, in a light and a dark theme.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", path.resolve("src/lib/mdx/remark-post-meta.mjs")],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
