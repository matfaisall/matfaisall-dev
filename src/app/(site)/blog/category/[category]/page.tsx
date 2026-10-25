import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { categories, getCategory } from "@/features/blog/categories";
import { CategoryTabs } from "@/features/blog/components/category-tabs";
import { PostGrid } from "@/features/blog/components/post-grid";
import { getPostsByCategory } from "@/features/blog/data";
import { createPageMetadata } from "@/lib/seo";

type Params = PageProps<"/blog/category/[category]">["params"];

// Prerender one page per category at build time, including the ones without posts yet.
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const category = getCategory((await params).category);
  if (!category) return {};

  return createPageMetadata({
    title: `${category.label} articles`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

// The tabs and the grid of /blog, filtered to one category. The category comes from the URL, so
// it streams in behind <Suspense>; prerendered pages still contain it for search engines.
export default function BlogCategoryPage({ params }: { params: Params }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28">
      <Suspense fallback={<Skeleton className="h-10 w-2/3" />}>
        <CategoryPosts params={params} />
      </Suspense>
    </div>
  );
}

async function CategoryPosts({ params }: { params: Params }) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  return (
    <>
      <h1 className="relative max-w-2xl text-balance font-medium text-3xl tracking-tight md:text-4xl">
        <span
          aria-hidden="true"
          className="absolute top-[0.2em] -left-6 h-[0.9em] w-0.5 bg-primary md:-left-12"
        />
        {category.label}.<span className="text-muted-foreground"> {category.description}</span>
      </h1>
      <div className="mt-12 md:mt-16">
        <CategoryTabs active={category.slug} />
      </div>
      <div className="mt-10">
        <PostGrid
          posts={getPostsByCategory(category.slug)}
          empty={`No ${category.label.toLowerCase()} posts yet. They're on the way.`}
        />
      </div>
    </>
  );
}
