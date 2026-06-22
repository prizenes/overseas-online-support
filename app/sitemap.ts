import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS, BLOG_PATH } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { ja: `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { ja: `${SITE_URL}/`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/google-meet`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}${BLOG_PATH}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const jaBlogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const enBlogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}${BLOG_PATH}/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...jaBlogPages,
    ...enBlogPages,
  ];
}
