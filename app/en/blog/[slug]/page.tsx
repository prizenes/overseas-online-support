import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/TrackedLink";
import { enBlogPosts, getEnBlogPost, getEnBlogUrl } from "@/lib/en-blog-posts";
import { organizationJsonLd, siteUrl } from "@/lib/site";

type EnBlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return enBlogPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: EnBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getEnBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: getEnBlogUrl(post.slug)
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: getEnBlogUrl(post.slug),
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function EnBlogPostPage({ params }: EnBlogPageProps) {
  const { slug } = await params;
  const post = getEnBlogPost(slug);

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
    mainEntityOfPage: getEnBlogUrl(post.slug),
    author: {
      "@type": "Organization",
      name: "Praiseness Rehab Gym",
      url: "https://prizenes.com/"
    },
    publisher: organizationJsonLd,
    keywords: post.keywords.join(", ")
  };

  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <JsonLd data={blogJsonLd} />
      <article className="mx-auto max-w-3xl">
        <div className="flex flex-wrap gap-4">
          <Link href="/en/blog" className="text-sm font-bold text-sea underline underline-offset-4">
            Back to English blog
          </Link>
          <TrackedLink href="/" eventName="click_language_switch_ja" className="text-sm font-bold text-sea underline underline-offset-4">
            Japanese page
          </TrackedLink>
        </div>
        <h1 className="mt-5 text-4xl font-black leading-tight text-ink">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">{post.description}</p>
        <div className="mt-8 rounded-md border border-coral/30 bg-coral/5 p-5">
          <p className="text-lg font-bold leading-8 text-ink">
            This service is not a medical diagnosis or treatment. Local doctors or physical therapists should be consulted when needed, especially for severe pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall.
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
          <h2 className="text-2xl font-bold">Free Inquiry in Japanese</h2>
          <p className="mt-4 leading-8 text-white/80">
            If you are living abroad and want to discuss exercise concerns in Japanese, please start with the free inquiry form on the Japanese page.
          </p>
          <TrackedLink
            href="/#apply"
            eventName="click_language_switch_ja"
            className="mt-6 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-white hover:text-ink"
          >
            Go to the Japanese free inquiry form
          </TrackedLink>
        </div>
      </article>
    </main>
  );
}
