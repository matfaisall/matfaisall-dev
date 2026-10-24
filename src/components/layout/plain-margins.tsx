/**
 * Hides the dot pattern in the margins for one band, so they show the plain background while the
 * rails keep running through it. Render it first inside a `relative` band. It sits under the band's
 * content but over the site-wide dots and rails, so it redraws the rails itself.
 */
export function PlainMargins() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[1] hidden bg-background md:block"
    >
      <div className="mx-auto h-full max-w-6xl border-border border-x" />
    </div>
  );
}
