const longDate = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" });

/** "2026-10-23" → "October 23, 2026". UTC so the day never shifts with the server's time zone. */
export function formatDate(isoDate: string): string {
  return longDate.format(new Date(isoDate));
}

const shortMonth = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-03" → "Mar 2024". */
export function formatMonth(yearMonth: string): string {
  return shortMonth.format(new Date(`${yearMonth}-01`));
}

const monthIndex = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + month - 1;
};

/**
 * How long a role lasted, counting both the first and the last month the way LinkedIn does:
 * ("2023-11", "2025-08") → "1 yr 10 mos".
 */
export function formatSpan(start: string, end: string): string {
  const total = monthIndex(end) - monthIndex(start) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [
    years > 0 && `${years} yr${years > 1 ? "s" : ""}`,
    months > 0 && `${months} mo${months > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");
}
