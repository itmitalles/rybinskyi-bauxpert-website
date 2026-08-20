# Current state

Updated: 2026-08-20 on `release/final-customer-preview`.

- The customer preview now opens on one shared overview with exactly three routes: `/standard/`, `/premium/`, and `/kleinanzeigen/`. Every route has a prominent full-width return bar to `/` on desktop and mobile.
- Standard and premium remain kitchen-led and use an explicitly labelled original vector placeholder because no customer photo has documented rights approval. Preferred real website hero after approval: `src/assets/projects/kuechenmontage-u-form/fertig.jpg`.
- The new Kleinanzeigen proposal has original grounded copy and four newly generated kitchen, furniture, and floor visuals. Every visual is permanently marked as a visualization and not a reference photo; the advert is explicitly marked unpublished.
- All customer raster assets and the legacy PNG brand/favicon remain outside `dist`. The allowlist contains three original SVGs and the four isolated generated preview visuals.
- The unapproved personal biography is removed from the public pages.
- Services are ordered: kitchen, furniture/adaptation, interior fit-out, floors, renovation, smaller projects. Regulated work is explicitly separated.
- Preview/noindex/robots block and PIN gate remain active; no custom-domain action was taken.
- PR and post-merge Pages workflows are implemented with full-SHA actions. GitHub settings were audited read-only and remain unprotected; required UI steps are in `docs/GITHUB_SETTINGS.md`.
- PR #1 was merged on the user's explicit instruction to publish the PIN/noindex customer preview on the public GitHub Pages domain while keeping every final-release approval pending. The Pages workflow uses a guarded `main` push: it verifies that the commit belongs to a merged PR, so a direct push cannot deploy.
- Verified locally: Astro check/build, static/link/asset/JSON gates, 31 passing Playwright checks across desktop/mobile (one expected desktop skip for the mobile-only menu test), axe with no serious/critical findings, screenshots, and Lighthouse budgets for both overview and Kleinanzeigen. Scores: overview 1.00/1.00/1.00 and Kleinanzeigen 0.98/1.00/1.00 for performance/accessibility/best-practices; preview SEO remains intentionally reduced by noindex.
- The release branch and follow-up Pages trigger fix are locally verified and authorized for scoped staging, commit, push, PR creation, and merge. GitHub is authoritative for the resulting publication and check status.
