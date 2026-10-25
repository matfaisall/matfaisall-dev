import { SealCheckIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import type { Certificate } from "@/features/about/types";

const twoDigits = (count: number) => String(count).padStart(2, "0");

/**
 * Certificates as small credential cards: a seal, the number, the title, the issuer. On phones each
 * one is a compact row instead, so nine of them don't fill several screens.
 */
export function CertificateList({ certificates }: { certificates: Certificate[] }) {
  if (certificates.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-3 font-medium text-muted-foreground text-sm">
        Certificates
        <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs tabular-nums">
          {twoDigits(certificates.length)}
        </span>
      </h3>
      <Reveal>
        <ol className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {/* Phones: seal, title and number in one row. From `sm`: the seal and the number on
              top, the title underneath across both columns. */}
          {certificates.map((certificate, index) => (
            <li
              key={certificate.title}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 overflow-hidden rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr] sm:items-start sm:gap-y-4 sm:p-5"
            >
              <div
                aria-hidden="true"
                className="mask-radial-from-0% mask-radial-to-60% mask-radial-at-top-right absolute inset-0 bg-dots opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span className="relative grid size-8 place-items-center rounded-md border border-border bg-muted/40 text-primary">
                <SealCheckIcon aria-hidden="true" weight="duotone" className="size-4.5" />
              </span>
              <div className="relative min-w-0 sm:col-span-2 sm:row-start-2 sm:self-end">
                <p className="text-balance font-medium text-sm leading-snug sm:text-base">
                  {certificate.title}
                </p>
                {certificate.issuer && (
                  <p className="mt-0.5 text-muted-foreground text-xs sm:mt-1 sm:text-sm">
                    {certificate.issuer}
                  </p>
                )}
              </div>
              <span className="relative font-mono text-muted-foreground text-xs tabular-nums sm:col-start-2 sm:row-start-1 sm:justify-self-end">
                {twoDigits(index + 1)}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
