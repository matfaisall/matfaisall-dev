import type { Experience } from "@/features/about/types";

const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-03" → "Mar 2024". */
function formatMonth(value: string): string {
  return monthYear.format(new Date(`${value}-01`));
}

export function ExperienceList({ experience }: { experience: Experience[] }) {
  if (experience.length === 0) {
    return <p className="text-muted-foreground">No experience added yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-8">
      {experience.map((item) => (
        <li key={`${item.company}-${item.start}`} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
          <p className="font-mono text-muted-foreground text-sm">
            <time dateTime={item.start}>{formatMonth(item.start)}</time>
            {" – "}
            {item.end ? <time dateTime={item.end}>{formatMonth(item.end)}</time> : "Present"}
          </p>
          <div>
            <h3 className="font-semibold">
              {item.role} · {item.company}
            </h3>
            <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
