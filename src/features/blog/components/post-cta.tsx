import { EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

/** A small card under the table of contents that invites the reader to get in touch. */
export function PostCta({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/20 p-4">
      <p className="text-sm leading-relaxed">
        Building something on the web?{" "}
        <span className="text-muted-foreground">I'm always happy to talk about it.</span>
      </p>
      <Button asChild size="sm" className="w-full">
        <a href={`mailto:${email}`}>
          <EnvelopeSimpleIcon aria-hidden="true" />
          Say hello
        </a>
      </Button>
    </div>
  );
}
