import type { AstroIntegration } from "astro";
import { createClient } from "@sanity/client";
import { loadEnv } from "vite";
import { REDIRECTS as REDIRECTS_QUERY } from "../queries/globals";
import type { REDIRECTS_RESULT } from "@starter/sanity-types";

export function sanityRedirectsPlugin(): AstroIntegration {
  return {
    name: "sanity-redirects",
    hooks: {
      "astro:config:setup": async ({ updateConfig, logger }) => {
        logger.info("Fetching redirects from Sanity...");

        const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
        const projectId = env.PUBLIC_SANITY_PROJECT_ID;
        const dataset = env.PUBLIC_SANITY_DATASET || "production";

        if (!projectId) {
          logger.warn("PUBLIC_SANITY_PROJECT_ID not set — skipping redirects.");
          return;
        }

        const client = createClient({
          projectId,
          dataset,
          apiVersion: "2025-01-01",
          useCdn: true,
        });

        type RedirectEntry = NonNullable<NonNullable<REDIRECTS_RESULT>["redirects"]>[number];

        let entries: RedirectEntry[] = [];

        try {
          const result = await client.fetch(REDIRECTS_QUERY);
          entries = result?.redirects ?? [];
        } catch (err) {
          logger.warn(`Could not fetch redirects from Sanity: ${err}`);
        }

        logger.info(`Found ${entries.length} redirect(s).`);

        const redirects = Object.fromEntries(
          entries
            .filter((r) => r.source && r.destination)
            .map((r) => [
              r.source!,
              { status: (r.isPermanent ? 301 : 302) as 301 | 302, destination: r.destination! },
            ]),
        );

        updateConfig({ redirects });
      },
    },
  };
}
