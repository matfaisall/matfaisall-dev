import { CarouselSlide, CarouselTrack } from "@/components/ui/carousel";
import { ProjectStory } from "@/features/projects/components/project-story";
import type { Project } from "@/features/projects/types";

/**
 * Featured projects as a carousel of wide story cards, like Mintlify's customer stories. Render it
 * inside <Carousel>, with <CarouselPrevious> and <CarouselNext> wherever the controls should go,
 * in a full-width band (`<Section bleed>`).
 *
 * The track spans the whole band. `--gutter` is the distance from the band's edge to the page
 * container's content (max-w-6xl plus its padding); padding and scroll padding of that width line
 * the active card up with the content while the previous and next cards stay visible on either
 * side, all the way to the edges of the screen. Small screens add 2rem to the end padding: cards
 * fill the padded track, so they come out 2rem narrower and the next one shows, and the last card
 * can still scroll into line.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="mx-auto max-w-6xl px-6 text-muted-foreground md:px-12">No projects yet.</p>
    );
  }

  return (
    <CarouselTrack
      label="Selected work"
      className="scroll-px-(--gutter) pr-[calc(var(--gutter)+2rem)] pl-(--gutter) [--gutter:calc(max((100%-72rem)/2,0px)+1.5rem)] md:pr-(--gutter) md:[--gutter:calc(max((100%-72rem)/2,0px)+3rem)]"
    >
      {projects.map((project, index) => (
        <CarouselSlide
          key={project.slug}
          index={index}
          className="carousel-dim transition-opacity duration-500 data-[active=false]:cursor-pointer data-[active=false]:opacity-50"
        >
          <ProjectStory project={project} />
        </CarouselSlide>
      ))}
    </CarouselTrack>
  );
}
