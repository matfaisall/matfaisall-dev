import * as helloWorld from "@/content/blog/hello-world.mdx";

// Every post in src/content/blog must be listed here. The key is the URL slug: /blog/<key>.
// Explicit imports keep posts type-checked and bundled with the build (no file-system reads at runtime).
export const postFiles = {
  "hello-world": helloWorld,
};
