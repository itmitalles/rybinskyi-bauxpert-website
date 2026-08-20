# Rybinskyi BauXpert website

Static Astro customer preview for Rybinskyi BauXpert in Munich. The project belongs to the GitHub organization [`rybinskyi-bauxpert-de`](https://github.com/rybinskyi-bauxpert-de) and is published from this repository through GitHub Pages.

## Current release status

There is one final preview direction: the restrained split-layout and material palette derived from the former premium concept, combined with concrete, grounded copy. Kitchen installation, furniture assembly and dimensional adjustments, and interior fit-out are the primary services.

The preview remains intentionally blocked from a live release:

- `previewMode` is enabled.
- Every page contains `noindex,nofollow,noarchive`.
- `robots.txt` disallows all crawling.
- A lightweight PIN gate discourages casual access but is not secure access control.
- No custom domain is configured or switched.
- The former `/premium/` page and concept switcher are absent.

## Visual assets

No customer project photo has a documented rights approval. Customer raster images therefore remain in the repository but outside `dist`. The hero uses an original neutral kitchen vector labelled as a placeholder. After written approval, the preferred real hero candidate is `src/assets/projects/kuechenmontage-u-form/fertig.jpg`.

The authoritative register is [`docs/ASSET_APPROVAL.md`](docs/ASSET_APPROVAL.md). `config/asset-approvals.json` is the machine-readable build allowlist.

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

The gates cover Astro validation, build, static links and fragments, asset approval, JSON schemas and JSON-LD, noindex/canonical/sitemap/robots, legal routes, 404, contact links, PIN behavior, one final concept, kitchen-first hero, mobile navigation, WhatsApp privacy behavior, axe, horizontal overflow, desktop/mobile screenshots, Lighthouse budgets, and external tracker regression.

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
