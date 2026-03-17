export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  locale: string;
  twitterHandle?: string;
  noIndex: boolean;
  noFollow: boolean;
}

export const defaultSeoConfig: SeoConfig = {
  siteName: "My Site",
  siteUrl: "https://your-site.com",
  titleTemplate: "%s | My Site",
  defaultTitle: "My Site",
  defaultDescription: "A description of your site.",
  defaultImage: "/og-image.jpg",
  locale: "en_US",
  twitterHandle: undefined,
  noIndex: false,
  noFollow: false,
};

let seoConfig: SeoConfig = { ...defaultSeoConfig };

export function initSeoConfig(
  settings: {
    siteName?: string | null;
    siteUrl?: string | null;
    titleTemplate?: string | null;
    defaultDescription?: string | null;
    defaultOgImage?: string | null;
    locale?: string | null;
    twitterHandle?: string | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
  } | null,
): void {
  if (!settings) return;
  seoConfig = {
    siteName: settings.siteName || defaultSeoConfig.siteName,
    siteUrl: settings.siteUrl?.replace(/\/$/, "") || defaultSeoConfig.siteUrl,
    titleTemplate:
      settings.titleTemplate ||
      `%s | ${settings.siteName || defaultSeoConfig.siteName}`,
    defaultTitle: settings.siteName || defaultSeoConfig.defaultTitle,
    defaultDescription:
      settings.defaultDescription || defaultSeoConfig.defaultDescription,
    defaultImage: settings.defaultOgImage || defaultSeoConfig.defaultImage,
    locale: settings.locale || defaultSeoConfig.locale,
    twitterHandle: settings.twitterHandle || defaultSeoConfig.twitterHandle,
    noIndex: settings.noIndex ?? defaultSeoConfig.noIndex,
    noFollow: settings.noFollow ?? defaultSeoConfig.noFollow,
  };
}

export { seoConfig };
