import type { MetadataRoute } from "next";
import { getPosts } from "@/features/blog/data";
import { getProjects } from "@/features/projects/data";
import { absoluteUrl } from "@/lib/seo";

// Served at /sitemap.xml. When you add a route, add it here so search engines can find it.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
  ];

  const projects: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projects, ...posts];
}
