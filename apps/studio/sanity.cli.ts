import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "YOUR_PROJECT_ID",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  autoUpdates: false,
  typegen: {
    path: "../web/src/**/*.{ts,tsx,js,jsx}",
    schema: "../../packages/sanity-types/schema.json",
    generates: "../../packages/sanity-types/sanity.types.ts",
    overloadClientMethods: true,
  },
});
