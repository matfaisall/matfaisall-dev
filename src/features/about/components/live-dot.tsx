import { cn } from "@/lib/utils";

/** A small amber dot with a pulse, for something happening now. Size it, e.g. `size-2`. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative flex", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex size-full rounded-full bg-primary" />
    </span>
  );
}
