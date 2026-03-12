import { defineQuery } from "groq";
import { BUILDER } from "./blocks";

export const HOME_PAGE = defineQuery(`*[_type == "home" && _id == "home"][0] {
  title,
  seo,
  ${BUILDER}
}`);

export const ALL_PAGES = defineQuery(`*[_type == "page"] {
  title,
  "slug": select(
    defined(parent) => parent->slug.current + "/" + slug.current,
    slug.current
  )
}`);

export const PAGE_BY_SLUG = defineQuery(`
  *[_type == "page" && (
    (!defined(parent) && slug.current == $slug) ||
    (defined(parent) && parent->slug.current + "/" + slug.current == $slug)
  )][0] {
    title,
    "slug": select(
      defined(parent) => parent->slug.current + "/" + slug.current,
      slug.current
    ),
    seo,
    ${BUILDER}
  }
`);
