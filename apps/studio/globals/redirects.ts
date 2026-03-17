import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

type RedirectTypes = {
  _key: string;
  source: string;
  destination: string;
  isPermanent: boolean;
};

export const redirects = defineType({
  name: "redirects",
  type: "document",
  title: "Redirects",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "redirects",
      type: "array",
      description:
        "Redirects for SEO purposes. Good practices: prefer 301 for permanent moves.",
      of: [
        defineField({
          name: "redirect",
          type: "object",
          fields: [
            defineField({
              name: "source",
              type: "string",
              description: "Internal path to redirect from (e.g. /old-page)",
              validation: (Rule) => [
                Rule.required(),
                Rule.custom((value, context) => {
                  if (!value) return "Source is required";
                  if (!value.startsWith("/")) return "Source must start with /";
                  const redirects = (context.document?.redirects ||
                    []) as RedirectTypes[];
                  const currentRedirect = context.parent as RedirectTypes;
                  const isDuplicate = redirects.some(
                    (r) =>
                      r._key !== currentRedirect._key && r.source === value,
                  );
                  if (isDuplicate)
                    return "This source path is already used in another redirect.";
                  return true;
                }),
              ],
            }),
            defineField({
              name: "destination",
              type: "string",
              description:
                "Internal path (/new-page) or external URL (https://example.com)",
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value) return "Destination is required";
                  const isInternal = value.startsWith("/");
                  const isExternal =
                    value.startsWith("http://") || value.startsWith("https://");
                  if (!isInternal && !isExternal)
                    return "Must be an internal path or full URL";
                  return true;
                }),
            }),
            defineField({
              name: "isPermanent",
              title: "Permanent Redirect (301)",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              source: "source",
              destination: "destination",
              isPermanent: "isPermanent",
            },
            prepare({ source, destination, isPermanent }) {
              return {
                title: `Source: ${source}`,
                subtitle: `Destination: ${destination}`,
                media: isPermanent ? () => "🔒" : () => "🔄",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Redirects" }) },
});
