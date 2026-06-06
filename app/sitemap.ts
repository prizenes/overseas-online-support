import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ja: siteUrl,
          en: `${siteUrl}/en`,
          "x-default": siteUrl
        }
      }
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ja: siteUrl,
          en: `${siteUrl}/en`,
          "x-default": siteUrl
        }
      }
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
