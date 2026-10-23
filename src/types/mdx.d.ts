// MDX files can export a `metadata` object. Its shape depends on the content type,
// so it's typed as `unknown` here and validated where it's read (e.g. features/blog/data.ts).
declare module "*.mdx" {
  export const metadata: unknown;
}
