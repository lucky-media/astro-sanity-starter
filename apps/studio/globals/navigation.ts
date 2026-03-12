import { defineField, defineType } from "sanity";
import { MenuIcon } from "@sanity/icons";
import type { FieldDefinition } from "sanity";

const createNavItemFields = (depth: number = 0): FieldDefinition[] => [
  defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
  defineField({ name: "subtitle", title: "Subtitle", type: "string", hidden: () => depth === 0 }),
  defineField({
    name: "linkType", title: "Link Type", type: "string",
    options: { list: [{ title: "Internal Page", value: "internal" }, { title: "External URL", value: "external" }], layout: "radio" },
    initialValue: "internal",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "internalLink", title: "Internal Page", type: "reference",
    to: [{ type: "page" }],
    hidden: ({ parent }) => parent?.linkType !== "internal",
    validation: (Rule) => Rule.custom((value, context) => {
      const parent = context.parent as { linkType?: string };
      if (parent?.linkType === "internal" && !value) return "Please select an internal page";
      return true;
    }),
  }),
  defineField({
    name: "externalUrl", title: "External URL", type: "url",
    hidden: ({ parent }) => parent?.linkType !== "external",
    validation: (Rule) => Rule.custom((value, context) => {
      const parent = context.parent as { linkType?: string };
      if (parent?.linkType === "external") {
        if (!value) return "Please enter an external URL";
        if (!value.startsWith("https://")) return "URL must start with https://";
      }
      return true;
    }),
  }),
  defineField({ name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false, hidden: ({ parent }) => parent?.linkType !== "external" }),
  ...(depth === 0 ? [
    defineField({
      name: "children", title: "Child Items", type: "array",
      of: [{
        type: "object", name: "childNavItem", title: "Child Navigation Item",
        fields: createNavItemFields(1),
        preview: {
          select: { title: "label", linkType: "linkType", internalLink: "internalLink.title", externalUrl: "externalUrl" },
          prepare({ title, linkType, internalLink, externalUrl }) {
            const subtitle = linkType === "internal" ? (internalLink ? `Internal: ${internalLink}` : "Internal (no page)") : externalUrl || "External (no URL)";
            return { title: title || "Untitled", subtitle };
          },
        },
      }],
    }),
  ] : []),
];

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", initialValue: "Main Navigation", validation: (Rule) => Rule.required() }),
    defineField({ name: "cta", title: "Call to Action", type: "linkComponent" }),
    defineField({
      name: "navItems", title: "Navigation Items", type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [{
        type: "object", name: "navItem", title: "Navigation Item",
        fields: createNavItemFields(0),
        preview: {
          select: { title: "label", linkType: "linkType", internalLink: "internalLink.title", externalUrl: "externalUrl", hasChildren: "children" },
          prepare({ title, linkType, internalLink, externalUrl, hasChildren }) {
            const subtitle = linkType === "internal" ? (internalLink ? `Internal: ${internalLink}` : "Internal (no page)") : externalUrl || "External (no URL)";
            const childCount = hasChildren?.length || 0;
            return { title: title || "Untitled", subtitle: childCount > 0 ? `${subtitle} • ${childCount} child${childCount !== 1 ? "ren" : ""}` : subtitle };
          },
        },
      }],
    }),
  ],
  preview: {
    select: { title: "title", itemCount: "navItems.length" },
    prepare({ title, itemCount }) { return { title: title || "Navigation", subtitle: `${itemCount || 0} item${itemCount !== 1 ? "s" : ""}` }; },
  },
});
