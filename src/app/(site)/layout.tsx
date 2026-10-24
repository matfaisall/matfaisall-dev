import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPosts } from "@/features/blog/data";

// Layout for the public site: announcement bar, sticky header, page, footer. Two vertical rails
// (Mintlify-style) run behind everything as a background layer, so a band picks its own look:
// leave its background transparent to sit between the rails, or give it `bg-background` to cover
// them and run edge to edge (the home hero and stat strip do this).
export default function SiteLayout({ children }: LayoutProps<"/">) {
  const [latestPost] = getPosts();

  return (
    <>
      {latestPost && (
        <AnnouncementBar href={`/blog/${latestPost.slug}`} label="New post">
          {latestPost.title}
        </AnnouncementBar>
      )}
      <SiteHeader />
      <div className="relative flex flex-1 flex-col">
        {/* Dot pattern in the margins, then the rails column on top of it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 hidden bg-dots md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-5 mx-auto hidden max-w-6xl border-border border-x bg-background md:block"
        />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
