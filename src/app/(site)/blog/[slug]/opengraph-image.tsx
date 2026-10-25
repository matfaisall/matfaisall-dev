import { getCategory } from "@/features/blog/categories";
import { getPostBySlug, getPosts } from "@/features/blog/data";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Blog post preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    eyebrow: post ? `Blog · ${getCategory(post.category)?.label}` : "Blog",
    title: post?.title ?? "Blog",
    description: post?.summary,
  });
}
