import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Served at /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
