import { defineQuery } from "groq";
import { IMAGE_ASSET } from "./components";

export const ALL_POSTS = defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  featuredImage {
    ${IMAGE_ASSET},
    alt
  }
}`);

export const POST_BY_SLUG = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  seo,
  featuredImage {
    ${IMAGE_ASSET},
    alt
  },
  body
}`);
