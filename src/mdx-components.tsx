import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Callout } from "@/components/mdx/callout";
import { Figure } from "@/components/mdx/figure";

// Required by @next/mdx. Maps Markdown elements to React components for every MDX file, and makes
// <Callout> and <Figure> available in every post without an import. Typography styles come from
// the <Prose> wrapper; only behaviour is customised here.

function MdxLink({ href = "", ...props }: ComponentProps<"a">) {
  // Internal links use next/link for client-side navigation; external ones open in a new tab.
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

const components: MDXComponents = {
  a: MdxLink,
  Callout,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
