import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { AboutHero } from "@/features/about/components/about-hero";
import { CertificateList } from "@/features/about/components/certificate-list";
import { EducationList } from "@/features/about/components/education-list";
import { ExperienceList } from "@/features/about/components/experience-list";
import { FavouriteQuote } from "@/features/about/components/favourite-quote";
import { GrowthStats } from "@/features/about/components/growth-stats";
import { about } from "@/features/about/data";
import { ContactCta } from "@/features/contact/components/contact-cta";
import { createPageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: `About ${siteConfig.name}: background, work experience, education and the line behind the work.`,
  path: "/about",
});

const twoDigits = (count: number) => String(count).padStart(2, "0");

export default function AboutPage() {
  const firstRole = about.experience.at(-1);
  const currentRole = about.experience.find((role) => !role.end);
  const companies = new Set(about.experience.map((role) => role.company)).size;

  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <AboutHero
        name={siteConfig.name}
        role={siteConfig.role}
        location={siteConfig.location}
        intro={about.intro}
        bio={about.bio}
        portrait={about.portrait}
        current={currentRole}
        githubUrl={siteConfig.socials.github}
        linkedinUrl={siteConfig.socials.linkedin}
        email={siteConfig.email}
      />
      <Section
        id="growth"
        title="Growing, release by release."
        description="The road so far, in numbers."
        bleed
      >
        <GrowthStats
          stats={[
            ...(firstRole
              ? [{ label: "Shipping to production since", value: firstRole.start.slice(0, 4) }]
              : []),
            { label: "Companies I've shipped for", value: twoDigits(companies) },
            ...about.impact,
            {
              label: "Certificates earned along the way",
              value: twoDigits(about.certificates.length),
            },
          ]}
          milestones={about.milestones}
        />
      </Section>
      <Section
        id="experience"
        title="Experience."
        description="Where I've shipped work for real users."
      >
        <ExperienceList experience={about.experience} />
      </Section>
      <Section
        id="education"
        title="Education."
        description="Where the foundations came from."
        margins="plain"
      >
        <div className="flex flex-col gap-16">
          <EducationList education={about.education} />
          <CertificateList certificates={about.certificates} />
        </div>
      </Section>
      <Section
        id="quote"
        title="Words I work by."
        description="The line I keep coming back to."
        bleed
      >
        <FavouriteQuote quote={about.quote} />
      </Section>
      <ContactCta email={siteConfig.email} linkedinUrl={siteConfig.socials.linkedin} />
    </>
  );
}
