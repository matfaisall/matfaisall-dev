// Files shown in the hero's code window. A file is a list of lines and a line a list of
// syntax-coloured tokens, so the window can type them out one character at a time.

export type TokenKind =
  | "keyword"
  | "key"
  | "string"
  | "number"
  | "punctuation"
  | "comment"
  | "plain";
export type Token = { text: string; kind: TokenKind };
export type Line = Token[];
export type CodeFile = { name: string; lines: Line[] };

const t = (text: string, kind: TokenKind = "plain"): Token => ({ text, kind });

/** `  key: "value",` or `  key: 2026,` */
function property(key: string, value: string | number, indent = "  "): Line {
  return [
    t(`${indent}${key}`, "key"),
    t(": ", "punctuation"),
    typeof value === "number" ? t(String(value), "number") : t(`"${value}"`, "string"),
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

/** "https://www.github.com/me" → "github.com/me": shorter, and still recognisable. */
const withoutProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export function aboutFile(about: {
  handle: string;
  name: string;
  role: string;
  location: string;
  skills: string[];
  focus: string[];
}): CodeFile {
  return {
    name: "about.ts",
    lines: [
      [t("// The short version.", "comment")],
      [t("export const ", "keyword"), t(about.handle), t(" = {", "punctuation")],
      property("name", about.name),
      property("role", about.role),
      property("location", about.location),
      ...list("stack", about.skills),
      ...list("focus", about.focus),
      [t("} ", "punctuation"), t("satisfies ", "keyword"), t("Engineer"), t(";", "punctuation")],
    ],
  };
}

export function projectsFile(projects: { title: string; year: number }[]): CodeFile {
  return {
    name: "projects.ts",
    lines: [
      [t("// Selected work, newest first.", "comment")],
      [t("export const ", "keyword"), t("projects"), t(" = [", "punctuation")],
      ...projects.flatMap((project) => [
        [t("  {", "punctuation")],
        property("title", project.title, "    "),
        property("year", project.year, "    "),
        [t("  },", "punctuation")],
      ]),
      [t("] ", "punctuation"), t("satisfies ", "keyword"), t("Project[]"), t(";", "punctuation")],
    ],
  };
}

export function contactFile(contact: { email: string; githubUrl: string }): CodeFile {
  return {
    name: "contact.ts",
    lines: [
      [t("// Say hi. The inbox is open.", "comment")],
      [t("export const ", "keyword"), t("contact"), t(" = {", "punctuation")],
      property("email", contact.email),
      property("github", withoutProtocol(contact.githubUrl)),
      [t("} ", "punctuation"), t("as const", "keyword"), t(";", "punctuation")],
    ],
  };
}
