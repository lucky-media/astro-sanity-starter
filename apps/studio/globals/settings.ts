import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fieldsets: [
    {
      name: "general",
      title: "General",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "social",
      title: "Social Media",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "footer",
      title: "Footer",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      fieldset: "general",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      fieldset: "general",
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ["https"] })
          .error("Site URL is required"),
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "array",
      fieldset: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
            }),
          ],
          preview: {
            select: { platform: "platform" },
            prepare({ platform }) {
              return { title: platform };
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright Text",
      type: "string",
      fieldset: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerCTA",
      title: "Footer CTA",
      type: "linkComponent",
      fieldset: "footer",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      fieldset: "footer",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Link Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "cta", title: "URL", type: "linkComponent" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
        subtitle: "Global website configuration",
      };
    },
  },
});
