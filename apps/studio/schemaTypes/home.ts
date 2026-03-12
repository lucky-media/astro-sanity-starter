import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { pageBuilder } from "../components/pageBuilder";

export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
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
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Home", subtitle: "/" };
    },
  },
});
