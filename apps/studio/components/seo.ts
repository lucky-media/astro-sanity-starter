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
      name: "metaTitleSource",
      title: "Title",
      type: "string",
      fieldset: "meta",
      options: {
        list: [
          { title: "Page Title", value: "title" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customMetaTitle",
      title: "Custom Meta Title",
      type: "string",
      fieldset: "meta",
      validation: (Rule) =>
        Rule.max(100).warning("Meta titles should be under 100 characters"),
      hidden: ({ parent }) => parent?.metaTitleSource !== "custom",
    }),
    defineField({
      name: "metaDescriptionSource",
      title: "Meta Description",
      type: "string",
      fieldset: "meta",
      options: {
        list: [
          { title: "Global", value: "global" },
          { title: "Custom", value: "custom" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "global",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customMetaDescription",
      title: "Custom Meta Description",
      type: "text",
      rows: 3,
      fieldset: "meta",
      validation: (Rule) =>
        Rule.max(200).warning(
          "Meta descriptions should be under 200 characters",
        ),
      hidden: ({ parent }) => parent?.metaDescriptionSource !== "custom",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      fieldset: "meta",
      description: "By default it will be set to the page URL",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "meta",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogTitleSource",
      title: "Open Graph Title",
      type: "string",
      fieldset: "openGraph",
      options: {
        list: [
          { title: "Page Title", value: "title" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "title",
    }),
    defineField({
      name: "customOgTitle",
      title: "Custom Open Graph Title",
      type: "string",
      fieldset: "openGraph",
      validation: (Rule) =>
        Rule.max(100).warning("OG titles should be under 100 characters"),
      hidden: ({ parent }) => parent?.ogTitleSource !== "custom",
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
      name: "ogDescriptionSource",
      title: "Open Graph Description",
      type: "string",
      fieldset: "openGraph",
      options: {
        list: [
          { title: "Meta Description", value: "meta" },
          { title: "Global", value: "global" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "global",
    }),
    defineField({
      name: "customOgDescription",
      title: "Custom Open Graph Description",
      type: "text",
      rows: 3,
      fieldset: "openGraph",
      hidden: ({ parent }) => parent?.ogDescriptionSource !== "custom",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      fieldset: "openGraph",
      description:
        "If not set, the global default image will be used. 1200x630px recommended.",
      options: { hotspot: true },
    }),
    defineField({
      name: "twitterTitleSource",
      title: "Twitter Title",
      type: "string",
      fieldset: "twitter",
      options: {
        list: [
          { title: "Page Title", value: "title" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "title",
    }),
    defineField({
      name: "customTwitterTitle",
      title: "Custom Twitter Title",
      type: "string",
      fieldset: "twitter",
      hidden: ({ parent }) => parent?.twitterTitleSource !== "custom",
    }),
    defineField({
      name: "twitterDescriptionSource",
      title: "Twitter Description",
      type: "string",
      fieldset: "twitter",
      options: {
        list: [
          { title: "Meta Description", value: "meta" },
          { title: "Global", value: "global" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "global",
    }),
    defineField({
      name: "customTwitterDescription",
      title: "Custom Twitter Description",
      type: "text",
      rows: 3,
      fieldset: "twitter",
      hidden: ({ parent }) => parent?.twitterDescriptionSource !== "custom",
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      fieldset: "twitter",
      description:
        "If not set, the global default image will be used.",
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
