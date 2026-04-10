export const CTA_LINK: string = `
text,
linkType,
openInNewTab,
"href": select(
  linkType == "internal" => internalLink->slug.current,
  linkType == "external" => externalUrl,
  linkType == "custom" => customLink,
  "#"
)
`;

export const IMAGE_ASSET: string = `
asset->{
  url,
  metadata {
    dimensions {
      width,
      height
    }
  }
}`;

const SANITY_IMAGE_PARAMS = "?w=1200&h=630&fit=crop&auto=format";

const META_DESCRIPTION: string = `select(
  metaDescriptionSource == "custom" => customMetaDescription,
  metaDescriptionSource == "none" => "",
  null
)`;

export const SEO_FRAGMENT: string = `
seo {
  "title": select(
    metaTitleSource == "custom" => customMetaTitle,
    metaTitleSource == "title" => ^.title,
    null
  ),
  "description": ${META_DESCRIPTION},
  "keywords": coalesce(keywords, null),
  "alternates": select(
    defined(canonicalUrl) => { "canonical": canonicalUrl },
    null
  ),
  "openGraph": {
    "type": coalesce(ogType, null),
    "title": select(
      ogTitleSource == "custom" => customOgTitle,
      ogTitleSource == "title" => ^.title,
      null
    ),
    "description": select(
      ogDescriptionSource == "meta" => ${META_DESCRIPTION},
      ogDescriptionSource == "custom" => customOgDescription,
      null
    ),
    "images": select(
      defined(ogImage.asset) => [{
        "url": ogImage.asset->url + "${SANITY_IMAGE_PARAMS}",
        "width": 1200,
        "height": 630
      }],
      null
    )
  },
  "twitter": {
    "title": select(
      twitterTitleSource == "custom" => customTwitterTitle,
      twitterTitleSource == "title" => ^.title,
      null
    ),
    "description": select(
      twitterDescriptionSource == "meta" => ${META_DESCRIPTION},
      twitterDescriptionSource == "custom" => customTwitterDescription,
      null
    ),
    "images": select(
      defined(twitterImage.asset) => [{
        "url": twitterImage.asset->url + "${SANITY_IMAGE_PARAMS}"
      }],
      null
    )
  },
  "robots": select(
    noIndex == true || noFollow == true => {
      "index": !(coalesce(noIndex, false)),
      "follow": !(coalesce(noFollow, false))
    },
    null
  )
}`;
