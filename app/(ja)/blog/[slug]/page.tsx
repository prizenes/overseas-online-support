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
    keywords: post.keywords,
    alternates: {
      canonical: getBlogUrl(post.slug)
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: getBlogUrl(post.slug),
      type: "article",
      publishedTime: post.date,
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

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = (post.related ?? [])
    .map((relatedSlug) => getBlogPost(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ja",
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "ブログ", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: getBlogUrl(post.slug) }
    ]
  };

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      }
    : null;

  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-bold text-sea underline underline-offset-4">
          ブログ一覧へ
        </Link>
        <h1 className="mt-5 text-4xl font-black leading-tight text-ink">{post.title}</h1>
        <p className="mt-3 text-sm text-ink/60">
          公開日：<time dateTime={post.date}>{formatDate(post.date)}</time>　監修・運営：リハビリジム プライズネス（理学療法士）
        </p>
        <p className="mt-5 text-lg leading-8 text-ink/75">{post.description}</p>

        {post.summary ? (
          <div className="mt-8 rounded-md border border-sea/30 bg-sea/5 p-5">
            <p className="text-sm font-bold text-sea">この記事の要点</p>
            <p className="mt-2 text-lg leading-8 text-ink">{post.summary}</p>
          </div>
        ) : null}

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

        {post.faq?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold leading-8 text-ink">よくあるご質問</h2>
            <div className="mt-4 grid gap-4">
              {post.faq.map((item) => (
                <div key={item.q} className="rounded-md bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold leading-7 text-ink">{item.q}</h3>
                  <p className="mt-2 leading-8 text-ink/75">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 rounded-md bg-ink p-6 text-white">
          <h2 className="text-2xl font-bold">まずは初回オンライン身体相談 60分 $79</h2>
          <p className="mt-4 leading-8 text-white/80">
            身体の不安を整理し、運動を安全に続けるための相談を日本語で行います。家族同席も可能です。まずは無料問い合わせで相談可否を確認します。
          </p>
          <Link href="/#consult" className="mt-6 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-white hover:text-ink">
            初回相談について問い合わせる
          </Link>
          <p className="mt-4 text-sm text-white/70">
            本サービスは診断・治療を目的としたものではなく、運動面の相談・サポートです。
          </p>
        </div>

        {related.length > 0 ? (
          <aside className="mt-12 border-t border-ink/10 pt-8">
            <h2 className="text-xl font-bold text-ink">あわせて読みたい記事</h2>
            <ul className="mt-4 grid gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="font-bold text-sea underline underline-offset-4">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sea underline underline-offset-4">
                  記事一覧へ戻る
                </Link>
              </li>
            </ul>
          </aside>
        ) : null}
      </article>
    </main>
  );
}
