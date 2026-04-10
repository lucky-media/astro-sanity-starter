import type { StructureResolver } from "sanity/structure";
import { MenuIcon, LinkIcon, CogIcon, HomeIcon, SearchIcon } from "@sanity/icons";

const hiddenDocuments = ["siteSettings", "seoDefaults", "redirects", "navigation", "home", "page"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .icon(HomeIcon)
        .child(S.document().title("Home").schemaType("home").documentId("home")),
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenDocuments.includes(listItem.getId() || ""),
      ),
      S.divider(),
      S.listItem()
        .title("Globals")
        .child(
          S.list()
            .title("Globals")
            .items([
              S.listItem()
                .title("SEO Defaults")
                .icon(SearchIcon)
                .child(S.document().schemaType("seoDefaults").documentId("seoDefaults")),
              S.listItem()
                .title("Navigation")
                .icon(MenuIcon)
                .child(S.document().schemaType("navigation").documentId("navigation")),
              S.listItem()
                .title("Site Redirects")
                .icon(LinkIcon)
                .child(S.document().schemaType("redirects").documentId("redirects")),
              S.listItem()
                .title("Settings")
                .icon(CogIcon)
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            ]),
        ),
    ]);
