import { siteConfig } from "@/config/site";
import { getCategory } from "@/features/blog/categories";
import { getPosts } from "@/features/blog/data";
import { absoluteUrl } from "@/lib/seo";

const escapeXml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// Served at /blog/rss.xml for feed readers. It only reads the posts bundled with the build, so
// it's prerendered like a page and rebuilt on every deploy.
export function GET() {
  const items = getPosts()
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(getCategory(post.category)?.label ?? post.category)}</category>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} · Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(`Articles and notes by ${siteConfig.name}.`)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
