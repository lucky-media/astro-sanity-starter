import { client } from "@/utils/sanity";
import { SITE_SETTINGS, NAVIGATION } from "@/queries/globals";
import { HOME_PAGE, ALL_PAGES, PAGE_BY_SLUG } from "@/queries/pages";
import { ALL_POSTS, POST_BY_SLUG } from "@/queries/posts";
import type {
  SITE_SETTINGS_RESULT,
  NAVIGATION_RESULT,
  HOME_PAGE_RESULT,
  ALL_PAGES_RESULT,
  PAGE_BY_SLUG_RESULT,
  ALL_POSTS_RESULT,
  POST_BY_SLUG_RESULT,
} from "@starter/sanity-types";

export async function getSettings(): Promise<SITE_SETTINGS_RESULT> {
  return await client.fetch(SITE_SETTINGS);
}

export async function getNavigation(): Promise<NAVIGATION_RESULT> {
  return await client.fetch(NAVIGATION);
}

export async function getHomePage(): Promise<HOME_PAGE_RESULT> {
  return await client.fetch(HOME_PAGE);
}

export async function getPages(): Promise<ALL_PAGES_RESULT> {
  return await client.fetch(ALL_PAGES);
}

export async function getPageBySlug(
  slug: string,
): Promise<PAGE_BY_SLUG_RESULT> {
  return await client.fetch(PAGE_BY_SLUG, { slug });
}

export async function getPosts(): Promise<ALL_POSTS_RESULT> {
  return await client.fetch(ALL_POSTS);
}

export async function getPostBySlug(
  slug: string,
): Promise<POST_BY_SLUG_RESULT> {
  return await client.fetch(POST_BY_SLUG, { slug });
}
