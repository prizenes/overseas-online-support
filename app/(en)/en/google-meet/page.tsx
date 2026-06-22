import type { Metadata } from "next";
import TrackedLink from "@/components/TrackedLink";
import { EVENTS, PRISENESS_OFFICIAL_URL } from "@/lib/site";
import { BLOG_PATH } from "@/lib/blog";

const JA_FORM = "/#consult";

export const metadata: Metadata = {
  title: "How to Join Google Meet｜Online Exercise Support in Japanese",
  description:
    "How to join the Google Meet online session. On a computer no installation is needed — just open the link. On a smartphone or tablet, please install the free Google Meet app in advance.",
  alternates: { canonical: "/en/google-meet" },
  robots: { index: true, follow: true },
};

export default function EnGoogleMeetGuidePage() {
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
              eventParams={{ placement: "en_guide_header" }}
            >
              Free inquiry
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main className="guide-main">
        <span className="eyebrow">Getting ready</span>
        <h1>How to Join Google Meet</h1>
        <p className="guide-lead">
          Online sessions are held on <strong>Google Meet</strong>. No special contract or account
          setup is required — on the day, you simply open the link we send you. Here is what to
          prepare, depending on your device.
        </p>

        <section className="guide-card">
          <h2>
            <span className="tag">Computer</span>
            No installation needed
          </h2>
          <ol>
            <li>Have the <strong>join link</strong> we send you by email ready.</li>
            <li>A little before your session time, click the link to open it.</li>
            <li>
              It opens directly in your browser (Chrome, Edge, Safari, etc.).{" "}
              <strong>No installation is required.</strong>
            </li>
            <li>Allow camera and microphone access, then click join to enter.</li>
          </ol>
          <p className="guide-note">
            The first time, your browser asks once for camera and microphone permission. Please
            choose “Allow.”
          </p>
        </section>

        <section className="guide-card">
          <h2>
            <span className="tag">Phone / Tablet</span>
            Install the app in advance
          </h2>
          <ol>
            <li>
              Before the day, install the free <strong>Google Meet app</strong>.
              <ul style={{ marginTop: 8 }}>
                <li>iPhone / iPad … search “Google Meet” in the App Store</li>
                <li>Android … search “Google Meet” in Google Play</li>
              </ul>
            </li>
            <li>A little before your session time, tap the join link we sent you.</li>
            <li>The Meet app opens automatically. Allow camera and microphone, then join.</li>
          </ol>
          <p className="guide-note">
            Installing the app can take a few minutes. To avoid rushing on the day, we recommend
            doing this the day before.
          </p>
        </section>

        <section className="guide-card">
          <h2>Please check before your session</h2>
          <ul>
            <li>A stable internet connection (Wi-Fi recommended)</li>
            <li>A working camera and microphone (earphones make it easier to hear)</li>
            <li>A little space to move, since we may check some simple movements</li>
            <li>Open the link a few minutes early so you are ready to join on time</li>
          </ul>
          <p className="guide-note">
            If you cannot join, please don’t worry — just email us. We will check together and
            reschedule if needed.
          </p>
        </section>

        <TrackedLink
          href={JA_FORM}
          className="btn btn-primary guide-back"
          event={EVENTS.clickFreeConsultation}
          eventParams={{ placement: "en_guide_footer" }}
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
