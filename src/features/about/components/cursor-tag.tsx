import { CursorIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

const sizes = {
  /** Inside the small UI illustrations. */
  sm: { icon: "size-3.5", tag: "mt-2.5 rounded-sm px-1 text-[10px] leading-none" },
  /** Next to the portrait in the About hero. */
  md: { icon: "size-4", tag: "mt-3 rounded-md px-1.5 text-xs" },
};

/**
 * A Mintlify-style cursor with a name tag, showing someone at work. Decorative: place it with
 * `className`, e.g. `-right-6 -bottom-5`, inside a `relative` parent.
 */
export function CursorTag({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("absolute flex items-start gap-0.5", className)}>
      <CursorIcon weight="fill" className={cn("text-primary", sizes[size].icon)} />
      <span
        className={cn("bg-primary py-0.5 font-medium text-primary-foreground", sizes[size].tag)}
      >
        {name}
      </span>
    </span>
  );
}
