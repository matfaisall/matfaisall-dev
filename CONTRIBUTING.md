# Contributing

Thanks for working on this project. This guide covers the workflow and, most importantly, the
**commit message convention**, which is checked automatically on every commit.

For the folder structure, code style, SEO and animation conventions, see the
[README](README.md#architecture).

## Contents

- [Setup](#setup)
- [Workflow](#workflow)
- [Commit messages](#commit-messages)
- [Automatic checks](#automatic-checks)
- [Before you push](#before-you-push)
- [References](#references)

## Setup

Requirements: Node.js 22 or newer (`.nvmrc` pins 24) and pnpm 11.

```bash
pnpm install
```

`pnpm install` also installs the Git hooks (Husky), so the checks below run from your first
commit.

## Workflow

1. Start from an up-to-date `main`.
2. Create a branch named `<type>/<short-description>`, using the same types as commit messages:

   ```text
   feat/blog-tags
   fix/theme-flash
   docs/contributing-guide
   refactor/project-card
   ```

3. Make small, focused commits (see [Commit messages](#commit-messages)).
4. Run the checks in [Before you push](#before-you-push), then push and open a pull request.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
([Bahasa Indonesia](https://www.conventionalcommits.org/id/v1.0.0/)), enforced by
[commitlint](https://commitlint.js.org) with the
[`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
preset (see [`commitlint.config.mjs`](commitlint.config.mjs)). A commit that doesn't match is
rejected.

### Format

```text
<type>(<scope>): <subject>

<body>

<footer>
```

| Part | Required | What it is |
| --- | --- | --- |
| `type` | yes | The kind of change (see [Types](#types)) |
| `scope` | no | The part of the project that changed, in parentheses (see [Scopes](#scopes)) |
| `subject` | yes | A short summary of the change |
| `body` | no | Why the change was made, or what it includes. Separated by a blank line. |
| `footer` | no | `BREAKING CHANGE: …`, or issue references such as `Closes #12`. Separated by a blank line. |

Example:

```text
feat(blog): add reading time to posts

Reading time is estimated at 200 words per minute and shown next to the date.

Closes #12
```

### Types

Only these 11 types are accepted:

| Type | Use it when you… | Example |
| --- | --- | --- |
| `feat` | add something visitors can see or use | `feat(blog): add tag filter` |
| `fix` | fix a bug | `fix(theme): prevent flash on first load` |
| `docs` | change documentation only | `docs: explain how to add a route` |
| `style` | change formatting only, without changing behaviour | `style: apply biome formatting` |
| `refactor` | restructure code without changing behaviour | `refactor(ui): extract card component` |
| `perf` | make something faster or lighter | `perf(projects): lazy load cover images` |
| `test` | add or update tests | `test(blog): cover metadata validation` |
| `build` | change dependencies or the build setup | `build(deps): upgrade next to 16.5` |
| `ci` | change the CI pipeline | `ci: run lint on pull requests` |
| `chore` | do other maintenance that fits none of the above | `chore: update gitignore` |
| `revert` | undo an earlier commit | `revert: feat(blog): add tag filter` |

If a change fits two types, it's probably two commits.

### Scopes

The scope is optional, but use it whenever the change is limited to one area. Use the name of the
folder or feature that changed:

| Scope | Area |
| --- | --- |
| `about`, `projects`, `blog`, `contact` | A feature in `src/features/` and its routes |
| `ui` | Primitives in `src/components/ui/` |
| `layout` | Header, footer, navigation in `src/components/layout/` |
| `motion` | GSAP setup and `src/components/motion/` |
| `seo` | Metadata, Open Graph images, JSON-LD, sitemap, robots |
| `theme` | Colours, fonts, radius, dark mode (`globals.css`, `fonts.ts`) |
| `content` | Blog posts and content data (`src/content/`, `data.ts` files) |
| `storybook` | `.storybook/` and docs-only stories |
| `deps` | Dependency updates (usually with `build`) |

Leave the scope out when a change touches many areas, for example `docs: update readme`.

### Rules (checked automatically)

| Rule | ✅ Accepted | ❌ Rejected |
| --- | --- | --- |
| A type is required | `fix: correct sitemap url` | `correct sitemap url` |
| The type is one of the 11 above | `feat: add blog` | `feature: add blog` |
| The type is lowercase | `feat: add blog` | `Feat: add blog` |
| A subject is required | `docs: fix typo in readme` | `docs:` |
| The subject doesn't start with a capital letter | `feat: add blog` | `feat: Add blog` |
| The subject doesn't end with a full stop | `feat: add blog` | `feat: add blog.` |
| The first line is at most 100 characters | | |
| Body and footer lines are at most 100 characters | | |
| A blank line separates the header, body and footer | | |

### Guidelines (not checked, but expected)

- **Write in English, in the imperative mood:** `add`, `fix`, `remove`, not `added`, `fixes` or
  `removing`. Read it as "If applied, this commit will *add tag filter*".
- **Describe the change, not the activity:** `fix(seo): use production url in sitemap`, not
  `fix: some fixes` or `chore: update files`.
- **Keep one change per commit.** A new blog feature and a font fix are two commits. Small commits
  are easier to review and to revert.
- **Use the body for the *why*** when the subject alone doesn't explain it.

### Breaking changes

When a change breaks something that used to work (an old URL, a component's props), add `!`
after the type or scope, and explain it in a `BREAKING CHANGE:` footer:

```text
feat(blog)!: move posts from /blog to /articles

BREAKING CHANGE: old /blog/<slug> URLs no longer work. Redirects are added in next.config.ts.
```

### When a commit is rejected

commitlint prints what's wrong and the commit is not created. For example, `Added blog page.`
gives:

```text
✖   subject may not be empty [subject-empty]
✖   subject may not end with full stop [subject-full-stop]
✖   type may not be empty [type-empty]
```

Fix the message and commit again. Your staged changes are kept. To reword the **last** commit
before pushing:

```bash
git commit --amend
```

To check a message without committing:

```bash
echo "feat(blog): add tag filter" | pnpm exec commitlint
```

## Automatic checks

Git hooks in [`.husky/`](.husky) run on every commit:

| Hook | Runs | Checks |
| --- | --- | --- |
| `pre-commit` | `lint-staged`, then `pnpm lint:arch` | Biome lints and formats the staged files; dependency-cruiser checks import rules |
| `commit-msg` | `commitlint` | The commit message follows the convention above |

Don't skip them with `--no-verify`. If a hook fails, fix the reported problem instead.

## Before you push

Run the same checks CI should run:

```bash
pnpm lint && pnpm lint:arch && pnpm typecheck && pnpm build
```

And, if you changed components or stories:

```bash
pnpm build-storybook
```

Checklist for a pull request:

- [ ] Every commit message follows the convention.
- [ ] New components in `components/ui`, `components/motion` or `features/*/components` have a story.
- [ ] New pages use `createPageMetadata()` and are added to `src/app/sitemap.ts`.
- [ ] New content (projects, posts) has no leftover `TODO` placeholders.
- [ ] The UI works in light and dark mode, and with reduced motion.

## References

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) (also in
  [Bahasa Indonesia](https://www.conventionalcommits.org/id/v1.0.0/)): the specification
- [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional):
  the exact rules this project uses
- [commitlint rules reference](https://commitlint.js.org/reference/rules.html): what each rule means
- [Angular commit message guidelines](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md):
  where the convention and its types come from
