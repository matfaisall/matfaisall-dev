import type { Thing, WithContext } from "schema-dts";

/**
 * Renders structured data (JSON-LD) for search engines.
 * `<` is escaped so content can never close the script tag (see Next.js JSON-LD guide).
 */
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline; the payload is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
