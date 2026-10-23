import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Shared template for social preview images (Open Graph / Twitter), so every page looks the same
// when shared. Colours are hard-coded because ImageResponse can't read CSS variables.
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const AMBER_400 = "#fbbf24";
const STONE_950 = "#0c0a09";
const STONE_400 = "#a8a29e";

type OgImageInput = {
  title: string;
  /** Small text above the title, e.g. "Project". */
  eyebrow?: string;
  description?: string;
};

export function renderOgImage({ title, eyebrow, description }: OgImageInput): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: STONE_950,
        color: "white",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: STONE_400 }}>
        {siteConfig.handle}
        <span style={{ color: AMBER_400 }}>.dev</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {eyebrow && <div style={{ fontSize: 28, color: AMBER_400 }}>{eyebrow}</div>}
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 30, color: STONE_400, lineHeight: 1.4 }}>{description}</div>
        )}
      </div>
      <div style={{ display: "flex", height: 8, width: 160, background: AMBER_400 }} />
    </div>,
    ogImageSize,
  );
}
