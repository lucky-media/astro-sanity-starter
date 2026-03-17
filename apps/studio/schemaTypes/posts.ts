import { defineArrayMember, defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Posts",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "imageComponent",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({ type: "imageComponent" }),
      ],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Leave fields empty to use default values.",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage" },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
