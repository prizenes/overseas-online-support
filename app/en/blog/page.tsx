import type { Metadata } from "next";
import Link from "next/link";
import { enBlogPosts } from "@/lib/en-blog-posts";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "English Blog｜Online Exercise Support in Japanese for People Living Abroad",
  description:
    "English SEO articles for Japanese speakers living abroad who are looking for online exercise support in Japanese.",
  alternates: {
    canonical: `${siteUrl}/en/blog`
  },
  openGraph: {
    title: "English Blog｜Online Exercise Support in Japanese",
    description:
      "Articles for Japanese speakers abroad searching in English for exercise support in Japanese.",
    url: `${siteUrl}/en/blog`,
    type: "website"
  }
};

export default function EnBlogIndexPage() {
  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/en" className="text-sm font-bold text-sea underline underline-offset-4">
          Back to English page
        </Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-sea">English Blog</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">
          Exercise Support in Japanese for People Living Abroad
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          These articles are written for Japanese speakers living abroad who search in English but want to consult in Japanese.
        </p>
        <div className="mt-10 grid gap-5">
          {enBlogPosts.map((post) => (
            <article key={post.slug} className="rounded-md bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold leading-8 text-ink">
                <Link href={`/en/blog/${post.slug}`} className="hover:text-sea">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-ink/70">{post.description}</p>
              <Link href={`/en/blog/${post.slug}`} className="mt-5 inline-flex font-bold text-sea underline underline-offset-4">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
