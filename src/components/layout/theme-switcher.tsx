"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const options = [
  { value: "system", label: "System theme", Icon: DesktopIcon },
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
] as const;

const noopSubscribe = () => () => {};

/** System / light / dark segmented control, as in Mintlify's footer. */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  // The stored theme is only known in the browser, so the server renders nothing as selected.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  return (
    <fieldset className="inline-flex items-center gap-0.5 rounded-md border border-border p-0.5">
      <legend className="sr-only">Theme</legend>
      {options.map(({ value, label, Icon }) => {
        const selected = isClient && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={selected}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-7 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground",
              selected && "bg-muted text-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </fieldset>
  );
}
