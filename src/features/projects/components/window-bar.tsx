/** The top of a browser window: three dots and a label where the address would be. */
export function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-border border-b px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <span key={dot} aria-hidden="true" className="size-2.5 rounded-full bg-muted" />
      ))}
      <span className="ml-3 truncate font-mono text-muted-foreground text-xs">{label}</span>
    </div>
  );
}
