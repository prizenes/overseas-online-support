import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getBlogPost, getBlogUrl } from "@/lib/blog-posts";
import { brandAssets } from "@/lib/service-content";
import { organizationJsonLd, siteUrl } from "@/lib/site";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: getBlogUrl(post.slug)
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: getBlogUrl(post.slug),
      type: "article",
      images: [brandAssets.hero[0].src]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [brandAssets.hero[0].src]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: getBlogUrl(post.slug),
    image: brandAssets.hero[0].src,
    author: {
      "@type": "Organization",
      name: "リハビリジムプライズネス",
      url: "https://prizenes.com/"
    },
    publisher: organizationJsonLd,
    keywords: post.keywords.join(", ")
  };

  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <JsonLd data={blogJsonLd} />
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-bold text-sea underline underline-offset-4">
          ブログ一覧へ
        </Link>
        <h1 className="mt-5 text-4xl font-black leading-tight text-ink">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">{post.description}</p>
        <div className="mt-8 rounded-md border border-coral/30 bg-coral/5 p-5">
          <p className="text-lg font-bold leading-8 text-ink">
            強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、オンライン相談を待たずに現地医療機関へ相談してください。
          </p>
        </div>
        <div className="mt-10 grid gap-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold leading-8 text-ink">{section.heading}</h2>
              <div className="mt-4 grid gap-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-12 rounded-md bg-ink p-6 text-white">
          <h2 className="text-2xl font-bold">まずは初回オンライン身体相談 60分 $79</h2>
          <p className="mt-4 leading-8 text-white/80">
            身体の不安を整理し、運動を安全に続けるための相談を日本語で行います。家族同席も可能です。まずは無料問い合わせで相談可否を確認します。
          </p>
          <Link href="/#apply" className="mt-6 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-white hover:text-ink">
            初回相談について問い合わせる
          </Link>
        </div>
      </article>
    </main>
  );
}
