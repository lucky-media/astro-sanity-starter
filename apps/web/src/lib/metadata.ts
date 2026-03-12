import type { Seo } from "@starter/sanity-types";
import { seoConfig } from "@/seo.config";
import { urlFor } from "@/utils/sanity";

/**
 * Metadata types inspired by Next.js App Router Metadata API
 */

export interface Robots {
  index?: boolean;
  follow?: boolean;
}

export interface OpenGraphImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface OpenGraph {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  images?: OpenGraphImage[];
  locale?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export interface Twitter {
  card?: "summary" | "summary_large_image";
  site?: string;
  title?: string;
  description?: string;
  images?: string[];
}

export interface Alternates {
  canonical?: string;
}

/**
 * Complete Metadata object returned by generateMetadata
 */
export interface Metadata {
  title: string;
  description: string;
  image: string;
  url?: string;
  robots: Robots;
  alternates?: Alternates;
  openGraph: OpenGraph;
  twitter: Twitter;
}

/**
 * Input options for generateMetadata
 */
export interface MetadataInput {
  /** Page title - will be formatted with template */
  title?: string | null;
  /** Page description */
  description?: string | null;
  /** OG/Twitter image URL */
  image?: string | null;
  /** Page URL for canonical and OG */
  url?: string;
  /** Canonical URL override */
  canonical?: string;
  /** Prevent indexing */
  noIndex?: boolean | null;
  /** Prevent following links */
  noFollow?: boolean | null;
  /** Open Graph title override */
  ogTitle?: string | null;
  /** Open Graph description override */
  ogDescription?: string | null;
  /** Twitter title override */
  twitterTitle?: string | null;
  /** Twitter description override */
  twitterDescription?: string | null;
  /** Content type */
  type?: "website" | "article";
  /** Article published time (ISO string) */
  publishedTime?: string;
  /** Article modified time (ISO string) */
  modifiedTime?: string;
  /** Article authors */
  authors?: string[];
  /** Article tags */
  tags?: string[];
  /** Sanity SEO object - values override defaults but are overridden by direct props */
  seo?: Seo | null;
}

/**
 * Format title using the template from seo.config.ts
 */
function formatTitle(title?: string | null): string {
  if (!title) return seoConfig.defaultTitle;
  return seoConfig.titleTemplate.replace("%s", title);
}

/**
 * Ensure URL is absolute (works for images and page URLs)
 */
function toAbsoluteUrl(path?: string | null, fallback?: string): string {
  const url = path || fallback || "";
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${seoConfig.siteUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Extract image URL from Sanity image reference
 */
function getSanityImageUrl(image?: Seo["ogImage"]): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).width(1200).height(630).url();
}

/**
 * Generate complete metadata by merging global config with page-level overrides.
 *
 * Priority (highest to lowest):
 * 1. Direct props (title, description, etc.)
 * 2. Sanity SEO object (seo prop)
 * 3. Global defaults from seo.config.ts
 *
 * @example
 * // Basic usage with just a title
 * const metadata = generateMetadata({ title: "About Us" });
 *
 * @example
 * // With Sanity SEO data
 * const metadata = generateMetadata({ seo: page.seo, url: "/about" });
 *
 * @example
 * // For blog posts
 * const metadata = generateMetadata({
 *   seo: post.seo,
 *   title: post.title,
 *   type: "article",
 *   publishedTime: post.publishedAt,
 * });
 */
export function generateMetadata(input: MetadataInput = {}): Metadata {
  const { seo } = input;

  // Extract values from Sanity SEO (these are the "middle" priority)
  const sanityImage = getSanityImageUrl(seo?.ogImage);
  const sanityTwitterImage = getSanityImageUrl(seo?.twitterImage);

  // Check if we're on staging (draft mode)
  const isStaging = import.meta.env.PUBLIC_SANITY_USE_DRAFTS === "true";

  // Resolve values with priority: direct props > Sanity SEO > global config
  const title = input.title ?? seo?.metaTitle ?? null;
  const description = input.description ?? seo?.metaDescription ?? seoConfig.defaultDescription;
  const image = input.image ?? sanityImage ?? null;
  const url = input.url ? toAbsoluteUrl(input.url) : undefined;
  const canonical = toAbsoluteUrl(input.canonical ?? seo?.canonicalUrl) || url;
  // On staging, force noIndex and noFollow regardless of CMS settings
  const noIndex = isStaging ? true : (input.noIndex ?? seo?.noIndex ?? seoConfig.noIndex);
  const noFollow = isStaging ? true : (input.noFollow ?? seo?.noFollow ?? seoConfig.noFollow);
  const type = input.type ?? "website";

  // OG values with fallbacks
  const ogTitle = input.ogTitle ?? seo?.ogTitle ?? title;
  const ogDescription = input.ogDescription ?? seo?.ogDescription ?? description;

  // Twitter values with fallbacks
  const twitterTitle = input.twitterTitle ?? seo?.twitterTitle ?? ogTitle;
  const twitterDescription = input.twitterDescription ?? seo?.twitterDescription ?? ogDescription;
  const twitterImage = sanityTwitterImage ?? image;

  // Build final resolved values
  const resolvedTitle = formatTitle(title);
  const resolvedImage = toAbsoluteUrl(image, seoConfig.defaultImage);

  return {
    title: resolvedTitle,
    description,
    image: resolvedImage,
    url,

    robots: {
      index: !noIndex,
      follow: !noFollow,
    },

    alternates: canonical ? { canonical } : undefined,

    openGraph: {
      title: ogTitle ? formatTitle(ogTitle) : resolvedTitle,
      description: ogDescription || description,
      url,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type,
      images: [{ url: resolvedImage, width: 1200, height: 630 }],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input.authors && { authors: input.authors }),
      ...(input.tags && { tags: input.tags }),
    },

    twitter: {
      card: "summary_large_image",
      site: seoConfig.twitterHandle,
      title: twitterTitle ? formatTitle(twitterTitle) : resolvedTitle,
      description: twitterDescription || description,
      images: [toAbsoluteUrl(twitterImage, seoConfig.defaultImage)],
    },
  };
}
