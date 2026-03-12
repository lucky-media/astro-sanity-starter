import { defineType } from "sanity";

export const imageComponent = defineType({
  name: "imageComponent",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessibility.",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.warning("Alt text improves SEO and accessibility"),
    },
  ],
});
