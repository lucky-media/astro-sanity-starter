import { defineField, defineType } from "sanity";

export const headingComponent = defineType({
  name: "headingComponent",
  title: "Heading",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "HTML Tag",
      type: "string",
      description: "The HTML tag to use for the heading",
      initialValue: "h2",
      options: {
        list: [
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
          { title: "H5", value: "h5" },
          { title: "H6", value: "h6" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", tag: "tag" },
    prepare({ title, tag }) {
      return { title: title || "Untitled", subtitle: tag };
    },
  },
});
