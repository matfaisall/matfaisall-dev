import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { siteConfig } from "@/config/site";

type FooterLink = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div>
      <h2 className="text-muted-foreground text-sm">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("/") ? (
              <Link href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="transition-colors hover:text-primary"
                {...(link.href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Site-wide footer: a full-width hairline on top, content between the rails. */
export function SiteFooter() {
  const connect: FooterLink[] = [
    { label: "GitHub", href: siteConfig.socials.github },
    { label: "LinkedIn", href: siteConfig.socials.linkedin },
    { label: "Email", href: `mailto:${siteConfig.email}` },
  ];

  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4 sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              {siteConfig.role} building fast, animated and accessible web experiences.
            </p>
            <p className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1 text-muted-foreground text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Based in {siteConfig.location}
            </p>
          </div>
          <FooterColumn title="Pages" links={siteConfig.nav} />
          <FooterColumn title="Connect" links={connect} />
        </div>
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-border border-t pt-8 sm:flex-row sm:items-center">
          <ThemeSwitcher />
          <p className="text-muted-foreground text-xs">
            © {siteConfig.name}. Built with Next.js and GSAP.
          </p>
        </div>
      </div>
    </footer>
  );
}
