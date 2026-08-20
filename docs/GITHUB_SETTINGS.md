# GitHub release settings

Read-only audit date: 2026-08-20. Repository: `rybinskyi-bauxpert-de/rybinskyi-bauxpert-website`.

## Observed state

- `main` has no branch protection rule and no repository ruleset.
- The active administrator has direct push access; force-push and branch deletion are not rule-blocked.
- Repository Actions allow all actions and do not require full-SHA pinning server-side.
- Pages uses GitHub Actions, has no custom domain, enforces HTTPS, and its environment currently permits `main` deployments. Admin bypass is enabled.
- The previous deploy workflow allowed manual dispatch. The repository workflow now limits deployment to a merged pull request targeting `main`; GitHub settings still need to enforce the matching policy.

No setting was changed because the requested audit was read-only.

## Required main ruleset

Open `Settings → Rules → Rulesets → New ruleset → New branch ruleset` and configure:

1. Name: `Protect main`; enforcement: `Active`.
2. Target branches: include default branch (`main`).
3. Require a pull request before merging.
4. Required approvals: use `0` until an independent reviewer is added; then change to `1`. With only one collaborator, requiring one approval would deadlock every pull request.
5. Require conversation resolution before merging.
6. Require status checks to pass and require the branch to be up to date.
7. Select these stable check names after their first pull-request run:
   - `Static release gates`
   - `Browser release gates`
   - `Lighthouse budgets`
8. Block force pushes.
9. Block branch deletion.
10. Do not add bypass actors. Disable administrator bypass where the organization plan exposes that option.
11. Save and verify with a non-destructive test pull request. Do not test by pushing directly to `main`.

## Actions policy

Open `Settings → Actions → General`:

1. Restrict actions to GitHub-authored actions needed by the two workflows, or use the narrowest organization policy available.
2. Enable `Require actions to be pinned to a full-length commit SHA`.
3. Keep default workflow permissions at `Read repository contents permission`.
4. Keep `Allow GitHub Actions to create and approve pull requests` disabled.

Every `uses:` entry in this branch is pinned to a full commit SHA even before the server-side requirement is enabled.

## Pages and environment

Open `Settings → Pages` and `Settings → Environments → github-pages`:

1. Keep source `GitHub Actions`.
2. Keep the custom-domain field empty until the customer checklist is complete.
3. Keep HTTPS enforcement enabled.
4. Restrict deployment to `main` and disable administrator bypass.
5. Do not add a manual deployment path.

The Pages workflow runs only for a closed pull request whose base is `main` and whose `merged` flag is true. It uploads only `dist`.

## Agent policy

- Agents work on feature or release branches.
- Agents never push directly to `main`.
- This release stays in a draft pull request while image rights, provider details, actual services, biography handling, or final customer approval remain open.
