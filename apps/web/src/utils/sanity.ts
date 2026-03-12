import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const useDrafts = import.meta.env.PUBLIC_SANITY_USE_DRAFTS === "true";
const visualEditing = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING === "true";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: !useDrafts,
  token: useDrafts ? import.meta.env.SANITY_API_TOKEN : undefined,
  perspective: useDrafts ? "drafts" : "published",
  stega: {
    enabled: visualEditing,
    studioUrl: import.meta.env.PUBLIC_SANITY_STUDIO_URL || "/studio",
  },
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
