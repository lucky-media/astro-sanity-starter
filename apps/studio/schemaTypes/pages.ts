import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { pageBuilder } from "../components/pageBuilder";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
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
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [{ type: "page" }],
      group: "content",
      options: {
        disableNew: true,
        filter: "!defined(parent)",
      },
    }),
    { ...pageBuilder, group: "content" },
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Leave fields empty to use default values.",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      parentSlug: "parent.slug.current",
    },
    prepare: ({ title, slug, parentSlug }) => ({
      title,
      subtitle: slug ? (parentSlug ? `/${parentSlug}/${slug}` : `/${slug}`) : "No slug",
    }),
  },
});
