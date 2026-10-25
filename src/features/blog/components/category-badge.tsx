import { type CategorySlug, getCategory } from "@/features/blog/categories";
import { cn } from "@/lib/utils";

/** A post's category as a small filled label, like Mintlify's "Announcements" pill. */
export function CategoryBadge({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs",
        className,
      )}
    >
      {getCategory(category)?.label}
    </span>
  );
}
