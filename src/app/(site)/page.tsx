import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { StatStrip } from "@/components/layout/stat-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { siteConfig } from "@/config/site";
import { Capabilities } from "@/features/about/components/capabilities";
import { HomeHero } from "@/features/about/components/home-hero";
import { TechStack } from "@/features/about/components/tech-stack";
import { about } from "@/features/about/data";
import { PostList } from "@/features/blog/components/post-list";
import { getPosts } from "@/features/blog/data";
import { ContactCta } from "@/features/contact/components/contact-cta";
import { ProjectShowcase } from "@/features/projects/components/project-showcase";
import { getFeaturedProjects, getProjects } from "@/features/projects/data";
import { personJsonLd } from "@/lib/seo";

// Title, description and social preview come from the root layout; the home page only sets its canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const twoDigits = (count: number) => String(count).padStart(2, "0");

export default function HomePage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <HomeHero
        name={siteConfig.name}
        handle={siteConfig.handle}
        role={siteConfig.role}
        location={siteConfig.location}
        headline={about.headline}
        skills={about.skills}
        focus={about.capabilities.map((capability) => capability.visual)}
        githubUrl={siteConfig.socials.github}
        email={siteConfig.email}
        projects={getFeaturedProjects().slice(0, 3)}
      />
      <TechStack stack={about.stack} githubUrl={siteConfig.socials.github} />
      <StatStrip
        title="At a glance"
        stats={[
          { label: "Projects", value: twoDigits(getProjects().length) },
          { label: "Articles", value: twoDigits(posts.length) },
          { label: "Core stack", value: about.skills.slice(0, 3).join(" · ") },
          { label: "Based in", value: siteConfig.location },
        ]}
      />
      <Section
        id="focus"
        title="What I focus on."
        description="Interfaces that load fast, move with intent and work for everyone."
      >
        <Capabilities capabilities={about.capabilities} />
      </Section>
      <Carousel>
        <Section
          id="work"
          title="Selected work."
          description="A few things I've designed, built and shipped."
          bleed
          action={
            <div className="flex items-center gap-2">
              <CarouselPrevious label="Previous project" />
              <CarouselNext label="Next project" />
              <Button asChild variant="outline" size="sm" className="ml-2">
                <Link href="/projects">
                  All projects
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </Button>
            </div>
          }
        >
          <ProjectShowcase projects={getFeaturedProjects()} />
        </Section>
      </Carousel>
      <Section
        id="writing"
        title="Latest writing."
        description="Notes on frontend engineering, motion and the web platform."
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">
              All posts
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>
        }
      >
        <PostList posts={posts.slice(0, 3)} />
      </Section>
      <ContactCta email={siteConfig.email} linkedinUrl={siteConfig.socials.linkedin} />
    </>
  );
}
