import { FileTsIcon, FolderOpenIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

type TokenKind = "keyword" | "key" | "string" | "punctuation" | "comment" | "plain";
type Token = { text: string; kind: TokenKind };
type Line = Token[];

const tokenClass: Record<TokenKind, string> = {
  keyword: "text-primary",
  key: "text-muted-foreground",
  string: "text-foreground",
  punctuation: "text-muted-foreground/70",
  comment: "text-muted-foreground/60 italic",
  plain: "text-foreground",
};

const t = (text: string, kind: TokenKind = "plain"): Token => ({ text, kind });

/** `  key: "value",` */
function property(key: string, value: string): Line {
  return [
    t(`  ${key}`, "key"),
    t(": ", "punctuation"),
    t(`"${value}"`, "string"),
    t(",", "punctuation"),
  ];
}

/** `  key: [` + two strings per line + `  ],` so long lists never overflow the window. */
function list(key: string, values: string[]): Line[] {
  const rows: Line[] = [];
  for (let i = 0; i < values.length; i += 2) {
    const pair = values.slice(i, i + 2);
    rows.push([
      t("    "),
      ...pair.flatMap((value) => [t(`"${value}"`, "string"), t(", ", "punctuation")]),
    ]);
  }
  return [[t(`  ${key}`, "key"), t(": [", "punctuation")], ...rows, [t("  ],", "punctuation")]];
}

const files = ["about.ts", "projects.ts", "writing.ts", "contact.ts"];

type CodeWindowProps = {
  handle: string;
  name: string;
  role: string;
  location: string;
  skills: string[];
  focus: string[];
  className?: string;
};

/** An editor window that introduces you as a TypeScript object. The hero's "product shot". */
export function CodeWindow({
  handle,
  name,
  role,
  location,
  skills,
  focus,
  className,
}: CodeWindowProps) {
  const lines: Line[] = [
    [t("// The short version.", "comment")],
    [t("export const ", "keyword"), t(handle), t(" = {", "punctuation")],
    property("name", name),
    property("role", role),
    property("location", location),
    ...list("stack", skills),
    ...list("focus", focus),
    [t("} ", "punctuation"), t("satisfies ", "keyword"), t("Engineer"), t(";", "punctuation")],
  ];

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
          {files.map((file, index) => (
            <p
              key={file}
              className={cn(
                "flex items-center gap-1.5 rounded-md py-1 pr-2 pl-5 font-mono text-muted-foreground",
                index === 0 && "bg-primary/10 text-primary",
              )}
            >
              <FileTsIcon className="size-3.5 shrink-0" aria-hidden="true" />
              {file}
            </p>
          ))}
        </div>

        <div className="min-w-0">
          <div className="flex border-border border-b font-mono text-xs">
            <span className="-mb-px border-primary border-b px-4 py-2.5 text-foreground">
              about.ts
            </span>
            <span className="px-4 py-2.5 text-muted-foreground">projects.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 text-[13px] leading-6">
            <code>
              {lines.map((line, row) => (
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
