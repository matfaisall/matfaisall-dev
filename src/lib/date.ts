const longDate = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" });

/** "2026-10-23" → "October 23, 2026". UTC so the day never shifts with the server's time zone. */
export function formatDate(isoDate: string): string {
  return longDate.format(new Date(isoDate));
}
