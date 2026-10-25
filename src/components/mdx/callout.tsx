import { InfoIcon, LightbulbIcon, WarningIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const kinds = {
  note: {
    Icon: InfoIcon,
    label: "Note",
    tone: "border-border bg-muted/30",
    icon: "text-muted-foreground",
  },
  tip: {
    Icon: LightbulbIcon,
    label: "Tip",
    tone: "border-primary/30 bg-primary/5",
    icon: "text-primary",
  },
  warning: {
    Icon: WarningIcon,
    label: "Warning",
    tone: "border-destructive/40 bg-destructive/5",
    icon: "text-destructive",
  },
} as const;

type CalloutProps = {
  type?: keyof typeof kinds;
  /** Defaults to the kind's name: "Note", "Tip" or "Warning". */
  title?: string;
  children: ReactNode;
};

/**
 * A boxed aside inside a post. In MDX, with no import needed:
 * `<Callout type="tip" title="Good to know">Text in **Markdown**.</Callout>`
 */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const { Icon, label, tone, icon } = kinds[type];
  return (
    <aside className={cn("not-prose my-8 flex gap-3 rounded-lg border px-4 py-3.5", tone)}>
      <Icon aria-hidden="true" weight="duotone" className={cn("mt-0.5 size-5 shrink-0", icon)} />
      <div className="min-w-0 text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_code]:font-mono [&_code]:text-[0.9em] [&_p+p]:mt-2">
        <p className="font-medium">{title ?? label}</p>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </aside>
  );
}
