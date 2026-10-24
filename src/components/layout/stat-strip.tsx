type Stat = {
  label: string;
  /** Short value shown in a mono chip: a number, a place, a few words. */
  value: string;
};

/**
 * A one-line row of facts between two full-width hairlines, like Mintlify's "Agents at work today"
 * strip. It covers the rails, so it reads as a break between bands.
 */
export function StatStrip({ title, stats }: { title: string; stats: Stat[] }) {
  return (
    <div className="border-border border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-10 md:px-12">
        <p className="shrink-0 font-medium text-sm">{title}</p>
        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5">
              <dt className="text-muted-foreground text-sm">{stat.label}</dt>
              <dd className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
