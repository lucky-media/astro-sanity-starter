import { defineArrayMember, defineField } from "sanity";

export const pageBuilder = defineField({
  name: "builder",
  title: "Page Builder",
  type: "array",
  of: [
    defineArrayMember({ type: "heroSection" }),
    defineArrayMember({ type: "ctaSection" }),
  ],
});
