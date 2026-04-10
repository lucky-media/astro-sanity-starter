import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const seoDefaults = defineType({
  name: "seoDefaults",
  title: "SEO Defaults",
  type: "document",
  icon: CogIcon,
  description: "These values are used as fallback when a page does not specify its own SEO fields.",
  fieldsets: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "openGraph",
      title: "Open Graph",
    },
    {
      name: "twitter",
      title: "Twitter/X",
    },
    {
      name: "advanced",
      title: "Advanced",
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
      name: "titleTemplate",
      title: "Title Template",
      type: "string",
      description: "Use %s as placeholder (e.g., '%s | My Site')",
      fieldset: "general",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value && !value.includes("%s"))
            return "Title template must include %s placeholder";
          return true;
        }),
    }),
    defineField({
      name: "defaultDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      fieldset: "general",
      validation: (Rule) =>
        Rule.max(200).warning(
          "Meta descriptions should be under 200 characters",
        ),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "general",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogType",
      title: "Open Graph Type",
      type: "string",
      fieldset: "openGraph",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Article", value: "article" },
        ],
        layout: "radio",
      },
      initialValue: "website",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Social Image",
      type: "image",
      description: "1200x630px recommended",
      fieldset: "openGraph",
      options: { hotspot: true },
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      fieldset: "openGraph",
      initialValue: "en_US",
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter/X Handle",
      type: "string",
      description: "Include @ (e.g., '@mysite')",
      fieldset: "twitter",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value && !value.startsWith("@"))
            return "Twitter handle should start with @";
          return true;
        }),
    }),
    defineField({
      name: "robotsDefault",
      title: "Robots Settings",
      type: "object",
      fieldset: "advanced",
      fields: [
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "noFollow",
          title: "No Follow",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare({ title }) {
      return {
        title: title || "SEO Defaults",
        subtitle: "Site-wide SEO configuration",
      };
    },
  },
});
