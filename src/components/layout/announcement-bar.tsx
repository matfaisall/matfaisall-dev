import { CaretRightIcon, PlusIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

type AnnouncementBarProps = {
  href: string;
  /** Short tag before the message, e.g. "New post". */
  label: string;
  children: ReactNode;
};

/** Thin bar above the header that points to one thing worth seeing, e.g. the latest post. */
export function AnnouncementBar({ href, label, children }: AnnouncementBarProps) {
  return (
    <div className="border-border border-b bg-background">
      <Link
        href={href}
        className="group mx-auto flex h-10 max-w-6xl items-center justify-center gap-3 px-6 text-sm"
      >
        <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-primary/10 px-1.5 py-0.5 font-medium text-primary text-xs">
          <PlusIcon weight="bold" className="size-3" aria-hidden="true" />
          {label}
        </span>
        <span className="truncate">{children}</span>
        <CaretRightIcon
          className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
