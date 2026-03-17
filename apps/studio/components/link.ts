import { defineType } from "sanity";

export const linkComponent = defineType({
  name: "linkComponent",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Link Text",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            internalLink?: unknown;
            externalUrl?: string;
            customLink?: string;
          };
          const hasLink =
            parent?.internalLink || parent?.externalUrl || parent?.customLink;
          if (hasLink && !value) return "Link text is required";
          return true;
        }),
    },
    {
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    },
    {
      name: "internalLink",
      title: "Internal Page",
      type: "reference",
      to: [{ type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
    },
    {
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string; text?: string };
          if (parent?.text && parent?.linkType === "external") {
            if (!value) return "Please enter an external URL";
            if (typeof value === "string" && !value.startsWith("https://"))
              return "URL must start with https://";
          }
          return true;
        }),
    },
    {
      name: "customLink",
      title: "Custom Link",
      type: "string",
      description: "Anchor: #section-name, tel:, mailto:, or /custom-path",
      hidden: ({ parent }) => parent?.linkType !== "custom",
    },
    {
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "text",
      linkType: "linkType",
      internalLink: "internalLink.title",
      externalUrl: "externalUrl",
      customLink: "customLink",
    },
    prepare({ title, linkType, internalLink, externalUrl, customLink }) {
      let subtitle = "";
      if (linkType === "internal")
        subtitle = internalLink
          ? `Internal: ${internalLink}`
          : "Internal (no page selected)";
      else if (linkType === "external")
        subtitle = externalUrl || "External (no URL)";
      else if (linkType === "custom")
        subtitle = customLink ? `Custom: ${customLink}` : "Custom (no link)";
      return { title: title || "Untitled Link", subtitle };
    },
  },
});
