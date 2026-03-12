import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const pageChild = {
        id: "page-child",
        title: "Page: Child",
        schemaType: "page",
        parameters: [{ name: "parentId", title: "Parent ID", type: "string" }],
        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: "reference", _ref: parentId },
        }),
      };
      return [...prev, pageChild];
    },
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        const hiddenTemplates = ["siteSettings", "redirects", "navigation", "home", "page-child"];
        return prev.filter((t) => !hiddenTemplates.includes(t.templateId || ""));
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "home") {
        return prev.filter(({ action }) => action !== "delete");
      }
      return prev;
    },
  },
});
