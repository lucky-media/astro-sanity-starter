import type { APIRoute } from "astro";
import { getSettings } from "@/lib/api";
import { defaultSeoConfig } from "@/seo.config";

export const GET: APIRoute = async () => {
  let siteUrl = defaultSeoConfig.siteUrl;

  try {
    const settings = await getSettings();
    if (settings?.siteUrl) {
      siteUrl = settings.siteUrl.replace(/\/$/, "");
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
