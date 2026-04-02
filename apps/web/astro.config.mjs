import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import alpinejs from "@astrojs/alpinejs";

import tailwindcss from "@tailwindcss/vite";

import { sanityRedirectsPlugin } from "./src/integrations/redirects";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  PUBLIC_SANITY_USE_DRAFTS,
  PUBLIC_SANITY_VISUAL_EDITING,
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

const useDrafts = PUBLIC_SANITY_USE_DRAFTS === "true";
const visualEditing = PUBLIC_SANITY_VISUAL_EDITING === "true";
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

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
  output: useDrafts ? "server" : "static",
  integrations: [
    alpinejs({ entrypoint: "./src/alpine.ts" }),
    sitemap(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID || "placeholder",
      dataset: PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      apiVersion: "2025-01-01",
      stega: {
        studioUrl,
        enabled: visualEditing,
      },
    }),
    sanityRedirectsPlugin(),
  ],
});
