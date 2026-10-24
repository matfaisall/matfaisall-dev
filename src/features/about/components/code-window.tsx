"use client";

import { FileTsIcon, FolderOpenIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import type { CodeFile, TokenKind } from "@/features/about/components/code-files";
import { cn } from "@/lib/utils";

const tokenClass: Record<TokenKind, string> = {
  keyword: "text-primary",
  key: "text-muted-foreground",
  string: "text-foreground",
  number: "text-primary",
  punctuation: "text-muted-foreground/70",
  comment: "text-muted-foreground/60 italic",
  plain: "text-foreground",
};

type CodeWindowProps = {
  handle: string;
  /** Click one to open it. The first one is open to start with. */
  files: CodeFile[];
  className?: string;
};

/**
 * An editor window that introduces you as TypeScript files. The hero's "product shot". Files are
 * picked from the sidebar, or from the tab bar on small screens where the sidebar is hidden.
 */
export function CodeWindow({ handle, files, className }: CodeWindowProps) {
  const [active, setActive] = useState(0);
  const file = files[active];
  // Tall enough for the longest file, so opening another file never moves the hero.
  const maxLines = Math.max(...files.map((f) => f.lines.length));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background/85 shadow-2xl shadow-black/5 backdrop-blur-sm dark:shadow-black/50",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2 border-border border-b px-4">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="mx-auto pr-12 font-mono text-muted-foreground text-xs">~/{handle}</span>
      </div>

      <div className="grid sm:grid-cols-[10rem_1fr]">
        <div className="hidden flex-col gap-0.5 border-border border-r p-3 text-xs sm:flex">
          <p className="mb-1 flex items-center gap-1.5 px-2 py-1 text-muted-foreground">
            <FolderOpenIcon className="size-3.5" aria-hidden="true" />
            src
          </p>
          {files.map((f, index) => (
            <button
              key={f.name}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={cn(
                "flex items-center gap-1.5 rounded-md py-1 pr-2 pl-5 text-left font-mono transition-colors",
                index === active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <FileTsIcon className="size-3.5 shrink-0" aria-hidden="true" />
              {f.name}
            </button>
          ))}
        </div>

        <div className="min-w-0">
          <div className="flex border-border border-b font-mono text-xs">
            {/* Small screens: no sidebar, so every file gets a tab to switch with. */}
            {files.map((f, index) => (
              <button
                key={f.name}
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "-mb-px border-b px-4 py-2.5 transition-colors sm:hidden",
                  index === active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {f.name}
              </button>
            ))}
            {/* With the sidebar to switch, the tab bar only names the open file. */}
            <span className="-mb-px hidden border-primary border-b px-4 py-2.5 text-foreground sm:block">
              {file.name}
            </span>
          </div>

          <pre
            className="overflow-x-auto p-4 text-[13px] leading-6"
            style={{ minHeight: `calc(${maxLines} * 1.5rem + 2rem)` }}
          >
            <code key={file.name} className="motion-safe:fade-in block motion-safe:animate-in">
              {file.lines.map((line, row) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and never reorder.
                <span key={row} className="block whitespace-pre">
                  <span className="mr-4 inline-block w-4 select-none text-right text-muted-foreground/40">
                    {row + 1}
                  </span>
                  {line.map((token, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: tokens are static and never reorder.
                    <span key={index} className={tokenClass[token.kind]}>
                      {token.text}
                    </span>
                  ))}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div className="flex items-center justify-between border-border border-t px-4 py-1.5 font-mono text-[11px] text-muted-foreground">
        <span>TypeScript</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          Ready
        </span>
      </div>
    </div>
  );
}
