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
