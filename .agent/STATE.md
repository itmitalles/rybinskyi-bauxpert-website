# Current state

Updated: 2026-08-20 on `feat/ukrainian-preview-cover`.

- The customer preview opens on one Ukrainian-language overview with two German website routes, `/standard/` and `/premium/`, plus the separate `/kleinanzeigen/` copy/download package. Every route has a prominent Ukrainian full-width return bar to `/` on desktop and mobile.
- The original customer logo is restored in the shared header, overview, PIN gate, and Kleinanzeigen package through a 320px WebP derivative of `src/assets/brand/logo.png`.
- Standard and premium retain their existing visual directions. Both use the finished U-shaped kitchen as hero; selected kitchen, furniture, floor, and secondary sauna photos are shown below.
- `/kleinanzeigen/` is intentionally simple: copyable title, copyable grounded advert text, one AI-assisted square lead composite, and four real customer-photo downloads. The former standalone generated visuals remain removed.
- The repository owner expressly authorized the selected customer assets for this PIN/noindex preview. Denys' final image-rights confirmation remains pending and continues to block custom-domain/final release.
- Standard, premium, and `/ueber-mich/` contain the historical Ukraine/Baufirma/Donbass biography. Its explicit approval is documented from the task thread on 2026-08-20.
- Services are ordered: kitchen, furniture/adaptation, interior fit-out, floors, renovation, smaller projects. Regulated work is explicitly separated.
- Preview/noindex/robots block and PIN gate remain active; no custom-domain action was taken.
- PR and post-merge Pages workflows are implemented with full-SHA actions. GitHub settings were audited read-only and remain unprotected; required UI steps are in `docs/GITHUB_SETTINGS.md`.
- PR #3 was merged on the user's explicit instruction and deployed the logo/customer-photo restoration to the public GitHub Pages PIN/noindex preview. The Pages workflow uses a guarded `main` push: it verifies that the commit belongs to a merged PR, so a direct push cannot deploy.
- Verified locally on the current branch: Astro check/build, static/link/asset/JSON gates, 35 passing Playwright checks across desktop/mobile (one expected desktop skip), Ukrainian chooser/back navigation, approved biography on both variants and `/ueber-mich/`, composite/copy/download controls, axe with no serious/critical findings, screenshots, and Lighthouse budgets. Scores: overview 1.00/1.00/1.00 and Kleinanzeigen 0.99/1.00/1.00 for performance/accessibility/best-practices; preview SEO remains intentionally reduced by noindex.
- The release branch and follow-up Pages trigger fix are locally verified and authorized for scoped staging, commit, push, PR creation, and merge. GitHub is authoritative for the resulting publication and check status.
