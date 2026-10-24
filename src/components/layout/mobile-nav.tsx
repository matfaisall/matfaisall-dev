"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";

type NavItem = { label: string; href: string };

/** Menu button and drop-down panel for small screens. The desktop nav lives in SiteHeader. */
export function MobileNav({ items, email }: { items: readonly NavItem[]; email: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <XIcon /> : <ListIcon />}
      </Button>
      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-border border-b bg-background px-6 pb-6 shadow-lg"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href} className="border-border border-b">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-medium text-lg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild variant="secondary" className="mt-6 w-full">
          <a href={`mailto:${email}`}>Get in touch</a>
        </Button>
      </nav>
    </div>
  );
}
