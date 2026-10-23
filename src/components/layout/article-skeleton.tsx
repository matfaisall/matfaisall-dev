import { Skeleton } from "@/components/ui/skeleton";

/** Loading state for detail pages (a project or a post) while their URL-specific content streams in. */
export function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-4" role="status" aria-label="Loading">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}
