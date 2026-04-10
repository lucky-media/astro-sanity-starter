import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import alpinejs from "@astrojs/alpinejs";
import { defaultSeo } from "@lucky-media/astro-seo";

import tailwindcss from "@tailwindcss/vite";

import { sanityRedirectsPlugin } from "./src/integrations/redirects";
import { fetchSeoDefaults } from "./src/lib/seo-defaults";
import { sanityConfig } from "./src/lib/sanity-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://your-site.com",
  trailingSlash: "never",
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [tailwindcss()],
  },
  output: sanityConfig.useDrafts ? "server" : "static",
  integrations: [
    defaultSeo(() => fetchSeoDefaults()),
    alpinejs({ entrypoint: "./src/alpine.ts" }),
    sitemap(),
    sanity({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      useCdn: false,
      apiVersion: "2025-01-01",
      stega: {
        studioUrl: sanityConfig.studioUrl,
        enabled: sanityConfig.visualEditing,
      },
    }),
    sanityRedirectsPlugin(),
  ],
});
