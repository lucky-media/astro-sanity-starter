import { CTA_LINK, IMAGE_ASSET } from "./components";

export const HERO_SECTION = `
_type == "heroSection" => {
  heading {
    title,
    tag
  },
  body
}`;

export const CTA_SECTION = `
_type == "ctaSection" => {
  heading {
    title,
    tag
  },
  image {
    ${IMAGE_ASSET},
    alt
  },
  cta {
    ${CTA_LINK}
  }
}`;

export const BUILDER = `
builder[] {
  _type,
  ${HERO_SECTION},
  ${CTA_SECTION}
}`;
