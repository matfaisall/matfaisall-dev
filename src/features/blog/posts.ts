import * as apiErrors from "@/content/blog/api-errors-your-frontend-can-use/index.mdx";
import * as conventionalCommits from "@/content/blog/conventional-commits-that-help/index.mdx";
import * as featureFolders from "@/content/blog/organising-a-nextjs-app-by-feature/index.mdx";
import * as serverComponents from "@/content/blog/react-server-components-without-the-jargon/index.mdx";
import * as scrollAnimations from "@/content/blog/scroll-animations-with-gsap/index.mdx";
import * as satisfies from "@/content/blog/typescript-satisfies/index.mdx";

// Every post in src/content/blog/<slug>/index.mdx must be listed here. The key is the URL slug
// (/blog/<key>) and matches the folder name. The order doesn't matter: posts sort by date.
// Explicit imports keep posts type-checked and bundled with the build (no file-system reads at runtime).
export const postFiles = {
  "organising-a-nextjs-app-by-feature": featureFolders,
  "react-server-components-without-the-jargon": serverComponents,
  "typescript-satisfies": satisfies,
  "api-errors-your-frontend-can-use": apiErrors,
  "conventional-commits-that-help": conventionalCommits,
  "scroll-animations-with-gsap": scrollAnimations,
};
