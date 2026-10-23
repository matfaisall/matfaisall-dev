import { cn as mergeClassNames } from "cn";

/**
 * Merges class names and resolves Tailwind conflicts: cn("px-2", isActive && "px-4") → "px-4".
 * Backed by the `cn` package (clsx + tailwind-merge in one). Defined here, not re-exported,
 * so the whole app imports it from `@/lib/utils` and the implementation can change in one place.
 */
export const cn = mergeClassNames;
