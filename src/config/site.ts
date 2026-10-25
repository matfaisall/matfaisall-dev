// Single source of truth for site-wide info: SEO, metadata, navigation and links.
export const siteConfig = {
  name: "Muhammad Faisal",
  handle: "matfaisall",
  role: "Frontend Engineer",
  // Production domain. Canonical URLs, the sitemap and social previews are built from it.
  // TODO: change this if the site is deployed on another domain.
  url: "https://matfaisall.dev",
  description:
    "Portfolio of Faisal — a frontend engineer who builds fast, animated, and accessible web experiences.",
  keywords: [
    "Faisal",
    "matfaisall",
    "Frontend Engineer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
  ],
  locale: "en_US",
  location: "Indonesia",
  // A square photo of your face, shown as the author on blog posts.
  avatar: "/avatar.webp",
  email: "muh.faisal572@gmail.com",
  socials: {
    github: "https://github.com/matfaisall",
    linkedin: "https://www.linkedin.com/in/matfaisall",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
