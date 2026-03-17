import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fieldsets: [
    {
      name: "meta",
      title: "Basic SEO",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "openGraph",
      title: "Social Media (Open Graph)",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "twitter",
      title: "Twitter/X Card",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "advanced",
      title: "Advanced Settings",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "meta",
      validation: (Rule) =>
        Rule.max(100).warning("Meta titles should be under 100 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      fieldset: "meta",
      validation: (Rule) =>
        Rule.max(200).warning(
          "Meta descriptions should be under 200 characters",
        ),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      fieldset: "meta",
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      fieldset: "openGraph",
      validation: (Rule) =>
        Rule.max(100).warning("OG titles should be under 100 characters"),
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 3,
      fieldset: "openGraph",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      fieldset: "openGraph",
      options: { hotspot: true },
    }),
    defineField({
      name: "twitterTitle",
      title: "Twitter Title",
      type: "string",
      fieldset: "twitter",
    }),
    defineField({
      name: "twitterDescription",
      title: "Twitter Description",
      type: "text",
      rows: 3,
      fieldset: "twitter",
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      fieldset: "twitter",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      fieldset: "advanced",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      fieldset: "advanced",
      initialValue: false,
    }),
  ],
});
