# Rybinskyi BauXpert website

Static Astro customer preview for Rybinskyi BauXpert in Munich. The project belongs to the GitHub organization [`rybinskyi-bauxpert-de`](https://github.com/rybinskyi-bauxpert-de) and is published from this repository through GitHub Pages.

## Current release status

The current customer-comparison preview has one shared entry page and three explicitly named routes: a direct standard website, the restrained premium-derived website, and a new Kleinanzeigen advert proposal. Every variant has a prominent full-width return bar back to the overview. This comparison is temporary; customer approval must select the final website direction before live release.

The preview remains intentionally blocked from a live release:

- `previewMode` is enabled.
- Every page contains `noindex,nofollow,noarchive`.
- `robots.txt` disallows all crawling.
- A lightweight PIN gate discourages casual access but is not secure access control.
- No custom domain is configured or switched.
- `/standard/`, `/premium/`, and `/kleinanzeigen/` are preview-only routes and are excluded from the sitemap.

## Visual assets

No customer project photo has a documented rights approval. Customer raster images therefore remain in the repository but outside `dist`. The website variants use an original neutral kitchen vector labelled as a placeholder. The Kleinanzeigen route uses four newly generated, permanently labelled preview visualizations that are not customer references. After written approval, the preferred real website hero candidate is `src/assets/projects/kuechenmontage-u-form/fertig.jpg`.

The authoritative register is [`docs/ASSET_APPROVAL.md`](docs/ASSET_APPROVAL.md). `config/asset-approvals.json` is the machine-readable build allowlist. The advert copy, visual prompts, and publication limits are documented in [`docs/KLEINANZEIGEN_PREVIEW.md`](docs/KLEINANZEIGEN_PREVIEW.md).

## Customer approval

Provider details, actual services, regulated-work boundaries, service area, image rights, biography handling, and final design all require written customer confirmation. The checklist is [`docs/CUSTOMER_APPROVAL_CHECKLIST.md`](docs/CUSTOMER_APPROVAL_CHECKLIST.md); its machine-readable mirror is `config/release-approvals.json`.

## Development

```bash
npm ci
npm run dev
```

## Release checks

```bash
npm run typecheck
npm run build
npm test
npm run test:browser
npm run test:lighthouse
```

The gates cover Astro validation, build, static links and fragments, asset approval, JSON schemas and JSON-LD, noindex/canonical/sitemap/robots, legal routes, 404, contact links, PIN behavior, exactly three preview variants and their overview return path, kitchen-first heroes, generated-image disclosures, mobile navigation, WhatsApp privacy behavior, axe, horizontal overflow, desktop/mobile screenshots, Lighthouse budgets, and external tracker regression.

Playwright uses its bundled Chromium. Install it once in a new environment with `npx playwright install chromium`; CI installs Chromium and required system dependencies automatically.

## Preview PIN

The build accepts a SHA-256 digest through `PUBLIC_PREVIEW_PIN_HASH`. The clear PIN is never committed or compared directly. Because the hash and client logic are public in a static build, the gate is only a casual preview barrier.

## GitHub release flow

- Pull requests targeting `main` run three stable required checks: `Static release gates`, `Browser release gates`, and `Lighthouse budgets`.
- Every action is pinned to a full commit SHA.
- Pages deploys only after a pull request targeting `main` is merged.
- Only `dist` is uploaded.
- Pull requests never deploy Pages.
- Exact repository-settings steps are documented in [`docs/GITHUB_SETTINGS.md`](docs/GITHUB_SETTINGS.md).

Do not disable preview mode, configure the custom domain, or merge a live release while any required customer approval remains pending.
