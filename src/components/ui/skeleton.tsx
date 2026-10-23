import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Grey placeholder block shown while content loads. Size it with className (h-*, w-*). */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
