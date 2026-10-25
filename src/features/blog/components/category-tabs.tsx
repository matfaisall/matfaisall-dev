import { RssSimpleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { type CategorySlug, categories } from "@/features/blog/categories";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/blog", label: "All articles", slug: undefined },
  ...categories.map((category) => ({
    href: `/blog/category/${category.slug}`,
    label: category.label,
    slug: category.slug,
  })),
];

/**
 * The category tabs under the featured post: an amber underline marks the page you're on, and
 * the RSS feed sits at the end. On phones the row scrolls sideways.
 */
export function CategoryTabs({ active }: { active?: CategorySlug }) {
  return (
    <nav
      aria-label="Blog categories"
      className="flex items-center justify-between gap-6 border-border border-b"
    >
      <ul className="mask-r-from-85% sm:mask-none scrollbar-none -mb-px flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const current = tab.slug === active;
          return (
            <li key={tab.href} className="shrink-0">
              <Link
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-block whitespace-nowrap border-b-2 py-3 text-sm transition-colors",
                  current
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <a
        href="/blog/rss.xml"
        aria-label="RSS feed"
        className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
      >
        <RssSimpleIcon aria-hidden="true" className="size-4" />
      </a>
    </nav>
  );
}
