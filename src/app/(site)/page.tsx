import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { personJsonLd } from "@/lib/seo";

// Title, description and social preview come from the root layout; the home page only sets its canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The visible UI is intentionally empty for now. Compose sections from `@/features/*` here.
export default function HomePage() {
  return <JsonLd data={personJsonLd()} />;
}
