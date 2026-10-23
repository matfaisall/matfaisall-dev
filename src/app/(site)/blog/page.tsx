import { siteConfig } from "@/config/site";
import { PostList } from "@/features/blog/components/post-list";
import { getPosts } from "@/features/blog/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description: `Articles and notes by ${siteConfig.name} on frontend engineering, animation and the web.`,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-12 font-semibold text-4xl tracking-tight">Blog</h1>
      <PostList posts={getPosts()} />
    </section>
  );
}
