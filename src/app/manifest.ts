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
    // The amber "F" on a dark tile, drawn in public/brand. The maskable one is full-bleed for launcher masks.
    icons: [
      { src: "/brand/logo-icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
