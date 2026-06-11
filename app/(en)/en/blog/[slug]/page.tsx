import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrackedLink from "@/components/TrackedLink";
import { BLOG_POSTS, BLOG_PATH, getPost } from "@/lib/blog";
import { EVENTS, SITE_URL, PRISENESS_OFFICIAL_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${BLOG_PATH}/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${url}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [
        {
          url: "/images/overseas-support/hero-online-consultation.png",
          width: 1200,
          height: 630,
          alt: "Online exercise support session in Japanese",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "en",
    mainEntityOfPage: `${SITE_URL}${BLOG_PATH}/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Yutaka Kuriyagawa",
      jobTitle: "Physical Therapist (Japan)",
    },
    publisher: {
      "@type": "Organization",
      name: "Priseness",
      url: SITE_URL,
    },
    image: `${SITE_URL}/images/overseas-support/hero-online-consultation.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="site-header">
        <div className="container inner">
          <Link href="/en" className="brand">
            Priseness
            <small>Online Exercise Support in Japanese</small>
          </Link>
          <nav className="header-actions">
            <Link href={BLOG_PATH} className="lang-switch">
              Blog
            </Link>
            <TrackedLink
              href="/#consult"
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: `en_blog_${post.slug}_header` }}
            >
              Free inquiry
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main>
        <article className="section article" style={{ paddingTop: 48 }}>
          <div className="container article-body">
            <p className="breadcrumbs">
              <Link href="/en">Home</Link> / <Link href={BLOG_PATH}>Blog</Link> /{" "}
              {post.category}
            </p>
            <div className="blog-card-meta" style={{ marginBottom: 14 }}>
              <span className="blog-cat">{post.category}</span>
              <time dateTime={post.date}>{fmtDate(post.date)}</time>
            </div>
            <h1>{post.title}</h1>

            {post.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}

            {post.sections.map((sec) => (
              <section key={sec.h2}>
                <h2>{sec.h2}</h2>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </section>
            ))}

            {/* 必須の注意文(全記事共通) */}
            <div className="safety" style={{ margin: "36px 0" }}>
              <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>Important notes</h2>
              <ul>
                <li>This service is not a medical diagnosis or medical treatment.</li>
                <li>
                  Please seek local medical care for severe pain, numbness, paralysis,
                  sudden worsening symptoms, or pain after a fall.
                </li>
                <li>
                  This service does not replace local medical providers — please consult
                  local medical providers when needed.
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="article-cta">
              <h2 style={{ fontSize: "1.3rem", marginTop: 0 }}>
                Start with a free inquiry — in Japanese
              </h2>
              <p className="lead" style={{ marginBottom: 18 }}>
                Tell us your situation. We coordinate the schedule around your time zone.
                No payment at the inquiry stage.
              </p>
              <TrackedLink
                href="/#consult"
                className="btn btn-primary"
                event={EVENTS.clickFreeConsultation}
                eventParams={{ placement: `en_blog_${post.slug}` }}
              >
                Send a free inquiry
              </TrackedLink>
              <p className="form-note" style={{ marginTop: 14 }}>
                <Link href="/en">About the service (English)</Link>
                {" ・ "}
                <Link href="/">日本語ページはこちら</Link>
                {" ・ "}
                <TrackedLink
                  href={PRISENESS_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  event={EVENTS.clickPrisenessOfficialSite}
                >
                  Priseness official site (Japanese)
                </TrackedLink>
              </p>
            </div>

            {/* 関連記事 */}
            {related.length > 0 && (
              <aside className="related">
                <h2 style={{ fontSize: "1.1rem" }}>Related articles</h2>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${BLOG_PATH}/${r.slug}`}>{r.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href={BLOG_PATH}>← All articles</Link>
                  </li>
                </ul>
              </aside>
            )}
          </div>
        </article>
      </main>

      <footer className="site-footer">
        <div className="container inner">
          <div>
            <strong style={{ fontFamily: "var(--font-display)" }}>Priseness</strong>
            <br />
            Online exercise support in Japanese, from Sapporo, Japan
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/en">Service</Link>
            <Link href={BLOG_PATH}>English Blog</Link>
            <TrackedLink href="/" event={EVENTS.clickLanguageSwitchJa}>
              日本語
            </TrackedLink>
          </div>
        </div>
      </footer>
    </>
  );
}
