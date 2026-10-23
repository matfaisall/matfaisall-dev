import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { BlogPosting } from "schema-dts";
import { ArticleSkeleton } from "@/components/layout/article-skeleton";
import { JsonLd } from "@/components/seo/json-ld";
import { Prose } from "@/components/ui/prose";
import { PostHeader } from "@/features/blog/components/post-header";
import { getPostBySlug, getPostContent, getPosts } from "@/features/blog/data";
import { absoluteUrl, createPageMetadata, personSchema } from "@/lib/seo";

type Params = PageProps<"/blog/[slug]">["params"];

// Prerender one page per post at build time.
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
  });
}

// The shell renders instantly on navigation; the post itself depends on the URL, so it streams
// in behind <Suspense>. Prerendered pages still contain the full post for search engines.
export default function BlogPostPage({ params }: { params: Params }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Suspense fallback={<ArticleSkeleton />}>
        <BlogPost params={params} />
      </Suspense>
    </article>
  );
}

async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Content = getPostContent(post.slug);

  return (
    <>
      <JsonLd<BlogPosting>
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          keywords: post.tags.join(", "),
          author: personSchema(),
        }}
      />
      <PostHeader post={post} />
      <Prose>
        <Content />
      </Prose>
    </>
  );
}
