import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Monogram + handle. Links home. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center rounded-md bg-primary pb-0.5 font-display text-lg text-primary-foreground italic leading-none"
      >
        f
      </span>
      <span>{siteConfig.handle}</span>
    </Link>
  );
}
