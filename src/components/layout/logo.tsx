import Link from "next/link";
import { useId } from "react";
import { siteConfig } from "@/config/site";

/**
 * The amber "F" mark: two blades that sweep up and to the right. Same drawing as
 * public/brand/logo-mark.svg, inlined so it never pops in after the text.
 */
function LogoMark({ className }: { className?: string }) {
  // The header and footer both render it, so each copy needs its own gradient id.
  const gradientId = useId();

  return (
    <svg aria-hidden="true" viewBox="80 80 352 352" className={className}>
      <defs>
        <linearGradient
          id={gradientId}
          x1="100"
          y1="424"
          x2="440"
          y2="104"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c2410c" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`} transform="translate(-9.6 -7.9)">
        <path d="M214 104H432C418 146 392 192 340 192H222C194 192 172 208 162 236C146 190 150 104 214 104Z" />
        <path d="M244 222H372C358 262 332 302 284 302H250C186 302 124 340 100 424C92 330 160 222 244 222Z" />
      </g>
    </svg>
  );
}

/** Mark + handle. Links home. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark className="size-6" />
      <span>{siteConfig.handle}</span>
    </Link>
  );
}
