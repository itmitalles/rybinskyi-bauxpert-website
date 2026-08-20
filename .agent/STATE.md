# Current state

Updated: 2026-08-20 on `fix/show-preview-images`.

- The customer preview opens on one shared overview with two website routes, `/standard/` and `/premium/`, plus the separate `/kleinanzeigen/` copy/download package. Every route has a prominent full-width return bar to `/` on desktop and mobile.
- The original customer logo is restored in the shared header, overview, PIN gate, and Kleinanzeigen package through a 320px WebP derivative of `src/assets/brand/logo.png`.
- Standard and premium retain their existing visual directions. Both use the finished U-shaped kitchen as hero; selected kitchen, furniture, floor, and secondary sauna photos are shown below.
- `/kleinanzeigen/` is intentionally simple: copyable title, copyable grounded advert text, and four real customer-photo downloads. The former generated visuals were removed from the current build.
- The repository owner expressly authorized the selected customer assets for this PIN/noindex preview. Denys' final image-rights confirmation remains pending and continues to block custom-domain/final release.
- The unapproved personal biography is removed from the public pages.
- Services are ordered: kitchen, furniture/adaptation, interior fit-out, floors, renovation, smaller projects. Regulated work is explicitly separated.
- Preview/noindex/robots block and PIN gate remain active; no custom-domain action was taken.
- PR and post-merge Pages workflows are implemented with full-SHA actions. GitHub settings were audited read-only and remain unprotected; required UI steps are in `docs/GITHUB_SETTINGS.md`.
- PR #1 was merged on the user's explicit instruction to publish the PIN/noindex customer preview on the public GitHub Pages domain while keeping every final-release approval pending. The Pages workflow uses a guarded `main` push: it verifies that the commit belongs to a merged PR, so a direct push cannot deploy.
- Verified locally after the asset restoration: Astro check/build, static/link/asset/JSON gates, 31 passing Playwright checks across desktop/mobile (one expected desktop skip), copy/download controls, axe with no serious/critical findings, screenshots, and Lighthouse budgets. Scores: overview and Kleinanzeigen both 1.00/1.00/1.00 for performance/accessibility/best-practices; preview SEO remains intentionally reduced by noindex.
- The release branch and follow-up Pages trigger fix are locally verified and authorized for scoped staging, commit, push, PR creation, and merge. GitHub is authoritative for the resulting publication and check status.
