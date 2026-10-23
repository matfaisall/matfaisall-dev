import { siteConfig } from "@/config/site";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  });
}
