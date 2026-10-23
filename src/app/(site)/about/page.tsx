import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { AboutIntro } from "@/features/about/components/about-intro";
import { ExperienceList } from "@/features/about/components/experience-list";
import { about } from "@/features/about/data";
import { createPageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: `About ${siteConfig.name}: background, skills and work experience.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-24">
      <JsonLd data={profilePageJsonLd()} />
      <AboutIntro
        name={siteConfig.name}
        role={siteConfig.role}
        bio={about.bio}
        skills={about.skills}
      />
      <div>
        <h2 className="mb-8 font-semibold text-2xl tracking-tight">Experience</h2>
        <ExperienceList experience={about.experience} />
      </div>
    </section>
  );
}
