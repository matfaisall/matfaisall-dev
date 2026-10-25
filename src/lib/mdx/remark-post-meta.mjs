// Remark plugin for blog posts. It gives every h2 and h3 a stable id (so the table of contents can
// link to it) and adds an export to the MDX file, read next to `metadata`:
//
//   export const postMeta = { readingTime: 4, toc: [{ depth: 2, text: "Why", id: "why" }] };
//
// next.config.ts passes it to @next/mdx by absolute path: Turbopack only accepts plugins by name.

const WORDS_PER_MINUTE = 220;

/** The plain text of a node: what a reader sees, without Markdown syntax. */
function toText(node) {
  if (typeof node.value === "string" && node.type !== "mdxjsEsm") return node.value;
  return (node.children ?? []).map(toText).join(" ");
}

/** "Why `satisfies`?" → "why-satisfies", matching GitHub's heading anchors. */
function slugify(text, seen) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, "")
    .replace(/ /g, "-");
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/** A plain JSON value as an ESTree expression, for the injected export. */
function toEstree(value) {
  if (Array.isArray(value)) return { type: "ArrayExpression", elements: value.map(toEstree) };
  if (value !== null && typeof value === "object") {
    return {
      type: "ObjectExpression",
      properties: Object.entries(value).map(([key, item]) => ({
        type: "Property",
        key: { type: "Identifier", name: key },
        value: toEstree(item),
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
      })),
    };
  }
  return { type: "Literal", value };
}

export default function remarkPostMeta() {
  return (tree) => {
    const seen = new Map();
    const toc = [];
    let words = 0;

    const visit = (node) => {
      if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
        words += node.value.split(/\s+/).filter(Boolean).length;
      }
      if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
        const text = toText(node).replace(/\s+/g, " ").trim();
        const id = slugify(text, seen);
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
        toc.push({ depth: node.depth, text, id });
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);

    const postMeta = { readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)), toc };
    tree.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "postMeta" },
                    init: toEstree(postMeta),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
