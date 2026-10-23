// Layout for the public site. Shared chrome (SiteHeader, SiteFooter from
// `@/components/layout`) goes around <main> here, not in the root layout.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <main className="flex-1">{children}</main>;
}
