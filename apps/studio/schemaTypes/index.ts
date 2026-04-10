import { homeType } from "./home";
import { pageType } from "./pages";
import { postType } from "./posts";

import { headingComponent } from "../components/heading";
import { imageComponent } from "../components/image";
import { linkComponent } from "../components/link";
import { seoType } from "../components/seo";

import { heroSectionBlock } from "../components/blocks/heroSection";
import { ctaSectionBlock } from "../components/blocks/ctaSection";

import { navigation } from "../globals/navigation";
import { redirects } from "../globals/redirects";
import { seoDefaults } from "../globals/seoDefaults";
import { siteSettings } from "../globals/settings";

export const schemaTypes = [
  // Documents
  homeType,
  pageType,
  postType,

  // Blocks
  heroSectionBlock,
  ctaSectionBlock,

  // Components
  headingComponent,
  imageComponent,
  linkComponent,
  seoType,

  // Globals
  redirects,
  navigation,
  seoDefaults,
  siteSettings,
];
