# Astro + Sanity Starter

Turborepo monorepo starter for Astro + Sanity projects.

## Repo Structure

```
apps/
  studio/   Sanity Studio v5
  web/      Astro 6 frontend
packages/
  sanity-types/   Shared TypeGen output (@starter/sanity-types)
```

## Key Commands

```bash
npm run dev        # Start all apps
npm run build      # Build all apps
npm run typegen    # Extract schema + generate types (runs in studio)
```

Individual apps:

```bash
cd apps/web && npm run dev
cd apps/studio && npm run dev
```

## Setup for a New Project

1. Copy `.env.example` → `.env` in both `apps/web/` and `apps/studio/` and fill in Sanity credentials
2. Update placeholder values (see table below)
3. Run `npm install` from root
4. Run `npm run typegen` after connecting to a Sanity project to generate real types

### Placeholder Values

| File                                 | Key                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `apps/web/.env`                      | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`                          |
| `apps/studio/.env`                   | `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`                          |
| `apps/web/src/seo.config.ts`         | `siteName`, `siteUrl`, `defaultTitle`, `defaultDescription`, `twitterHandle` |
| `apps/web/astro.config.mjs`          | `site` URL                                                                   |
| `package.json` (root)                | package name                                                                 |
| `packages/sanity-types/package.json` | package name                                                                 |

## Architecture

### Studio

- **Globals** (`globals/`): `settings.ts`, `redirects.ts`, `navigation.ts` — singleton documents
- **Shared components** (`components/`): `heading.ts`, `image.ts`, `link.ts`, `seo.ts`
- **Blocks** (`components/blocks/`): `heroSection.ts`, `ctaSection.ts` — add new blocks here
- **Page builder** (`components/pageBuilder.ts`): register new blocks in the array
- **Document types** (`schemaTypes/`): `pages.ts`, `posts.ts`
- **Structure** (`structure/index.ts`): custom studio sidebar layout

### Web

- **Sanity client** (`src/utils/sanity.ts`): draft/visual editing support via env vars
- **GROQ queries** (`src/queries/`): `globals.ts`, `pages.ts`, `posts.ts`, `components.ts`
- **Pages**: `index.astro` (home), `[...slug].astro` (pages, supports nested URLs), `blog/[slug].astro` (posts)
- **Redirects integration** (`src/integrations/redirects.ts`): fetches from Sanity at build time
- **SEO** (`src/seo.config.ts` + `src/lib/metadata.ts`): 3-tier priority (props > Sanity SEO > global config)

### Page Hierarchy

Pages support a two-level parent/child hierarchy. A child page stores a reference to its parent; the full URL path is computed at query time via GROQ `select()`.

- Parent page: slug `solutions` → URL `/solutions`
- Child page: slug `data-warehouse`, parent `solutions` → URL `/solutions/data-warehouse`

The `parent` reference field is filtered to only allow top-level pages as parents, enforcing a maximum depth of two levels. The Studio sidebar lists all pages in a flat list with the full URL shown as the subtitle so editors can see the hierarchy at a glance.

### TypeGen

Types live in `packages/sanity-types/sanity.types.ts`. The file is a placeholder until you run `npm run typegen`.

The `sanity.cli.ts` scans `apps/web/src/**/*.{ts,tsx}` for GROQ queries and outputs to `packages/sanity-types/`.

## Adding a New Block

1. Create `apps/studio/components/blocks/myBlock.ts`
2. Register in `apps/studio/components/pageBuilder.ts`
3. Add to `apps/studio/schemaTypes/index.ts`
4. Add a GROQ fragment in `apps/web/src/queries/components.ts`
5. Add rendering logic to the relevant page in `apps/web/src/pages/`
6. Run `npm run typegen` to update types

## Environment Variables

```
PUBLIC_SANITY_PROJECT_ID=    # Sanity project ID
PUBLIC_SANITY_DATASET=       # Usually "production"
PUBLIC_SANITY_USE_DRAFTS=    # "true" to enable draft mode (SSR)
PUBLIC_SANITY_VISUAL_EDITING= # "true" to enable visual editing
PUBLIC_SANITY_STUDIO_URL=    # Studio URL for stega links
SANITY_API_TOKEN=            # Required when USE_DRAFTS=true
```

## Tech Stack

- **Astro 6**
- **Sanity Studio v5** with `structureTool` + `visionTool`
- **Turborepo** with npm workspaces
- `astro-portabletext` for portable text rendering
- `@sanity/image-url` for image URLs
- `groq` package with `defineQuery` for typed queries
