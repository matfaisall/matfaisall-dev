import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

// Shared by the root layout and Storybook so both render the same typography.
// next/font self-hosts the files at build time, so visitors never request Google Fonts.

/** Primary typeface for all UI and body text (`font-sans`). */
export const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

/** Monospace for code, labels and metadata (`font-mono`). */
export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

/** Display serif for hero and closing headlines only (`font-display`). Ships in one weight. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const fontVariables = `${inter.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable}`;
