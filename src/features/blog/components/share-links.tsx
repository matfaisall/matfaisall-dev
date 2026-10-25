"use client";

import {
  CheckIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";

const button =
  "grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground";

/** "Share this article": LinkedIn, X, email, and a button that copies the link. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const link = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const targets = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
      Icon: LinkedinLogoIcon,
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/post?url=${link}&text=${text}`,
      Icon: XLogoIcon,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${text}&body=${link}`,
      Icon: EnvelopeSimpleIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
        Share this article
      </p>
      <ul className="flex gap-2">
        {targets.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={button}
            >
              <Icon aria-hidden="true" className="size-4" />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label={copied ? "Link copied" : "Copy link"}
            onClick={() => navigator.clipboard.writeText(url).then(() => setCopied(true))}
            className={button}
          >
            {copied ? (
              <CheckIcon aria-hidden="true" weight="bold" className="size-4 text-primary" />
            ) : (
              <LinkSimpleIcon aria-hidden="true" className="size-4" />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}
