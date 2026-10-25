import { siteConfig } from "@/config/site";
import { CategoryTabs } from "@/features/blog/components/category-tabs";
import { FeaturedPost } from "@/features/blog/components/featured-post";
import { PostGrid } from "@/features/blog/components/post-grid";
import { author, getFeaturedPost, getPosts } from "@/features/blog/data";
import { createPageMetadata } from "@/lib/seo";

const pageMetadata = createPageMetadata({
  title: "Blog",
  description: `Articles and notes by ${siteConfig.name} on frontend, backend, architecture, languages and tooling.`,
  path: "/blog",
});

export const metadata = {
  ...pageMetadata,
  // Lets feed readers find the RSS feed from the page.
  alternates: { ...pageMetadata.alternates, types: { "application/rss+xml": "/blog/rss.xml" } },
};

// Mintlify-style blog index: the featured post large, then the category tabs and every other post.
export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = getPosts().filter((post) => post.slug !== featured?.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28">
      <h1 className="relative max-w-2xl text-balance font-medium text-3xl tracking-tight md:text-4xl">
        <span
          aria-hidden="true"
          className="absolute top-[0.2em] -left-6 h-[0.9em] w-0.5 bg-primary md:-left-12"
        />
        Blog.
        <span className="text-muted-foreground"> Notes on building for the web, end to end.</span>
      </h1>
      {featured && (
        <div className="mt-10 md:mt-14">
          <FeaturedPost post={featured} author={author} />
        </div>
      )}
      <div className="mt-12 md:mt-16">
        <CategoryTabs />
      </div>
      <div className="mt-10">
        <PostGrid posts={rest} />
      </div>
    </div>
  );
}
