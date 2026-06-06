import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "海外在住日本人向け身体相談・運動サポート記事",
  description: "海外在住日本人向けに、腰痛、膝痛、歩行不安、家族の体力低下に関する日本語の運動サポート記事を掲載しています。",
  alternates: {
    canonical: `${siteUrl}/blog`
  },
  openGraph: {
    title: "海外在住日本人向け身体相談・運動サポート記事",
    description: "海外在住日本人向けに、身体の不安を整理し、運動を安全に続けるための記事を掲載しています。",
    url: `${siteUrl}/blog`,
    type: "website"
  }
};

export default function BlogIndexPage() {
  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold text-sea">Blog</p>
        <h1 className="mt-3 text-4xl font-black text-ink">海外在住日本人向け 運動サポート記事</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          海外で腰が痛い、膝が痛い、親の歩行や体力低下が心配など、日本語で身体の不安を整理したい方向けの記事です。
        </p>
        <div className="mt-10 grid gap-5">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-md bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold leading-8 text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-sea">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-ink/70">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex font-bold text-sea underline underline-offset-4">
                記事を読む
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
