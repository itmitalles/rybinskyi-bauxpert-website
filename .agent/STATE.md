# Current state

Updated: 2026-08-20 on `release/final-customer-preview`.

- One final premium-derived, grounded customer preview is implemented; the concept selector and `/premium/` product are removed.
- The hero is kitchen-led but uses an explicitly labelled original vector placeholder because no customer photo has documented rights approval. Preferred photo after approval: `src/assets/projects/kuechenmontage-u-form/fertig.jpg`.
- All customer raster assets and the legacy PNG brand/favicon are outside `dist`; only three approved original SVGs are built.
- The unapproved personal biography is removed from the public pages.
- Services are ordered: kitchen, furniture/adaptation, interior fit-out, floors, renovation, smaller projects. Regulated work is explicitly separated.
- Preview/noindex/robots block and PIN gate remain active; no custom-domain action was taken.
- PR and post-merge Pages workflows are implemented with full-SHA actions. GitHub settings were audited read-only and remain unprotected; required UI steps are in `docs/GITHUB_SETTINGS.md`.
- Verified locally: Astro check/build, static/link/asset/JSON gates, 23 Playwright tests across desktop/mobile (one expected desktop skip for the mobile-only menu test), axe with no serious/critical findings, screenshots, and Lighthouse budgets (1.00 performance/accessibility/best-practices, 0.69 preview SEO due to intentional noindex).
- The release branch is locally verified and authorized for scoped staging, commit, push, and creation of the requested draft PR. GitHub is authoritative for the resulting publication and check status.
