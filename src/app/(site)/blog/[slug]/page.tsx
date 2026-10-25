import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { BlogPosting } from "schema-dts";
import { ArticleSkeleton } from "@/components/layout/article-skeleton";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/ui/prose";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/features/blog/categories";
import { PostCover } from "@/features/blog/components/post-cover";
import { PostCta } from "@/features/blog/components/post-cta";
import { PostGrid } from "@/features/blog/components/post-grid";
import { PostHeader } from "@/features/blog/components/post-header";
import { ReadingProgress } from "@/features/blog/components/reading-progress";
import { ShareLinks } from "@/features/blog/components/share-links";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { getPostBySlug, getPostContent, getPosts, getRelatedPosts } from "@/features/blog/data";
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
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <ArticleSkeleton />
        </div>
      }
    >
      <BlogPost params={params} />
    </Suspense>
  );
}

// Mintlify's article layout: the header, then three columns on large screens (reading progress and
// sharing, the post, the table of contents) and other posts to read next. Phones get one column,
// with the table of contents folded into a disclosure above the post.
async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Content = getPostContent(post.slug);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd<BlogPosting>
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          url,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          articleSection: getCategory(post.category)?.label,
          keywords: post.tags.join(", "),
          image: post.cover ? absoluteUrl(post.cover.src) : undefined,
          author: personSchema(),
        }}
      />
      <article className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28">
        <PostHeader post={post} />

        <div className="mt-10 grid gap-10 border-border border-t pt-10 lg:mt-14 lg:grid-cols-[11rem_minmax(0,1fr)_13rem] lg:gap-12 lg:pt-12">
          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            {/* Only beside the text on large screens: on phones it would scroll away with it. */}
            <ReadingProgress
              minutes={post.readingTime}
              bodyId="post-body"
              className="hidden lg:flex"
            />
            <ShareLinks url={url} title={post.title} />
          </aside>

          <div className="min-w-0">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <PostCover
                post={post}
                preload
                sizes="(min-width: 1152px) 36rem, (min-width: 1024px) 50vw, 100vw"
              />
            </div>
            {post.toc.length > 0 && (
              <details className="mt-8 rounded-lg border border-border px-4 py-3 lg:hidden">
                <summary className="cursor-pointer font-medium text-sm">On this page</summary>
                <div className="mt-3">
                  <TableOfContents items={post.toc} label={false} />
                </div>
              </details>
            )}
            <Prose id="post-body" className="mt-10">
              <Content />
            </Prose>
            {post.tags.length > 0 && (
              <ul
                aria-label="Tags"
                className="mt-12 flex flex-wrap gap-2 border-border border-t pt-8"
              >
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-8 lg:self-start">
            <TableOfContents items={post.toc} />
            <PostCta email={siteConfig.email} />
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <Section id="keep-reading" title="Keep reading." description="More from the blog.">
          <PostGrid posts={related} />
        </Section>
      )}
    </>
  );
}
