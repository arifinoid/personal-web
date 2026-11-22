export const dynamic = "force-static";

import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

// Trailing slashes keep sitemap entries identical to the emitted page URLs.
const routes = ["", "/explore/", "/projects/", "/blog/", "/about/"];
const postRoutes = blogPosts
  .filter((post) => post.href.startsWith("/blog/"))
  .map((post) => `${post.href}/`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...routes, ...postRoutes].map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
