import { CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";
import { CursorTag } from "@/components/ui/cursor-tag";
import type { ProjectVisual } from "@/features/projects/types";
import { cn } from "@/lib/utils";

// Small UI illustrations for the project cards on /projects, one per kind of product. Panels use
// the background and border colours, details the muted fill, highlights the brand amber.

const accent = {
  text: "text-primary",
  solid: "bg-primary",
  onSolid: "text-primary-foreground",
  soft: "bg-primary/15",
  border: "border-primary/45",
};

const panel = "rounded-lg border border-border bg-background";
const bar = "block h-1.5 rounded-full bg-muted";
const strong = "block h-2 rounded-full bg-foreground/25";

/** The CRM's rollout manager: a module sidebar, stat cards, hospitals rolling out, a chart. */
function RolloutVisual() {
  const rows = [100, 68, 24, 0];
  return (
    <>
      <div
        className={cn(
          panel,
          "absolute top-12 -right-10 -bottom-10 left-6 grid overflow-hidden shadow-2xl shadow-black/20 sm:left-10 sm:grid-cols-[9rem_1fr]",
        )}
      >
        <div className="hidden flex-col gap-1 border-border border-r p-3 font-mono text-[10px] text-muted-foreground sm:flex">
          {["Dashboard", "Lead & Sales", "Contracts", "Purchase orders", "Implementation"].map(
            (item) => (
              <span key={item} className="px-2 py-1">
                {item}
              </span>
            ),
          )}
          <span className={cn("rounded-md px-2 py-1", accent.soft, accent.text)}>
            Release manager
          </span>
          {["Helpdesk", "Events", "Content"].map((item) => (
            <span key={item} className="px-2 py-1">
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-xs">Rollout manager</span>
            <span className={cn("flex items-center gap-1.5 font-mono text-[10px]", accent.text)}>
              <span className={cn("size-1.5 rounded-full", accent.solid)} />
              LIVE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((card) => (
              <span
                key={card}
                className={cn(
                  "flex flex-col gap-1.5 rounded-md border p-2",
                  card === 2 ? accent.border : "border-border",
                )}
              >
                <span className={cn(bar, "h-1 w-1/2")} />
                <span className={cn(strong, "w-3/4", card === 2 && accent.solid)} />
              </span>
            ))}
          </div>
          <div className="flex flex-col rounded-md border border-border font-mono text-[10px]">
            {rows.map((progress) => (
              <span
                key={progress}
                className="grid grid-cols-[1fr_2fr_2.5rem] items-center gap-3 border-border border-b px-3 py-2 last:border-b-0"
              >
                <span className={cn(bar, "bg-foreground/15")} />
                <span className={bar}>
                  <span
                    className={cn("block h-full rounded-full", accent.solid)}
                    style={{ width: `${progress}%` }}
                  />
                </span>
                <span className="text-muted-foreground">
                  {progress ? `${progress}%` : "Queued"}
                </span>
              </span>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1.5 rounded-md border border-border p-2">
            {[35, 55, 45, 70, 60, 90, 75].map((height, index) => (
              <span
                key={height}
                className={cn("flex-1 rounded-sm", index === 5 ? accent.solid : "bg-muted")}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <CursorTag name="Faisal" size="md" className="top-1/2 left-1/2" />
    </>
  );
}

/** A public website: a page with a sign-up button, and an event ticket with its QR code. */
function WebsiteVisual() {
  return (
    <>
      <div className={cn(panel, "absolute inset-x-7 top-7 flex h-36 flex-col gap-2 p-3.5")}>
        <span className={cn(bar, "w-1/3", accent.soft)} />
        <span className={cn(strong, "h-2.5 w-3/4")} />
        <span className={cn(strong, "h-2.5 w-1/2")} />
        <span
          className={cn(
            "mt-1.5 grid h-5.5 w-18 place-items-center rounded-md font-semibold text-[10px]",
            accent.solid,
            accent.onSolid,
          )}
        >
          Register
        </span>
      </div>
      <div
        className={cn(
          panel,
          accent.border,
          "absolute right-4 bottom-4 flex w-32 items-center gap-2 p-2.5 shadow-lg",
        )}
      >
        <span className="grid size-8 shrink-0 grid-cols-4 gap-px">
          {[1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1].map((on, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed pattern that never reorders.
              key={index}
              className={on ? accent.solid : "bg-transparent"}
            />
          ))}
        </span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className={cn(bar, "bg-foreground/25")} />
          <span className={cn(bar, "w-2/3")} />
        </span>
      </div>
    </>
  );
}

const onboardingSteps = [
  { label: "Ownership", state: "done" },
  { label: "Management", state: "done" },
  { label: "Screening", state: "current" },
  { label: "Data checking", state: "next" },
  { label: "Documents", state: "next" },
] as const;

/** Merchant onboarding: a card terminal next to the steps an application goes through. */
function OnboardingVisual() {
  return (
    <>
      <div
        className={cn(
          panel,
          "absolute top-6 left-8 flex h-40 w-24 flex-col gap-2 rounded-2xl p-2.5",
        )}
      >
        <span className={cn("h-13 rounded-md border", accent.border, accent.soft)} />
        <span className="grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
            <span
              key={key}
              className={cn("h-3 rounded-sm", key === 8 ? accent.solid : "bg-muted")}
            />
          ))}
        </span>
      </div>
      <ol
        className={cn(
          panel,
          "absolute top-8 right-6 left-38 flex flex-col gap-2.5 p-3.5 font-mono text-[10px]",
        )}
      >
        {onboardingSteps.map((step) => (
          <li
            key={step.label}
            className={cn(
              "flex items-center gap-2",
              step.state === "next" && "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "size-2.5 rounded-full",
                step.state === "done" && accent.solid,
                step.state === "current" && cn("border-2", accent.border),
                step.state === "next" && "border-2 border-border",
              )}
            />
            {step.label}
          </li>
        ))}
      </ol>
    </>
  );
}

/** One module of a bigger system: a table of groups with an edit dialog over it. */
function GroupsVisual() {
  return (
    <>
      <div className={cn(panel, "absolute inset-x-6 top-7 overflow-hidden")}>
        <div className="flex items-center justify-between border-border border-b px-3.5 py-2.5 text-[11px]">
          <span className="font-medium">Maintenance groups</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 font-mono text-[10px]",
              accent.solid,
              accent.onSolid,
            )}
          >
            + New group
          </span>
        </div>
        {["w-full", "w-4/5", "w-2/3"].map((width, index) => (
          <span
            key={width}
            className="grid grid-cols-[2fr_1fr_1rem] items-center gap-3 border-border border-b px-3.5 py-2.5 last:border-b-0"
          >
            <span className={cn(bar, "bg-foreground/25", width)} />
            <span className={cn(bar, index !== 1 && accent.soft)} />
            <span className={bar} />
          </span>
        ))}
      </div>
      <div
        className={cn(
          panel,
          accent.border,
          "absolute right-4 bottom-4 flex w-36 flex-col gap-2 p-2.5 shadow-lg",
        )}
      >
        <span className="font-medium text-[10px]">Edit group</span>
        <span className="h-3.5 rounded border border-border" />
        <span className={cn("h-3.5 w-11 self-end rounded", accent.solid)} />
      </div>
    </>
  );
}

/** A job board: a search bar over two job cards, the first one picked. */
function JobsVisual() {
  return (
    <>
      <div
        className={cn(
          panel,
          "absolute inset-x-6 top-6 flex h-9 items-center gap-2.5 px-3 text-[11px]",
        )}
      >
        <MagnifyingGlassIcon className="size-3 text-muted-foreground" />
        Frontend Developer
        <span
          className={cn(
            "ml-auto rounded-md px-2 py-0.5 font-semibold text-[10px]",
            accent.solid,
            accent.onSolid,
          )}
        >
          Search
        </span>
      </div>
      <div className="absolute inset-x-6 top-19 grid grid-cols-2 gap-2.5">
        {[true, false].map((picked) => (
          <span
            key={String(picked)}
            className={cn(panel, "flex flex-col gap-2 p-3", picked && accent.border)}
          >
            <span className={cn("size-5.5 rounded-md", picked ? accent.soft : "bg-muted")} />
            <span className={cn(bar, "w-4/5 bg-foreground/25")} />
            <span className={cn(bar, "w-1/2")} />
            <span className={cn(bar, "w-2/5", picked && accent.soft)} />
          </span>
        ))}
      </div>
    </>
  );
}

/** A multi-tenant control panel: tenants and their status, and a passing connection test. */
function TenantsVisual() {
  const tenants = ["Active", "Active", "Migrating"];
  return (
    <>
      <div className={cn(panel, "absolute inset-x-6 top-5 overflow-hidden font-mono text-[10px]")}>
        <div className="border-border border-b px-3.5 py-2 font-medium font-sans text-[11px]">
          Tenants
        </div>
        {tenants.map((status, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: a fixed illustration that never reorders.
            key={index}
            className="flex items-center gap-2.5 border-border border-b px-3.5 py-2 last:border-b-0"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                status === "Active" ? accent.solid : "border border-muted-foreground",
              )}
            />
            <span className={cn(bar, "flex-1 bg-foreground/20")} />
            <span className={status === "Active" ? accent.text : "text-muted-foreground"}>
              {status}
            </span>
          </span>
        ))}
      </div>
      <span
        className={cn(
          panel,
          accent.border,
          accent.text,
          "absolute right-5 bottom-3 flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] shadow-lg",
        )}
      >
        <CheckIcon weight="bold" className="size-3" />
        Database connected
      </span>
    </>
  );
}

/** Requests with approvals: draft, submitted, approved, over the form being filled in. */
function ApprovalsVisual() {
  return (
    <>
      <div className="absolute inset-x-6 top-9 flex items-center font-mono text-[10px]">
        <span className={cn(panel, "px-2 py-1")}>Draft</span>
        <span className={cn("mx-1.5 h-px flex-1", accent.solid)} />
        <span className={cn(panel, "px-2 py-1")}>Submitted</span>
        <span className="mx-1.5 h-px flex-1 bg-border" />
        <span
          className={cn("rounded-lg border px-2 py-1", accent.border, accent.soft, accent.text)}
        >
          Approved
        </span>
      </div>
      <div className={cn(panel, "absolute inset-x-6 top-21 grid grid-cols-2 gap-2 p-3")}>
        <span className="h-4.5 rounded-md border border-border" />
        <span className="h-4.5 rounded-md border border-border" />
        <span className="h-4.5 rounded-md border border-border" />
        <span className={cn("h-4.5 rounded-md border", accent.border)} />
        <span className={cn("col-span-2 h-4.5 w-18 justify-self-end rounded-md", accent.solid)} />
      </div>
    </>
  );
}

const visuals: Record<ProjectVisual, ComponentType> = {
  rollout: RolloutVisual,
  website: WebsiteVisual,
  onboarding: OnboardingVisual,
  groups: GroupsVisual,
  jobs: JobsVisual,
  tenants: TenantsVisual,
  approvals: ApprovalsVisual,
};

/**
 * The illustration panel of a project card: an amber wash, dots, and the project's drawing.
 * Fills its parent, which needs a height.
 */
export function ProjectVisualPanel({
  visual,
  className,
}: {
  visual: ProjectVisual;
  className?: string;
}) {
  const Visual = visuals[visual];
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden bg-primary/6", className)}>
      <div className="mask-radial-from-20% mask-radial-to-90% absolute inset-0 bg-dots" />
      <Visual />
    </div>
  );
}
