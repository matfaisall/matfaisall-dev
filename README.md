# matfaisall.dev

Personal portfolio of **Faisal** ([@matfaisall](https://github.com/matfaisall)), built with Next.js,
Tailwind CSS and GSAP.

> **Status: foundation stage.** The folder structure, design tokens, SEO, motion components,
> tooling and Storybook are in place. The home page is **intentionally empty** and the project pages
> are unstyled. The UI will be built on top of this foundation (see
> [Design direction](#design-direction) and [Roadmap](#roadmap)).

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Design system](#design-system)
- [Design direction](#design-direction)
- [Animation](#animation)
- [SEO](#seo)
- [Code quality and Git workflow](#code-quality-and-git-workflow)
- [Roadmap](#roadmap)
- [References](#references)
- [Contributing](CONTRIBUTING.md)

## Tech stack

| Area          | Tools                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components), React 19 |
| Language      | TypeScript (strict)                                                                   |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com), `tw-animate-css`                          |
| UI primitives | [shadcn/ui](https://ui.shadcn.com) conventions, `class-variance-authority`, `@radix-ui/react-slot`, `cn` |
| Icons         | [Phosphor](https://phosphoricons.com) (`@phosphor-icons/react`) |
| Animation     | [GSAP](https://gsap.com) + `@gsap/react` (ScrollTrigger, SplitText)                   |
| Theming       | `next-themes` (light / dark / system)                                                 |
| Typography    | [Inter](https://rsms.me/inter/) (primary) + JetBrains Mono + Instrument Serif (display), self-hosted via `next/font` |
| Components    | [Storybook 10](https://storybook.js.org) (Next.js + Vite), with docs, a11y and themes addons |
| Code quality  | [Biome](https://biomejs.dev) (lint + format), Husky, lint-staged, commitlint          |
| Content       | MDX blog posts via `@next/mdx` + `remark-gfm`, styled with `@tailwindcss/typography` |
| SEO           | Next.js Metadata API, generated Open Graph images, JSON-LD (`schema-dts`), sitemap, robots |
| Architecture  | Feature-based folders, import rules enforced by [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) |

## Getting started

Requirements: **Node.js 22 or newer** (`.nvmrc` pins 24) and **pnpm 11** (`corepack enable` picks up
the version pinned in `package.json`).

```bash
pnpm install
```

```bash
pnpm dev
```

The app runs at <http://localhost:3000>; Storybook (`pnpm storybook`) runs at <http://localhost:6006>.

## Scripts

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `pnpm dev`             | Start the Next.js dev server                                    |
| `pnpm build`           | Production build                                                |
| `pnpm start`           | Serve the production build                                      |
| `pnpm lint`            | Biome lint + format check (what CI should run)                  |
| `pnpm lint:arch`       | Check import rules with dependency-cruiser                      |
| `pnpm format`          | Biome autofix: format, organize imports, sort Tailwind classes  |
| `pnpm typecheck`       | `tsc --noEmit`                                                  |
| `pnpm storybook`       | Start Storybook                                                 |
| `pnpm build-storybook` | Build a static Storybook into `storybook-static/`               |

## Architecture

The code is organised **by feature**, following
[bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
and adapted to the Next.js App Router. A feature is one topic of the portfolio (who you are, your
projects, contact). Each one holds its own components, content and types, so everything about a
topic lives in one folder.

### Folder structure

```
.
├── .storybook/                    # Storybook config and global decorators
├── .husky/                        # Git hooks: pre-commit, commit-msg
├── .vscode/                       # Editor settings: format with Biome on save
├── .dependency-cruiser.cjs        # Import rules (pnpm lint:arch)
├── public/                        # Static files served from /
└── src/
    ├── app/                       # ROUTES: one folder per URL (Next.js App Router)
    │   ├── layout.tsx             # <html>, fonts, theme, site-wide SEO defaults
    │   ├── globals.css            # Tailwind entry + design tokens
    │   ├── not-found.tsx          # 404 page
    │   ├── opengraph-image.tsx    # Default social preview image
    │   ├── sitemap.ts             # /sitemap.xml
    │   ├── robots.ts              # /robots.txt
    │   ├── manifest.ts            # /manifest.webmanifest
    │   └── (site)/                # Public pages (the group name isn't part of the URL)
    │       ├── layout.tsx         # Header + <main> + footer
    │       ├── page.tsx           # /
    │       ├── about/page.tsx     # /about
    │       ├── projects/
    │       │   ├── page.tsx       # /projects
    │       │   └── [slug]/
    │       │       ├── page.tsx              # /projects/<slug>
    │       │       └── opengraph-image.tsx   # Social preview per project
    │       └── blog/
    │           ├── page.tsx       # /blog
    │           └── [slug]/
    │               ├── page.tsx              # /blog/<slug>
    │               └── opengraph-image.tsx   # Social preview per post
    │
    ├── content/
    │   └── blog/                  # BLOG POSTS: one .mdx file per post (hello-world.mdx)
    │
    ├── features/                  # ONE FOLDER PER TOPIC
    │   ├── about/                 # Who you are
    │   │   ├── components/        # about-intro.tsx, experience-list.tsx (+ stories)
    │   │   ├── data.ts            # Your bio, skills and work history
    │   │   └── types.ts           # About, Experience
    │   ├── projects/
    │   │   ├── components/        # project-card.tsx (+ story), project-list.tsx
    │   │   ├── data.ts            # Your projects + getProjects(), getProjectBySlug()
    │   │   └── types.ts           # Project
    │   ├── blog/
    │   │   ├── components/        # post-card.tsx, post-list.tsx, post-header.tsx (+ stories)
    │   │   ├── posts.ts           # Registry: one import per post in src/content/blog
    │   │   ├── data.ts            # getPosts(), getPostBySlug(), getPostContent()
    │   │   └── types.ts           # Post, PostMetadata
    │   └── contact/
    │       └── components/        # Contact form (later)
    │
    ├── components/                # SHARED UI, used by any feature
    │   ├── ui/                    # Primitives: Button, Badge, Carousel, Prose (article typography), Skeleton
    │   ├── layout/                # Site chrome: SiteHeader, SiteFooter, AnnouncementBar, Section, StatStrip, ThemeToggle/Switcher
    │   ├── motion/                # Animation components: Reveal, TextReveal, Parallax, RibbonCanvas
    │   ├── seo/                   # JsonLd
    │   └── providers/             # ThemeProvider
    │
    ├── lib/                       # SHARED SETUP & HELPERS
    │   ├── gsap.ts                # GSAP plugins + motion tokens
    │   ├── seo.ts                 # createPageMetadata(), absoluteUrl(), JSON-LD helpers
    │   ├── date.ts                # formatDate()
    │   ├── og-image.tsx           # Shared template for social preview images
    │   ├── fonts.ts               # Inter + JetBrains Mono + Instrument Serif
    │   └── utils.ts               # cn()
    │
    ├── config/site.ts             # Name, role, domain, links, nav: used by SEO and UI
    ├── hooks/                     # Hooks shared by several features
    ├── types/                     # Shared types (mdx.d.ts)
    ├── mdx-components.tsx         # How Markdown elements render in MDX (required by @next/mdx)
    └── stories/                   # Docs-only Storybook pages (Foundations/Colors)
```

Every feature follows the same three-part pattern: **`components/`** (what it looks like),
**`data.ts`** (what it says) and **`types.ts`** (the shape of that content). For example, to add a
project you only edit `features/projects/data.ts`. The project then appears on `/projects` and in
the sitemap, and gets its own page and preview image. Optional fields shape its card in the home
carousel: `cover` (a screenshot in `/public/projects/` or a remote image whose host is in
`images.remotePatterns`), `accent` (panel colour) and `highlights` (two big numbers).

The tech stack grid on the home page reads `stack` in `features/about/data.ts`. To add a tool, put a
square WebP in `public/stack/` (about 120px; e.g. download the SVG from
[simpleicons.org](https://simpleicons.org), CC0, and convert it with [Squoosh](https://squoosh.app))
and add `{ name, icon: "/stack/<file>.webp", docs: "<official docs URL>" }`. Set
`invertInDark: true` for a black logo. The grid shows eight tools and swaps to the next eight every
five seconds (pausing under the mouse, on keyboard focus, off screen and in background tabs), so
keep the list at a multiple of eight to avoid repeats. Each tile opens its docs in a new tab.

Empty folders hold a `.gitkeep` so they show up in Git. Delete it once the folder has real files.

### How a page is built

**`page.tsx` is only the route.** It answers four questions: *which URL?* (its folder), *what
does Google see?* (`metadata`), *what data?* (from `features/<topic>/data.ts`), and *which
components, in which order?* (from `features/<topic>/components`). Everything visual lives in the
feature.

The page is also the only place where features meet. Features can't import each other, so a home
page that shows your intro, featured projects and latest posts imports from `features/about`,
`features/projects` and `features/blog` side by side:

```tsx
// src/app/(site)/page.tsx (later)
export default function HomePage() {
  return (
    <>
      <AboutIntro name={siteConfig.name} role={siteConfig.role} bio={about.bio} skills={about.skills} />
      <ProjectList projects={getFeaturedProjects()} />
      <PostList posts={getPosts().slice(0, 3)} />
    </>
  );
}
```

```
src/app/(site)/projects/page.tsx      ← the route: reads data, sets SEO, composes components
        │
        ├── features/projects/data.ts            getProjects()
        └── features/projects/components/        <ProjectList projects={…} />
                    │
                    └── components/ui, components/motion     shared building blocks
```

```tsx
// src/app/(site)/projects/page.tsx
export const metadata = createPageMetadata({
  title: "Projects",
  description: "Projects designed and built by Faisal.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectList projects={getProjects()} />;
}
```

- **Pages** (`src/app`) read data, export SEO metadata and put components together. No styling
  details or business logic.
- **Feature components** receive data through **props**. They never import `data.ts`, which keeps
  them reusable and easy to show in Storybook with sample data.
- **Shared components** know nothing about any feature.

### Import rules (enforced)

```
components · lib · config · hooks · types   →   features   →   app
              (shared)                          (topics)      (routes)
```

Imports only go **left to right**. `pnpm lint:arch`
([dependency-cruiser](https://github.com/sverweij/dependency-cruiser)) checks this on every commit:

| Rule | Meaning |
| --- | --- |
| `no-cross-feature-imports` | A feature never imports another feature. Move the shared part to `components/` or `lib/`. |
| `shared-must-not-import-features-or-app` | Shared code stays independent of features and routes. |
| `features-must-not-import-app` | Routes use features, never the other way around. |
| `no-circular` | No import cycles. |
| `not-to-dev-dependency` | Production code never imports devDependencies (stories may). |

Biome adds `noBarrelFile` and `noReExportAll`: there are no `index.ts` files that only re-export.
Import from the real file.

**Dynamic routes** (`[slug]`) read `params` inside a child component wrapped in `<Suspense>`, as
`blog/[slug]/page.tsx` does. The page shell then renders instantly on navigation, and the
URL-specific content streams in with `<ArticleSkeleton>` as the fallback. Because every slug is
listed in `generateStaticParams`, the prerendered HTML still contains the full content for search
engines. Reading `params` at the top of the page triggers Next.js's "URL data outside of Suspense"
warning in development.

### Adding a new route

For example `/uses`:

1. **Content and UI:** create `src/features/uses/` with `components/`, `data.ts` and `types.ts`.
2. **Route:** create `src/app/(site)/uses/page.tsx`. Export
   `createPageMetadata({ title, description, path: "/uses" })` and render the feature components.
3. **Sitemap:** add `/uses` to `src/app/sitemap.ts`.
4. **Navigation:** add `{ label: "Uses", href: "/uses" }` to `nav` in `src/config/site.ts`.

The route automatically gets a canonical URL, Open Graph and Twitter tags, and the default social
preview image. Add an `opengraph-image.tsx` next to `page.tsx` only if it needs its own image.

### Writing a blog post

1. Create `src/content/blog/<slug>.mdx`. The file name becomes the URL: `/blog/<slug>`.
2. Start it with the metadata:

   ```mdx
   export const metadata = {
     title: "Animating with GSAP in Next.js",
     summary: "One sentence that shows up on the card and in Google.",
     publishedAt: "2026-11-01",
     tags: ["GSAP", "Next.js"],
   };

   Your post, in **Markdown**. Tables, task lists and footnotes (GFM) work too.
   ```

3. Register it in `src/features/blog/posts.ts`:

   ```ts
   import * as animatingWithGsap from "@/content/blog/animating-with-gsap.mdx";

   export const postFiles = {
     "hello-world": helloWorld,
     "animating-with-gsap": animatingWithGsap,
   };
   ```

That's it. The post appears on `/blog` and in the sitemap (with its date), and gets its own page,
`BlogPosting` structured data and a preview image. If the metadata is missing a field or a date is
malformed, the build fails and names the file. Add `draft: true` to keep a post out of production
while you write it.

### Where does my code go?

| I'm adding… | Put it in |
| --- | --- |
| A page / URL | `src/app/(site)/<route>/page.tsx` (see [Adding a new route](#adding-a-new-route)) |
| Content (projects, bio, experience) | `src/features/<topic>/data.ts` |
| A blog post | `src/content/blog/<slug>.mdx` + one line in `features/blog/posts.ts` |
| A section or component for one topic | `src/features/<topic>/components/` |
| A new topic (e.g. blog) | `src/features/<topic>/` with `components/`, `data.ts`, `types.ts` |
| A generic UI primitive (Input, Card…) | `src/components/ui/` + a `*.stories.tsx` |
| Header, footer, navigation | `src/components/layout/`, used in `app/(site)/layout.tsx` |
| An animation component | `src/components/motion/` + a `*.stories.tsx` |
| A helper or library setup | `src/lib/` |
| Site name, domain, links, nav | `src/config/site.ts` |
| A colour, radius or font token | `src/app/globals.css` |

### Code conventions

The goal is that every file reads the same way, whoever wrote it.

- **Names:** files and folders `kebab-case` (`project-card.tsx`). Components `PascalCase` named
  exports (`export function ProjectCard`). Only Next.js route files (`page.tsx`, `layout.tsx`,
  `sitemap.ts`…) use `export default`, because the framework requires it.
- **Imports:** always through the `@/` alias (`@/components/ui/button`), including in stories.
  Biome sorts them on save.
- **Props:** a `type <Name>Props` above the component. Extend `ComponentProps<"div">` (or the
  matching element) when the component wraps an HTML element, and spread `...props` onto it.
- **Icons:** Phosphor only, always from `@phosphor-icons/react/ssr` and always the `…Icon` name
  (`ArrowUpRightIcon`, not the deprecated `ArrowUpRight`). The `/ssr` entry works in both Server
  and Client Components. Biome rejects imports from `@phosphor-icons/react` or `lucide-react`.
  Size icons with Tailwind (`size-4`); inside `<Button>` they're sized automatically. Decorative
  icons get `aria-hidden="true"`; icon-only buttons need an `aria-label`.

  ```tsx
  import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
  <ArrowUpRightIcon weight="bold" />  // thin · light · regular · bold · fill · duotone
  ```

- **Styling:** Tailwind utilities with semantic tokens (`bg-primary`, `text-muted-foreground`). No
  raw colours. Merge `className` with `cn()`, and use `cva()` for variants.
- **Server first:** components are Server Components unless they need state, events, effects or
  animation. Then the file starts with `"use client"`, and stays as small as possible.
- **Comments** explain *why*, not *what*. Short JSDoc on exported props when the name isn't
  enough.
- **Stories:** every component in `components/ui`, `components/motion` and `features/*/components`
  has a `*.stories.tsx` next to it.

A typical component:

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & {
  /** Highlights the card with the brand colour. */
  featured?: boolean;
};

export function Card({ featured = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-2xl border border-border p-6", featured && "border-primary", className)}
      {...props}
    />
  );
}
```

## Design system

### Colours: shadcn theme with amber

Colours come from the shadcn/ui theme in [`src/app/globals.css`](src/app/globals.css) (generated by
`shadcn init`, see `components.json`). They're CSS variables exposed to Tailwind as semantic
utilities. **Components only use the semantic names**, so a rebrand only touches that file.

Names in the table are the closest Tailwind palette colour. "≈" means a near match. The exact
`oklch()` values are in `globals.css`.

| Token | Utility | Light | Dark |
| --- | --- | --- | --- |
| `--primary` | `bg-primary`, `text-primary` | amber-700 | amber-500 |
| `--primary-foreground` | `text-primary-foreground` | amber-50 | amber-950 |
| `--background` | `bg-background` | white | ≈ stone-950 |
| `--foreground` | `text-foreground` | ≈ stone-950 | ≈ stone-50 |
| `--card`, `--popover` | `bg-card`, `bg-popover` | white | ≈ stone-900 |
| `--secondary` | `bg-secondary` | zinc-100 | zinc-800 |
| `--secondary-foreground` | `text-secondary-foreground` | zinc-900 | ≈ white |
| `--muted`, `--accent` | `bg-muted`, `bg-accent` | ≈ stone-100 | ≈ stone-800 |
| `--muted-foreground` | `text-muted-foreground` | ≈ stone-500 | ≈ stone-400 |
| `--accent-foreground` | `text-accent-foreground` | ≈ stone-900 | ≈ stone-50 |
| `--destructive` | `bg-destructive`, `text-destructive` | red-600 | red-400 |
| `--border` | `border-border` | ≈ stone-200 | white at 10% |
| `--input` | `border-input` | ≈ stone-200 | white at 15% |
| `--ring` | `ring-ring`, `outline-ring` | ≈ stone-400 | ≈ stone-500 |
| `--chart-1` … `--chart-5` | `bg-chart-1` … | amber-300, 500, 600, 700, 800 | same |

`--sidebar-*` tokens exist for a shadcn sidebar and follow the same pattern. `--radius` (0.625rem)
sets every `rounded-*` size from `rounded-sm` to `rounded-4xl`.

How to use amber:

- **As a fill:** `bg-primary text-primary-foreground` (buttons, highlights). Readable in both
  themes.
- **As text and lines:** `text-primary`, `border-primary`, `stroke-primary` are readable in both
  themes (the dark theme uses the brighter amber-500 for this reason). Use it as an accent only:
  a tag, a tick mark, one highlighted word. Body text stays `foreground` / `muted-foreground`.
- **As a tint:** `bg-primary/10 text-primary` for small chips (stats, labels, the active file in a
  mock UI), the way Mintlify uses its green.
- Neutrals are warm greys (stone family), so they sit well next to amber.

### Typography

| Role    | Font                            | Utility     | CSS variable        |
| ------- | ------------------------------- | ----------- | ------------------- |
| Primary | [Inter](https://rsms.me/inter/) | `font-sans` | `--font-inter`      |
| Mono    | JetBrains Mono                  | `font-mono` | `--font-jetbrains-mono` |
| Display | [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) | `font-display` | `--font-instrument-serif` |

`font-display` is for the hero headline and the closing call to action only, set large with tight
tracking (`tracking-[-0.02em]`). Section headings stay in Inter (`font-medium`), as on Mintlify.

Fonts are loaded once in [`src/lib/fonts.ts`](src/lib/fonts.ts) with `next/font/google`. The files
are self-hosted at build time, so there's no request to Google and no layout shift. The root layout
and Storybook both apply `fontVariables`, and `globals.css` maps them to Tailwind's `font-sans`,
`font-mono` and `font-display`. `font-sans` is the default on `<body>`. To change a typeface, edit `fonts.ts` and the
matching line in `globals.css`.

### Storybook

Storybook is the workshop for every shared component:

- **Foundations/Colors** shows the token palette.
- **UI/**, **Motion/** and **Features/** contain one story file per component, with auto-generated
  docs.
- The toolbar switches light/dark theme, using the same `.dark` class that `next-themes` sets.
- The **Accessibility** panel (axe) flags contrast and ARIA issues per story.

Every component in `components/ui`, `components/motion` and `features/*/components` comes with a
story next to it.

## Design direction

Visual references for layout and look & feel:

1. **Primary: [mintlify.com](https://www.mintlify.com/).** Clean, documentation-style layout, generous
   whitespace, crisp typography, subtle gradients and a single strong brand colour.
2. **Secondary: [lattice.com](https://lattice.com/).** Editorial, section-based storytelling for
   longer pages.

Brand colour for both: **amber** (see [Design system](#design-system)).

What we take from Mintlify, and where it lives:

| Pattern | Implementation |
| --- | --- |
| Vertical rails that break now and then: a background layer behind every page; a band with `bg-background` covers them and runs edge to edge (home hero, stat strip), a transparent band sits between them. Horizontal hairlines span the full viewport | `app/(site)/layout.tsx`, `<Section>`, `<StatStrip>`, `home-hero.tsx` |
| Margins that change texture from band to band: dots by default, plain background where a band asks for it (`<Section margins="plain">`, or `<PlainMargins />` inside any `relative` band). On the home page they alternate from the stat strip down | `components/layout/plain-margins.tsx`, `<Section>`, `contact-cta.tsx` |
| Two-tone section heading with a brand tick on the left rail | `components/layout/section.tsx` |
| Serif display headline + Inter body | `font-display` (see [Typography](#typography)) |
| Product shot in the hero | `features/about/components/code-window.tsx`: an editor window with `about.ts`, `projects.ts` and `contact.ts`; click a file in the sidebar (or a tab on small screens) to open it. File contents come from `code-files.ts` |
| Animated twisted-ribbon line art | `components/motion/ribbon-canvas.tsx`, in brand colours via `brand-ribbon.tsx` |
| Mono stat chips in a strip | `components/layout/stat-strip.tsx` |
| Bento cards with small UI illustrations | `features/about/components/capabilities.tsx`, `project-preview.tsx` |
| Customer logo band ("Join 20,000+ …"): a line and a link on the left, eight logo tiles on the right that swap in a diagonal wave every few seconds, split by a hairline | `features/about/components/tech-stack.tsx`, `tech-grid.tsx`, icons in `public/stack/` |
| Customer-story carousel: wide coloured cards with a photo in their own edge-to-edge band (hairlines above and below, no rails), arrows in the section header, previous and next cards visible at the sides and faded by scroll position (`carousel-dim`) | `components/ui/carousel.tsx`, `<Section bleed>`, `features/projects/components/project-showcase.tsx`, `project-story.tsx` |
| Crisp corners: `rounded-md` buttons and chips, `rounded-xl` cards | `components/ui/button.tsx`, `badge.tsx` |
| Faint patterns behind decoration | `bg-grid`, `bg-dots` utilities in `globals.css`, faded with `mask-*` |

## Animation

All animation runs on GSAP, set up once in [`src/lib/gsap.ts`](src/lib/gsap.ts). The one exception
is `<RibbonCanvas>`, a Canvas 2D background with its own `requestAnimationFrame` loop: it redraws
every frame, which is cheaper on a canvas than tweening.

### Motion components

Use these before writing a custom animation. Each one has a story under **Motion/** in Storybook.

| Component | Use it for | Example |
| --- | --- | --- |
| `<Reveal>` | Fading a block's children up as it scrolls into view | Cards, lists, sections |
| `<TextReveal>` | Sliding a heading up word by word from behind a mask | Hero title, section titles |
| `<Parallax>` | Moving content slower or faster than the scroll | Images, decorative shapes |
| `<RibbonCanvas>` | Animated twisted-ribbon background. Pauses off-screen, static for reduced motion | Behind a hero or CTA |
| `<BrandRibbon>` | `<RibbonCanvas>` in amber, one gradient per theme | Hero, contact band |

They're Client Components, but you can use them inside Server Components:

```tsx
<TextReveal as="h1" trigger="load">Hi, I'm Faisal.</TextReveal>
<Reveal className="grid gap-6 md:grid-cols-2">{cards}</Reveal>
```

### Motion tokens

Like colour tokens, these keep every animation on the site feeling consistent. Import them from
`@/lib/gsap` instead of writing raw numbers.

| Token | Values |
| --- | --- |
| `DURATION` | `fast` 0.4s · `base` 0.8s · `slow` 1.2s |
| `EASE` | `out` (entering) · `expo` (text, big moves) · `inOut` (state changes) |
| `STAGGER` | `tight` 0.05s · `base` 0.1s · `loose` 0.15s |
| `SCROLL_START` | `"top 85%"`: when "on scroll" animations start |

### Writing a new animation component

Every animation component follows the same structure:

```tsx
"use client";

import { type ReactNode, useRef } from "react";
import { DURATION, EASE, FULL_MOTION, gsap, SCROLL_START, useGSAP } from "@/lib/gsap";

export function FadeIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // 1. Only animate when the user hasn't asked for reduced motion.
      gsap.matchMedia().add(FULL_MOTION, () => {
        // 2. Reveal the element (it starts hidden by `data-animate`), then animate.
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(el, {
          autoAlpha: 0,
          duration: DURATION.base,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
        });
      });
    },
    { scope: ref }, // 3. Selectors are scoped to this component, and cleanup is automatic.
  );

  return (
    <div ref={ref} data-animate>
      {children}
    </div>
  );
}
```

Rules:

- Import `gsap` and its plugins only from `@/lib/gsap`.
- Always use `useGSAP` with a `scope` ref. It cleans up on unmount and on route changes.
- Always wrap animations in `gsap.matchMedia().add(FULL_MOTION, …)`. Users with
  `prefers-reduced-motion` see the final state, with no movement.
- Add `data-animate` to elements that animate **in**. CSS hides them until GSAP shows them, so
  nothing flashes before hydration. A `<noscript>` style keeps them visible without JavaScript.
- Animate `transform` and `opacity` (`x`, `y`, `scale`, `autoAlpha`). They're cheap for the browser.
  Avoid animating `width`, `height`, `top` or `left`.
- For small hover or enter effects that don't need scroll, use `tw-animate-css` or Tailwind
  `transition-*` classes instead of GSAP.

## SEO

SEO is built into the routes, so a new page only needs one line of metadata.

| What | Where | Result |
| --- | --- | --- |
| Site-wide defaults | `app/layout.tsx` | Title template, description, keywords, Open Graph, Twitter card, robots, theme colour |
| Per-page metadata | `createPageMetadata()` from `@/lib/seo` in each `page.tsx` | Title, description, **canonical URL**, Open Graph and Twitter for that page |
| Social preview images | `app/opengraph-image.tsx`, `projects/[slug]/` and `blog/[slug]/opengraph-image.tsx`, template in `@/lib/og-image` | A 1200×630 branded image for every page, project and post, generated at build time |
| Articles | `createPageMetadata({ …, article })` on blog posts | Open Graph type `article` with published/modified dates and tags |
| Structured data | `<JsonLd>` from `@/components/seo/json-ld` | `Person` (home), `ProfilePage` (about), `CreativeWork` (projects), `BlogPosting` (posts), typed with `schema-dts` |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml` | Every page, project and post, with `lastModified` for posts |
| Robots | `app/robots.ts` → `/robots.txt` | Allows crawling and points to the sitemap |
| Manifest | `app/manifest.ts` → `/manifest.webmanifest` | Name, colours and icon for "Add to home screen" |
| Static pages | `generateStaticParams` in `projects/[slug]` and `blog/[slug]` | Every page is prerendered to HTML: fast, and fully readable by crawlers |

Adding a page:

```tsx
export const metadata = createPageMetadata({
  title: "About",
  description: "Who I am and what I work on.",
  path: "/about",
});
```

Then add the URL to `app/sitemap.ts`.

Checklist for every page:

- **Exactly one `<h1>`**, and headings in order (`h2`, then `h3`). `TextReveal` takes an `as` prop so
  the heading level stays correct.
- **Images** go through `next/image` with a meaningful `alt` (or `alt=""` if decorative).
- **Links** to other pages use `next/link`.
- **`siteConfig.url`** must be the real production domain. Canonical URLs, the sitemap and preview
  images are all built from it.

Check the result with Google's [Rich Results Test](https://search.google.com/test/rich-results)
and a social preview checker such as [opengraph.xyz](https://www.opengraph.xyz/).

## Code quality and Git workflow

> **Contributing?** Read [CONTRIBUTING.md](CONTRIBUTING.md) first. It covers branch names, the
> commit message convention (types, scopes, rules, examples) and the checks to run before pushing.

- **Biome** lints and formats TS, TSX, JSON and CSS, with the Next.js and React rule domains. It also
  sorts Tailwind classes, including inside `cn()` and `cva()`.
- **Husky + lint-staged**: on `git commit`, Biome checks and fixes the staged files, then
  `pnpm lint:arch` checks the import rules.
- **VS Code**: `.vscode/` makes Biome the formatter (format and organize imports on save) and
  recommends the Biome and Tailwind CSS extensions. `.editorconfig` covers other editors.
- **commitlint**: commit messages must follow
  [Conventional Commits](https://www.conventionalcommits.org/):

  ```text
  feat(blog): add tag filter
  fix(theme): prevent flash on first load
  build(deps): upgrade storybook
  docs: describe folder architecture
  refactor(ui): extract card component
  ```

  The full list of types, scopes and rules is in
  [CONTRIBUTING.md → Commit messages](CONTRIBUTING.md#commit-messages).

## Roadmap

- [x] Project foundation: Next.js, Tailwind, GSAP, theming
- [x] Feature-based folders, import rules enforced with dependency-cruiser
- [x] Tooling: Biome, Husky, lint-staged, commitlint
- [x] Storybook with amber design tokens
- [x] Layout (header, footer, navigation) inspired by Mintlify
- [x] Routes: `/about`, `/projects`, `/projects/<slug>`, `/blog`, `/blog/<slug>` (unstyled)
- [x] MDX blog with typed, validated metadata
- [ ] Sections: hero, about, projects, experience, contact (home page done; experience pending)
- [ ] RSS feed for the blog
- [ ] Real content in `config/site.ts` and feature data files
- [x] SEO: metadata, Open Graph images, JSON-LD, sitemap, robots, manifest
- [x] Motion components (Reveal, TextReveal, Parallax) and motion tokens
- [ ] Tests: Storybook + Vitest for components
- [ ] CI: lint, typecheck, build on every pull request
- [ ] Deploy

## References

The architecture and conventions are based on:

- [alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react): feature folders,
  one-way imports, no cross-feature imports
- [Next.js docs: Project structure](https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/02-project-structure.mdx):
  the `src/` folder, colocation, private `_folders`, route groups
- [shadcn-ui/ui](https://github.com/shadcn-ui/ui): `components/ui` primitives, `cva` variants, `cn()`
- [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate): a production
  Next.js + Tailwind layout under `src/`, with Husky, lint-staged and commitlint
- [sverweij/dependency-cruiser](https://github.com/sverweij/dependency-cruiser): validating
  import rules in CI
- [Next.js docs: Metadata and OG images](https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/14-metadata-and-og-images.mdx)
  and [JSON-LD](https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/json-ld.mdx)
- [GSAP: React guide](https://gsap.com/resources/React/): `useGSAP`, scoping and cleanup
