import { defineField, defineType } from "sanity";

export const heroSectionBlock = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "headingComponent",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "heading.title" },
    prepare({ title }) {
      return { title: "Hero Section", subtitle: title || "No title" };
    },
  },
});
