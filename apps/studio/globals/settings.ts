import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fieldsets: [
    { name: "general", title: "General", options: { collapsible: true, collapsed: false } },
    { name: "seoDefaults", title: "SEO Defaults", description: "Default SEO settings applied across the entire site", options: { collapsible: true, collapsed: false } },
    { name: "social", title: "Social Media", options: { collapsible: true, collapsed: true } },
    { name: "footer", title: "Footer", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string", fieldset: "general", validation: (Rule) => Rule.required().error("Site name is required") }),
    defineField({
      name: "siteUrl", title: "Site URL", type: "url", fieldset: "general",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }).error("Site URL is required"),
    }),
    defineField({ name: "titleTemplate", title: "Title Template", type: "string", description: "Use %s as placeholder (e.g., '%s | My Site')", fieldset: "seoDefaults",
      validation: (Rule) => Rule.custom((value) => { if (value && !value.includes("%s")) return "Title template must include %s placeholder"; return true; }),
    }),
    defineField({ name: "defaultDescription", title: "Default Meta Description", type: "text", rows: 3, fieldset: "seoDefaults", validation: (Rule) => Rule.max(200).warning("Meta descriptions should be under 200 characters") }),
    defineField({ name: "defaultOgImage", title: "Default Social Image", type: "image", description: "1200x630px recommended", fieldset: "seoDefaults", options: { hotspot: true } }),
    defineField({ name: "locale", title: "Default Locale", type: "string", fieldset: "seoDefaults", initialValue: "en_US" }),
    defineField({ name: "twitterHandle", title: "Twitter/X Handle", type: "string", description: "Include @ (e.g., '@mysite')", fieldset: "seoDefaults",
      validation: (Rule) => Rule.custom((value) => { if (value && !value.startsWith("@")) return "Twitter handle should start with @"; return true; }),
    }),
    defineField({
      name: "robotsDefault", title: "Default Robots Settings", type: "object", fieldset: "seoDefaults",
      fields: [
        defineField({ name: "noIndex", title: "No Index (Default)", type: "boolean", initialValue: false }),
        defineField({ name: "noFollow", title: "No Follow (Default)", type: "boolean", initialValue: false }),
      ],
    }),
    defineField({
      name: "socialMedia", title: "Social Media Links", type: "array", fieldset: "social",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "platform", title: "Platform", type: "string", options: { list: [{ title: "Instagram", value: "instagram" }, { title: "X (Twitter)", value: "x" }, { title: "LinkedIn", value: "linkedin" }] }, validation: (Rule) => Rule.required() }),
          defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["https"] }) }),
        ],
        preview: { select: { platform: "platform" }, prepare({ platform }) { return { title: platform }; } },
      }],
    }),
    defineField({ name: "footerCopyright", title: "Footer Copyright Text", type: "string", fieldset: "footer", validation: (Rule) => Rule.required() }),
    defineField({ name: "footerCTA", title: "Footer CTA", type: "linkComponent", fieldset: "footer" }),
    defineField({
      name: "footerLinks", title: "Footer Links", type: "array", fieldset: "footer",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Link Title", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "cta", title: "URL", type: "linkComponent" }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare({ title }) { return { title: title || "Site Settings", subtitle: "Global website configuration" }; },
  },
});
