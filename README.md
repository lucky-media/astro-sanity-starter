# Astro + Sanity Starter

A monorepo starter for building content-driven websites with Astro and Sanity Studio. It includes a page builder, blog, SEO, redirects, draft mode, and a two-level page hierarchy out of the box.

## What's included

- **Astro 6** frontend with static output by default, SSR when draft mode is enabled
- **Sanity Studio v5** with a structured sidebar, page builder, and custom initial value templates
- **Turborepo** with npm workspaces for managing the monorepo
- **TypeGen** pipeline — GROQ queries in the web app drive shared TypeScript types
- **Page builder** — block-based content with `heroSection` and `ctaSection` to start
- **Blog** — posts with slugs, portable text, and SEO
- **Page hierarchy** — two-level parent/child pages with computed URL paths (`/solutions/data-warehouse`)
- **SEO** — three-tier priority: per-page fields, Sanity global settings, or `seo.config.ts` fallback
- **Redirects** — managed in Sanity, fetched at build time and written to Astro's redirect config
- **Draft mode** — switch to SSR + Sanity perspectives for live preview in Studio
- **Visual editing** — stega-based overlay links when `PUBLIC_SANITY_VISUAL_EDITING=true`
- **Alpine.js** and **Tailwind CSS v4** included on the frontend

## Repo structure

```
apps/
  studio/             Sanity Studio v5
  web/                Astro 6 frontend
packages/
  sanity-types/       Shared TypeGen output (@starter/sanity-types)
```

## Getting started

### 1. Clone and install

```bash
git clone <repo-url> my-project
cd my-project
npm install
```

### 2. Connect to Sanity

Create a Sanity project at [sanity.io](https://sanity.io) if you don't have one, then:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/studio/.env.example apps/studio/.env
```

Fill in the project ID and dataset in both files.

### 3. Generate types

```bash
npm run typegen
```

This scans GROQ queries in `apps/web/src` and outputs TypeScript types to `packages/sanity-types/sanity.types.ts`. Run it whenever you change a schema or query.

### 4. Start development

```bash
npm run dev
```

Studio runs at `http://localhost:3333`, web at `http://localhost:4321`.

## Placeholder values to update

| File                                 | Key                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `apps/web/.env`                      | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`                          |
| `apps/web/src/seo.config.ts`         | `siteName`, `siteUrl`, `defaultTitle`, `defaultDescription`, `twitterHandle` |
| `apps/web/astro.config.mjs`          | `site` URL                                                                   |
| `apps/studio/.env`                   | `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`                          |
| `package.json` (root)                | package name                                                                 |
| `packages/sanity-types/package.json` | package name                                                                 |

## Adding a block

1. Create `apps/studio/schemaTypes/blocks/myBlock.ts`
2. Register it in `apps/studio/components/pageBuilder.ts`
3. Add a GROQ fragment in `apps/web/src/queries/blocks.ts`
4. Add rendering logic in `apps/web/src/components/PageBuilder.astro`
5. Run `npm run typegen`

## Environment variables

```
PUBLIC_SANITY_PROJECT_ID=     # Sanity project ID
PUBLIC_SANITY_DATASET=        # Usually "production"
PUBLIC_SANITY_USE_DRAFTS=     # "true" to enable draft mode (switches output to SSR)
PUBLIC_SANITY_VISUAL_EDITING= # "true" to enable visual editing overlays
PUBLIC_SANITY_STUDIO_URL=     # Studio URL for stega links
SANITY_API_TOKEN=             # Required when USE_DRAFTS=true
```

## Key commands

```bash
npm run dev        # Start all apps
npm run build      # Build all apps
npm run typegen    # Regenerate types from schema and queries
```

## Page hierarchy

Pages support up to two levels of nesting. Set a parent on a page to create a nested URL:

- Parent slug `solutions` → `/solutions`
- Child slug `data-warehouse` with parent `solutions` → `/solutions/data-warehouse`

The full path is computed in GROQ at query time. No custom publish actions required.

## Draft mode

Set `PUBLIC_SANITY_USE_DRAFTS=true` and provide a `SANITY_API_TOKEN`. This switches Astro to SSR output and sets the Sanity client perspective to `drafts`, so unpublished content is visible.

## Tech stack

- [Astro 6](https://astro.build)
- [Sanity Studio v5](https://sanity.io)
- [Turborepo](https://turbo.build)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Alpine.js](https://alpinejs.dev)
- [astro-portabletext](https://github.com/portabletext/astro-portabletext)
- [@sanity/image-url](https://github.com/sanity-io/image-url)
