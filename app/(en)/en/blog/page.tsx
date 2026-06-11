import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { BLOG_POSTS, BLOG_PATH } from "@/lib/blog";
import { EVENTS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Online Exercise Support in Japanese for People Living Abroad",
  description:
    "Articles on online exercise support in Japanese for Japanese speakers living abroad — low back pain, knee pain, exercise continuation after physical therapy, and more.",
  alternates: { canonical: BLOG_PATH },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${BLOG_PATH}`,
    title: "Blog | Online Exercise Support in Japanese",
    description:
      "Guides in English for Japanese speakers abroad looking for exercise support in Japanese.",
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

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <header className="site-header">
        <div className="container inner">
          <Link href="/en" className="brand">
            Priseness
            <small>Online Exercise Support in Japanese</small>
          </Link>
          <nav className="header-actions">
            <TrackedLink href="/" className="lang-switch" event={EVENTS.clickLanguageSwitchJa}>
              日本語
            </TrackedLink>
            <TrackedLink
              href="/#consult"
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: "en_blog_index_header" }}
            >
              Free inquiry
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main>
        <section className="section" style={{ paddingTop: 56 }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Blog</span>
              <h1 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.1rem)" }}>
                Exercise Support in Japanese — Guides for People Living Abroad
              </h1>
              <p className="lead">
                Practical articles for Japanese speakers abroad: how online exercise
                support in Japanese works, and how to keep moving with confidence.
              </p>
            </div>

            <div className="blog-grid">
              {posts.map((p) => (
                <article className="blog-card" key={p.slug}>
                  <div className="blog-card-meta">
                    <span className="blog-cat">{p.category}</span>
                    <time dateTime={p.date}>{fmtDate(p.date)}</time>
                  </div>
                  <h2>
                    <Link href={`${BLOG_PATH}/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p>{p.description}</p>
                  <Link className="blog-more" href={`${BLOG_PATH}/${p.slug}`}>
                    Read article →
                  </Link>
                </article>
              ))}
            </div>

            <div className="article-cta" style={{ marginTop: 56 }}>
              <h2 style={{ fontSize: "1.3rem" }}>
                Want to talk about your situation in Japanese?
              </h2>
              <p className="lead" style={{ marginBottom: 18 }}>
                Start with a free inquiry. No payment at this stage.
              </p>
              <TrackedLink
                href="/#consult"
                className="btn btn-primary"
                event={EVENTS.clickFreeConsultation}
                eventParams={{ placement: "en_blog_index" }}
              >
                Send a free inquiry
              </TrackedLink>
              <p className="form-note" style={{ marginTop: 14 }}>
                <Link href="/en">About the service (English)</Link>
                {" ・ "}
                <Link href="/">日本語ページはこちら</Link>
              </p>
            </div>
          </div>
        </section>
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
