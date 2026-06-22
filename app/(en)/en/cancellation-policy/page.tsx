import type { Metadata } from "next";
import TrackedLink from "@/components/TrackedLink";
import { EVENTS, PRISENESS_OFFICIAL_URL } from "@/lib/site";
import { BLOG_PATH } from "@/lib/blog";

const JA_FORM = "/#consult";

export const metadata: Metadata = {
  title: "Cancellation & Rescheduling Policy｜Online Exercise Support in Japanese",
  description:
    "Our cancellation and rescheduling policy. Because sessions are fully by appointment, after a booking is confirmed we handle changes by rescheduling rather than refunds. Rescheduling is free up to 24 hours before the start.",
  alternates: { canonical: "/en/cancellation-policy" },
  robots: { index: true, follow: true },
};

export default function EnCancellationPolicyPage() {
  return (
    <>
      {/* ===== Header ===== */}
      <header className="site-header">
        <div className="container inner">
          <a href="/en" className="brand">
            Priseness
            <small>Online Exercise Support in Japanese</small>
          </a>
          <nav className="header-actions">
            <a href="/en" className="lang-switch">
              Back to top
            </a>
            <TrackedLink href="/" className="lang-switch" event={EVENTS.clickLanguageSwitchJa}>
              日本語
            </TrackedLink>
            <TrackedLink
              href={JA_FORM}
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: "en_policy_header" }}
            >
              Free inquiry
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main className="guide-main">
        <span className="eyebrow">Before you book</span>
        <h1>Cancellation &amp; Rescheduling Policy</h1>
        <p className="guide-lead">
          Our service is fully by appointment, and we reserve a dedicated time slot for each person.
          So that you can use it with peace of mind, here is our basic policy on cancellations and
          rescheduling.
        </p>

        <section className="guide-card">
          <h2>Basic policy</h2>
          <p>
            After a booking is confirmed, cancellations are, as a rule, handled by rescheduling to
            another day rather than by a refund.
          </p>
        </section>

        <section className="guide-card">
          <h2>Rescheduling</h2>
          <p>
            Rescheduling is <strong>free up to 24 hours before</strong> the start time.
          </p>
        </section>

        <section className="guide-card">
          <h2>Cancellation &amp; no-show</h2>
          <p>
            For cancellations within 24 hours of the start time, or for a no-show, we are generally
            unable to provide a refund, as the time slot has been reserved for you.
          </p>
        </section>

        <section className="guide-card">
          <h2>Illness or unexpected circumstances</h2>
          <p>
            If you are unwell or have a sudden change of plans, we will do our best to reschedule to
            another day, so please contact us as early as you can.
          </p>
        </section>

        <section className="guide-card">
          <h2>If we are unable to hold the session</h2>
          <p>
            If a session cannot be held for reasons on our side, or due to connection trouble, we
            will respond by rescheduling or issuing a refund.
          </p>
        </section>

        <TrackedLink
          href={JA_FORM}
          className="btn btn-primary guide-back"
          event={EVENTS.clickFreeConsultation}
          eventParams={{ placement: "en_policy_footer" }}
        >
          Start with a free inquiry
        </TrackedLink>
      </main>

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container inner">
          <div>
            <strong style={{ fontFamily: "var(--font-display)" }}>Priseness</strong>
            <br />
            Online exercise support in Japanese, from Sapporo, Japan
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="/en">Top</a>
            <a href={BLOG_PATH}>English Blog</a>
            <TrackedLink
              href={PRISENESS_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              event={EVENTS.clickPrisenessOfficialSite}
            >
              Official site
            </TrackedLink>
          </div>
        </div>
      </footer>
    </>
  );
}
