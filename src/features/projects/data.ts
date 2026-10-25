import type { Contribution, Project } from "@/features/projects/types";

// Every entry gets a page at /projects/<slug>, a sitemap entry and a social preview image.
// Keep at least one entry: with Cache Components, /projects/[slug] needs one slug to prerender.
// The commit counts come from `git log --author` in each repository.
//
// TODO: the images in public/projects/<slug>/ are Unsplash photos standing in for real
// screenshots (free to use, https://unsplash.com/license). Replace each with a screenshot of
// the product once your employer is happy for you to show it, and keep the same file names.

const images = (slug: string) => ({
  cover: `/projects/${slug}/cover.webp`,
  first: `/projects/${slug}/screen-1.webp`,
  second: `/projects/${slug}/screen-2.webp`,
});

type ProjectEntry = Omit<Project, "year">;

const crm = images("nuha-crm");
const care = images("nuha-care");
const edc = images("simb-edc");
const los = images("loan-origination-system");
const jobs = images("job-portal");
const hrisAdmin = images("hris-admin");
const recruitment = images("hris-recruitment");

const entries: ProjectEntry[] = [
  {
    slug: "nuha-crm",
    title: "Nuha CRM",
    summary:
      "The back office of a healthcare SaaS: sales and contracts, hospital rollouts, events and support, for the team behind Nuha's hospital software.",
    headline: "Nuha CRM: the back office behind *a healthcare platform.*",
    industry: "healthcare",
    company: "PT Data Integrasi Inovasi",
    role: "Frontend Developer",
    start: "2026-04",
    tags: ["Next.js", "TanStack", "SSE"],
    featured: true,
    spotlight: true,
    status: "internal",
    links: {},
    commits: { mine: 822 },
    cover: { src: crm.cover, alt: "Performance analytics charts on a laptop screen" },
    screenshots: [
      {
        src: crm.first,
        alt: "A laptop showing an analytics dashboard on a glass table",
        caption: "Dashboard analytics",
      },
      {
        src: crm.second,
        alt: "A team working together around their laptops",
        caption: "Rollout manager",
      },
    ],
    accent: "amber",
    visual: "rollout",
    highlights: [
      { value: "22", label: "Modules in one back office" },
      { value: "822", label: "Of my commits" },
    ],
    overview: {
      what: "An internal web app: the CRM behind Nuha, a software platform for hospitals.",
      who: "Nuha's own sales, implementation and support teams. Hospitals never see it.",
      use: "Following every hospital from first lead to go-live: proposals, contracts and purchase orders, rolling out new versions, support tickets and events, plus the content of the public website.",
    },
    modules: [
      {
        title: "Release management",
        description:
          "Ship a new version to hospitals in stages: a catalog of migration queries, release bundles with notes, and a rollout manager that streams live progress over server-sent events.",
      },
      {
        title: "Dashboard analytics",
        description:
          "How each hospital uses its modules, from laboratory and radiology to pharmacy and mobile booking: synced per hospital or all at once, with a history of every sync and exports.",
      },
      {
        title: "Events and e-certificates",
        description:
          "Participant registration, invoices and reminders, QR check-in with a confirmation step, and a certificate template builder whose certificates carry a QR code to verify them.",
      },
      {
        title: "Content for the public site",
        description:
          "What the Nuha Care website shows, managed in the CRM: product modules and their features, testimonials, the company profile video, and visitor analytics.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Plate.js",
      "dnd-kit",
      "Recharts",
    ],
  },
  {
    slug: "nuha-care",
    title: "Nuha Care website",
    summary:
      "The public site and events portal: product pages from the CMS, event sign-up, online check-in and e-certificates.",
    headline: "Nuha Care: the public face of *a hospital platform.*",
    industry: "healthcare",
    company: "PT Data Integrasi Inovasi",
    role: "Frontend Developer",
    start: "2026-09",
    tags: ["Next.js", "GSAP", "SEO"],
    featured: true,
    // TODO: set links.live to the website's address.
    status: "public",
    links: {},
    commits: { mine: 96 },
    cover: { src: care.cover, alt: "A laptop next to a stethoscope on a doctor's desk" },
    screenshots: [
      { src: care.first, alt: "A laptop on a wooden desk", caption: "Homepage" },
      {
        src: care.second,
        alt: "A doctor looking at scans on a tablet",
        caption: "Nuha Events",
      },
    ],
    accent: "emerald",
    visual: "website",
    highlights: [
      { value: "96", label: "Of my commits" },
      { value: "5 wks", label: "From homepage to events portal" },
    ],
    overview: {
      what: "Nuha's public website and events portal.",
      who: "Hospitals and partners looking at Nuha's products, and anyone joining one of its events.",
      use: "Showing the products, managed from the CRM, and running events end to end: sign-up, online check-in and e-certificates.",
    },
    modules: [
      {
        title: "Nuha Events",
        description:
          "A landing page with filters and status tabs, event pages with a registration flow, online check-in, and e-certificates to claim, preview as a PDF and verify by a short link.",
      },
      {
        title: "Products from the CMS",
        description:
          "Module cards, a page for each module's features and a mega-menu with real product previews. Product pages render on the server, so CMS edits show straight away.",
      },
      {
        title: "Homepage v2",
        description:
          'A six-category "NUHA Beyond" slider, interoperability cards with detail modals, a directory of healthcare facilities, testimonials with star ratings, and the mascot.',
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "GSAP",
      "Motion",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    slug: "simb-edc",
    title: "SIMB-EDC",
    summary:
      "Merchant onboarding for a bank's card terminals: a step-by-step approval flow, MDR pricing and portfolio dashboards.",
    headline: "SIMB-EDC: onboarding merchants for *a bank's card terminals.*",
    industry: "banking",
    company: "PT Infosys Solusi Terpadu",
    role: "Frontend Web Developer",
    start: "2024-02",
    end: "2025-08",
    tags: ["React", "TanStack", "i18n"],
    featured: true,
    status: "internal",
    links: {},
    commits: { mine: 563 },
    cover: { src: edc.cover, alt: "A hand holding a card machine to swipe a payment card" },
    screenshots: [
      {
        src: edc.first,
        alt: "A payment card held near a card terminal",
        caption: "Merchant onboarding",
      },
      { src: edc.second, alt: "A laptop showing a dashboard", caption: "My task" },
    ],
    accent: "sky",
    visual: "onboarding",
    highlights: [
      { value: "563", label: "Of my commits" },
      { value: "1.5 yrs", label: "On the project" },
    ],
    overview: {
      what: "A web app a bank uses to sign up merchants for its EDC card terminals.",
      who: "The bank's staff who onboard, check and approve those merchants.",
      use: "Taking a merchant from application to approval: company and owner data, screening, document checks, approvals and MDR pricing, with dashboards of the whole portfolio.",
    },
    modules: [
      {
        title: "Step-by-step onboarding",
        description:
          "Ownership, the management structure with its document uploads, data screening and data checking, with popups to compare documents and validation on every field.",
      },
      {
        title: "Business approval tasks",
        description:
          "A My Task list for approvers, with a pipeline stepper on each merchant, so they can see where an application stands and act on it.",
      },
      {
        title: "Merchants and pricing",
        description:
          "Merchant and sub-merchant lists, create and edit forms driven by URL parameters, and MDR pricing with static and dynamic rates.",
      },
    ],
    stack: [
      "React 17",
      "Material UI",
      "TanStack Query",
      "TanStack Table",
      "Redux Toolkit",
      "Jotai",
      "React Hook Form",
      "i18next",
      "Leaflet",
      "Sentry",
      "Jest",
    ],
  },
  {
    slug: "loan-origination-system",
    title: "Loan Origination System",
    summary:
      "Loan applications from intake to approval. I built the maintenance groups module: role-aware tables and forms on a generated API client.",
    headline: "Loan Origination System: one module, *built end to end.*",
    industry: "banking",
    company: "PT Infosys Solusi Terpadu",
    role: "Frontend Web Developer",
    start: "2024-08",
    end: "2024-08",
    tags: ["Next.js", "MUI", "OpenAPI"],
    featured: false,
    status: "internal",
    links: {},
    commits: { mine: 34 },
    cover: { src: los.cover, alt: "Paper forms, a pen and a coffee mug on a dark desk" },
    screenshots: [
      {
        src: los.first,
        alt: "Bills, a calculator and a laptop on a desk",
        caption: "Maintenance groups",
      },
      {
        src: los.second,
        alt: "A woman at a table covered in papers",
        caption: "Edit group",
      },
    ],
    accent: "violet",
    visual: "groups",
    overview: {
      what: "A bank's system for handling loan applications.",
      who: "The bank's loan staff, and the administrators who decide what each of them may do.",
      use: "Moving a loan application from intake to approval. The module I built sets who belongs to which group and what each role is allowed to do.",
    },
    modules: [
      {
        title: "Group list and detail",
        description:
          "A listing table and a detail page for each group and its members, with columns that handle missing values and widths that hold long data.",
      },
      {
        title: "Create, edit, remove",
        description:
          "Modals to create and edit a group, and to add, edit and remove its members, each wired to its endpoint, with a confirmation before anything is deleted.",
      },
      {
        title: "Role-aware actions",
        description:
          "Buttons show only for the roles allowed to use them, so the same page works for administrators and for people who only view.",
      },
    ],
    stack: [
      "Next.js 14",
      "React",
      "Material UI",
      "TanStack Query",
      "React Hook Form",
      "Yup",
      "OpenAPI Generator",
      "Storybook",
    ],
  },
  {
    slug: "job-portal",
    title: "Job Portal",
    summary:
      "Job search with filters, company pages and Google sign-in, with session refresh handled at the edge, in a Turborepo monorepo.",
    headline: "Job Portal: job search that *gets out of the way.*",
    industry: "hr",
    company: "PT Data Integrasi Inovasi",
    role: "Frontend Developer",
    start: "2026-02",
    end: "2026-04",
    tags: ["Next.js", "Turborepo", "OAuth"],
    featured: true,
    // TODO: set links.live if the portal is public, or change status to "internal".
    status: "public",
    links: {},
    commits: { mine: 188, total: 281 },
    cover: { src: jobs.cover, alt: "A woman reading a resume at a table" },
    screenshots: [
      { src: jobs.first, alt: "A person using a laptop", caption: "Search and filters" },
      { src: jobs.second, alt: "Two people shaking hands", caption: "Company page" },
    ],
    accent: "orange",
    visual: "jobs",
    highlights: [
      { value: "67%", label: "Of the commits are mine" },
      { value: "188", label: "Commits" },
    ],
    overview: {
      what: "A public job board.",
      who: "Job seekers, and the companies hiring them.",
      use: "Searching and filtering openings, reading the details that matter, like salary range and requirements, browsing companies, and signing in with email or Google.",
    },
    modules: [
      {
        title: "Search and filters",
        description:
          "A hero search, a sidebar of categories and card filters that reset in one tap, shared as global options across the app.",
      },
      {
        title: "Job and company pages",
        description:
          "Job details with salary range, minimum experience, age range and education, company pages with their own openings, and breadcrumbs back.",
      },
      {
        title: "Sign-in that stays signed in",
        description:
          "Email and password and Google sign-in, with sessions checked and refreshed in the proxy and an API interceptor for expired sessions.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Turborepo",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "NextAuth",
      "Motion",
    ],
  },
  {
    slug: "hris-admin",
    title: "HRIS Admin",
    summary:
      "The control panel of a multi-tenant HRIS: tenants and their databases, versions, services and migrations. 82 of its 87 commits are mine.",
    headline: "HRIS Admin: the control panel of *a multi-tenant HRIS.*",
    industry: "hr",
    company: "PT Data Integrasi Inovasi",
    role: "Frontend Developer",
    start: "2026-03",
    end: "2026-04",
    tags: ["Next.js", "Zod", "TanStack"],
    featured: false,
    status: "internal",
    links: {},
    commits: { mine: 82, total: 87 },
    cover: { src: hrisAdmin.cover, alt: "Network cables plugged into a server switch" },
    screenshots: [
      { src: hrisAdmin.first, alt: "A monitoring screen", caption: "Tenants" },
      { src: hrisAdmin.second, alt: "A rack of servers", caption: "Versions and migrations" },
    ],
    accent: "rose",
    visual: "tenants",
    overview: {
      what: "The control panel of a multi-tenant HRIS: an HR system in which every customer company runs as its own tenant.",
      who: "The HRIS team that sets up and runs each customer's instance.",
      use: "Managing tenants and their databases, the versions they run, the services they use and their migrations, with checks that stop a tenant being set up wrong.",
    },
    modules: [
      {
        title: "Tenants",
        description:
          "A tenant table with status and deployment, a detail page for each tenant, a database connection test before saving, and the current version marked.",
      },
      {
        title: "Versions and migrations",
        description:
          "Pick the version a tenant runs and migrate it from a dialog, with the API's own messages in the toasts.",
      },
      {
        title: "Services",
        description:
          "Turn services on and off for each tenant, and remove them from the tenant's detail page.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Recharts",
    ],
  },
  {
    slug: "hris-recruitment",
    title: "HRIS Recruitment",
    summary:
      "Recruitment requests and workforce plans that move through drafts, revisions and approvals, built on pinned data tables.",
    headline: "HRIS Recruitment: hiring requests *that move through approvals.*",
    industry: "hr",
    company: "PT Data Integrasi Inovasi",
    role: "Frontend Developer",
    start: "2026-01",
    end: "2026-04",
    tags: ["Next.js", "Turborepo", "Tables"],
    featured: false,
    status: "internal",
    links: {},
    commits: { mine: 71 },
    cover: { src: recruitment.cover, alt: "People around a meeting table taking notes" },
    screenshots: [
      {
        src: recruitment.first,
        alt: "A man presenting to colleagues at a table",
        caption: "Recruitment requests",
      },
      {
        src: recruitment.second,
        alt: "Two women talking across a table",
        caption: "Workforce plans",
      },
    ],
    accent: "teal",
    visual: "approvals",
    overview: {
      what: "The recruitment part of the new HRIS.",
      who: "Managers who need new hires, and the HR staff and approvers who sign their requests off.",
      use: "Requesting new hires and planning the workforce, with each request moving from draft through revision to approval.",
    },
    modules: [
      {
        title: "Recruitment requests",
        description:
          "Requests with approval notes, a submit button for every role while a request is a draft or in revision, and status badges in clear colours.",
      },
      {
        title: "Workforce plans",
        description:
          "Plans of the positions to fill, with search-select inputs and a section for roles being replaced.",
      },
      {
        title: "Tables built for long lists",
        description:
          "Pinned columns, tooltips that stay in view, and pagination that holds up with real data.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Turborepo",
      "TanStack Query",
      "Zod",
    ],
  },
];

const yearOf = (project: ProjectEntry) => Number((project.end ?? project.start).slice(0, 4));

// Ongoing projects first, then by when they ended, then by when they started.
const projects: Project[] = entries
  .map((project) => ({ ...project, year: yearOf(project) }))
  .toSorted(
    (a, b) => (b.end ?? "9999").localeCompare(a.end ?? "9999") || b.start.localeCompare(a.start),
  );

const contributions: Contribution[] = [
  {
    title: "HRIS (v1)",
    description: "Features and fixes on the first version of the HR system.",
    company: "Data Integrasi Inovasi",
    period: "2025–2026",
  },
  {
    title: "BTN Properti",
    description: "Fixes and small features on a property listing platform.",
    company: "Infosys Solusi Terpadu",
    period: "2023–2024",
  },
];

/** All projects, newest first. */
export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/** The big card at the top of /projects. */
export function getSpotlightProject(): Project | undefined {
  return projects.find((project) => project.spotlight);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after this one in the list, wrapping round, for "Next project". */
export function getNextProject(project: Project): Project {
  const index = projects.findIndex((other) => other.slug === project.slug);
  return projects[(index + 1) % projects.length];
}

export function getContributions(): Contribution[] {
  return contributions;
}
