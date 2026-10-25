import { siteConfig } from "@/config/site";
import { ContactCta } from "@/features/contact/components/contact-cta";
import { ContributionList } from "@/features/projects/components/contribution-list";
import { ProjectBrowser } from "@/features/projects/components/project-browser";
import { ProjectSpotlight } from "@/features/projects/components/project-spotlight";
import { ProjectTile } from "@/features/projects/components/project-tile";
import { getContributions, getProjects, getSpotlightProject } from "@/features/projects/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects",
  description: `Products ${siteConfig.name} has helped build, from hospital back offices to banking systems.`,
  path: "/projects",
});

// Mintlify-style index: a two-tone heading, the industry tabs, the spotlight project large, then
// every other project as a grid and the projects I only contributed to as a list.
export default function ProjectsPage() {
  const projects = getProjects();
  const spotlight = getSpotlightProject();
  const rest = projects.filter((project) => project.slug !== spotlight?.slug);

  const industries = new Set(projects.map((project) => project.industry)).size;
  const firstYear = Math.min(...projects.map((project) => Number(project.start.slice(0, 4))));
  const lastYear = Math.max(...projects.map((project) => project.year));

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28">
        <h1 className="relative max-w-3xl text-balance font-medium text-3xl tracking-tight md:text-4xl">
          <span
            aria-hidden="true"
            className="absolute top-[0.2em] -left-6 h-[0.9em] w-0.5 bg-primary md:-left-12"
          />
          Projects.
          <span className="text-muted-foreground">
            {" "}
            Products I've helped build, from hospital back offices to banking systems.
          </span>
        </h1>
        <p className="mt-5 font-mono text-muted-foreground text-xs uppercase tracking-wider">
          {projects.length} products · {industries} industries · {firstYear}–{lastYear}
        </p>

        <div className="mt-12 md:mt-14">
          <ProjectBrowser
            spotlight={
              spotlight && {
                slug: spotlight.slug,
                industry: spotlight.industry,
                card: <ProjectSpotlight project={spotlight} />,
              }
            }
            tiles={rest.map((project) => ({
              slug: project.slug,
              industry: project.industry,
              card: <ProjectTile project={project} />,
            }))}
          />
        </div>

        <section aria-labelledby="contributions-heading" className="mt-18 md:mt-22">
          <h2 id="contributions-heading" className="mb-4 font-medium text-muted-foreground text-sm">
            Also contributed to
          </h2>
          <ContributionList contributions={getContributions()} />
        </section>
      </div>
      <ContactCta email={siteConfig.email} linkedinUrl={siteConfig.socials.linkedin} />
    </>
  );
}
