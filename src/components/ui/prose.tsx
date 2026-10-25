import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Typography for long-form content (blog posts, MDX). Styles plain HTML: headings, lists, tables, code. */
export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-stone dark:prose-invert max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        // Headings are link targets for a post's table of contents: keep them clear of the sticky header.
        "prose-headings:scroll-mt-24",
        // amber-800 (dark primary) is too dark for text on the dark background, so links use foreground there.
        "prose-a:text-primary prose-a:decoration-primary prose-a:underline-offset-4 dark:prose-a:text-foreground",
        "prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
      {...props}
    />
  );
}
