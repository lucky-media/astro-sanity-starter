import { createRequire } from "module";
import { sanityConfig } from "./sanity-config";

const require = createRequire(import.meta.url);

const SEO_DEFAULTS_QUERY = `
  *[_type == "seoDefaults"][0] {
    "metadataBase": siteUrl,
    "title": select(
      defined(titleTemplate) && defined(siteName) => {
        "default": siteName,
        "template": titleTemplate
      },
      defined(siteName) => siteName,
      null
    ),
    "description": defaultDescription,
    keywords,
    "openGraph": {
      "type": ogType,
      "siteName": siteName,
      "title": siteName,
      "description": defaultDescription,
      "locale": locale,
      "images": select(
        defined(defaultOgImage.asset) => [{
          "url": defaultOgImage.asset->url + "?w=1200&h=630&fit=crop&auto=format",
          "width": 1200,
          "height": 630
        }],
        null
      )
    },
    "twitter": select(
      defined(twitterHandle) => {
        "site": twitterHandle,
        "title": coalesce(siteName, null),
        "description": coalesce(defaultDescription, null)
      },
      null
    ),
    "robots": select(
      robotsDefault.noIndex == true || robotsDefault.noFollow == true => {
        "index": !(coalesce(robotsDefault.noIndex, false)),
        "follow": !(coalesce(robotsDefault.noFollow, false))
      },
      null
    )
  }
`;

export async function fetchSeoDefaults() {
  const { createClient } = require("@sanity/client");

  const client = createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: "2025-01-01",
    useCdn: true,
  });

  try {
    let data = await client.fetch(SEO_DEFAULTS_QUERY);
    if (!data) return {};

    if (data.metadataBase) {
      data.metadataBase = new URL(data.metadataBase);
    }

    return data;
  } catch {
    return {};
  }
}
