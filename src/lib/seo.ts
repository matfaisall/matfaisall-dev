import type { Metadata } from "next";
import type { PersonLeaf, ProfilePage, WithContext } from "schema-dts";
import { siteConfig } from "@/config/site";

/** Turns a path into a full URL on the production domain: "/projects" → "https://…/projects". */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

type PageMetadataInput = {
  /** Page title. The root layout appends " — <site name>". */
  title: string;
  description: string;
  /** Path of the page, used as its canonical URL. */
  path: string;
  /** Set for blog posts: marks the page as an article with dates and tags. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
  };
};

/**
 * Metadata for a single page. Use it in every `page.tsx` so titles, descriptions,
 * canonical URLs and social previews stay consistent.
 *
 * Next.js merges metadata shallowly: a page's `openGraph` replaces the layout's.
 * That's why the shared Open Graph fields are repeated here.
 */
export function createPageMetadata({
  title,
  description,
  path,
  article,
}: PageMetadataInput): Metadata {
  const shared = {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: path,
    title,
    description,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? { ...shared, type: "article", authors: [siteConfig.url], ...article }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** You, as schema.org data. Used as the author of posts and the subject of the profile page. */
export function personSchema(): PersonLeaf {
  return {
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    homeLocation: { "@type": "Place", name: siteConfig.location },
    sameAs: Object.values(siteConfig.socials),
  };
}

/** Home page structured data: tells search engines who the site is about. */
export function personJsonLd(): WithContext<PersonLeaf> {
  return { "@context": "https://schema.org", ...personSchema() };
}

/** About page structured data: a profile page about you. */
export function profilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    mainEntity: personSchema(),
  };
}
