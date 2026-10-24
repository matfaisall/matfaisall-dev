import { EnvelopeSimpleIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { BrandRibbon } from "@/components/motion/brand-ribbon";
import { Button } from "@/components/ui/button";

type ContactCtaProps = {
  email: string;
  linkedinUrl: string;
};

/** Closing band of the home page: a serif invitation and the two fastest ways to reach you. */
export function ContactCta({ email, linkedinUrl }: ContactCtaProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-border border-t"
    >
      {/* From the middle to the viewport edge, crossing the right rail, so it never runs behind
          the copy. Desktop only: no free space when stacked. */}
      <BrandRibbon className="mask-l-from-50% absolute inset-y-0 right-0 left-1/2 hidden lg:block" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <div className="flex max-w-xl flex-col items-start">
          <h2
            id="contact-heading"
            className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl"
          >
            Have an idea? <em className="text-primary">Let's build it.</em>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground leading-relaxed">
            Tell me about your project, a role, or just say hi. My inbox is always open.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href={`mailto:${email}`}>
                <EnvelopeSimpleIcon aria-hidden="true" />
                Email me
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <LinkedinLogoIcon aria-hidden="true" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
