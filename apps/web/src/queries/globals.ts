import { defineQuery } from "groq";
import { CTA_LINK } from "./components";

export const NAVIGATION = defineQuery(`*[_type == "navigation"][0] {
  cta {
    ${CTA_LINK}
  },
  navItems[] {
    label,
    "href": select(
      linkType == "internal" => internalLink->slug.current,
      linkType == "external" => externalUrl,
      "#"
    ),
    linkType,
    openInNewTab,
    children[] {
      label,
      "href": select(
        linkType == "internal" => internalLink->slug.current,
        linkType == "external" => externalUrl,
        "#"
      ),
      linkType,
      openInNewTab
    }
  }
}`);

export const REDIRECTS = defineQuery(`
  *[_type == "redirects"][0] {
    redirects[] {
      source,
      destination,
      isPermanent
    }
  }
`);

export const SITE_SETTINGS = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    siteUrl,
    footerCopyright,
    socialMedia,
    footerLinks[] {
      title,
      cta { ${CTA_LINK} }
    },
    footerCTA {
      ${CTA_LINK}
    }
  }
`);
