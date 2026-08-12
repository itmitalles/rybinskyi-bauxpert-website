import { defineConfig } from "astro/config";

import { siteConfig } from "./src/config/site";

const [githubOwner = siteConfig.githubOwner, githubRepository = siteConfig.repositoryName] =
  (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isProjectPages = isGitHubActions && githubRepository !== `${githubOwner}.github.io`;
const base = process.env.PUBLIC_BASE_PATH ?? (isProjectPages ? `/${githubRepository}` : undefined);
const site =
  process.env.PUBLIC_SITE_URL ??
  (isGitHubActions ? `https://${githubOwner}.github.io` : siteConfig.productionUrl);

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  build: {
    assets: "_assets",
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
