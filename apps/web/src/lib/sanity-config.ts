import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_USE_DRAFTS,
  PUBLIC_SANITY_VISUAL_EDITING,
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

export const sanityConfig = {
  projectId: PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: PUBLIC_SANITY_DATASET || "production",
  useDrafts: PUBLIC_SANITY_USE_DRAFTS === "true",
  visualEditing: PUBLIC_SANITY_VISUAL_EDITING === "true",
  studioUrl: PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
};
