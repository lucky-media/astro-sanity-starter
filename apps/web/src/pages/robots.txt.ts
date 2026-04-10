import type { APIRoute } from "astro";
import { client } from "@/utils/sanity";

export const GET: APIRoute = async () => {
  let siteUrl = "https://your-site.com";

  try {
    const seoDefaults = await client.fetch(
      `*[_type == "seoDefaults"][0].siteUrl`,
    );
    if (seoDefaults) {
      siteUrl = seoDefaults.replace(/\/$/, "");
    }
  } catch {
    // Sanity not configured — fall back to default site URL
  }

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
