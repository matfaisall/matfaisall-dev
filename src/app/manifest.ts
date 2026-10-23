import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Served at /manifest.webmanifest: name, colours and icon used when the site is installed.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: siteConfig.handle,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
