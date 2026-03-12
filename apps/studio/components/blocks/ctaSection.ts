import { defineField, defineType } from "sanity";

export const ctaSectionBlock = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "headingComponent",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageComponent",
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "linkComponent",
    }),
  ],
  preview: {
    select: { title: "heading.title" },
    prepare({ title }) {
      return { title: "CTA Section", subtitle: title || "No title" };
    },
  },
});
