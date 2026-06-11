import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import JstClock from "@/components/JstClock";
import Reveal from "@/components/Reveal";
import { EVENTS, PLANS, PRISENESS_OFFICIAL_URL } from "@/lib/site";

const JA_FORM = "/#consult";

// ---------------- FAQ (page + JSON-LD) ----------------
const FAQ = [
  {
    q: "Is this online exercise support provided in Japanese?",
    a: "Yes. All sessions are held in Japanese by a licensed physical therapist from Japan. This page is in English so that Japanese speakers abroad can find us through English search.",
  },
  {
    q: "Is this a medical service or online physical therapy?",
    a: "No. We provide physical therapist-based exercise support, exercise guidance, and self-care support in Japanese. We do not provide medical care, and we do not replace your doctor or your local physical therapist.",
  },
  {
    q: "Do I have to pay to send an inquiry?",
    a: "No. You can start with a free inquiry. We review your situation, coordinate the schedule across time zones, and only then guide you about pricing if the service fits.",
  },
  {
    q: "Can my family join the online session?",
    a: "Yes. Family members in Japan or abroad can join, for example when supporting an older parent living overseas.",
  },
  {
    q: "What about the time difference with Japan?",
    a: "You can enter your preferred time in your local time zone. We convert it to Japan time on our side and coordinate a schedule that works for you.",
  },
  {
    q: "When should I see a local medical provider instead?",
    a: "Please seek local medical care first for severe pain, numbness, paralysis, sudden worsening of symptoms, or pain after a fall.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function EnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== Header ===== */}
      <header className="site-header">
        <div className="container inner">
          <a href="#top" className="brand">
            Priseness
            <small>Online Exercise Support in Japanese</small>
          </a>
          <nav className="header-actions">
            <TrackedLink href="/" className="lang-switch" event={EVENTS.clickLanguageSwitchJa}>
              日本語
            </TrackedLink>
            <TrackedLink
              href={JA_FORM}
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: "en_header" }}
            >
              Free inquiry
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="container inner">
            <div className="hero-copy">
              <h1>Online Exercise Support in Japanese for People Living Abroad</h1>
              <p className="lead">
                Exercise guidance in Japanese by a physical therapist from Japan — for low back
                pain, knee pain, hip concerns, walking and fall prevention, and exercise
                continuation after local healthcare visits. Start with a free inquiry.
              </p>
              <div className="hero-ctas">
                <TrackedLink
                  href={JA_FORM}
                  className="btn btn-primary"
                  event={EVENTS.clickFreeConsultation}
                  eventParams={{ placement: "en_hero" }}
                >
                  Send a free inquiry
                </TrackedLink>
                <a href="#support" className="btn btn-ghost">
                  What we support
                </a>
              </div>
              <span className="btn-note">No payment is requested at the inquiry stage.</span>
              <div className="hero-badges">
                <span>Sessions in Japanese</span>
                <span>Zoom, worldwide</span>
                <span>Family can join</span>
                <span>Time-zone friendly</span>
              </div>
              <JstClock lang="en" />
            </div>
            <div className="hero-photo">
              <Image
                src="/images/overseas-support/hero-online-consultation.png"
                alt="Online exercise support session held in Japanese for a person living abroad"
                width={920}
                height={690}
                priority
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
        </section>

        {/* ===== Who this is for ===== */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Who this is for</span>
                <h2>Japanese-speaking exercise support, wherever you live</h2>
                <p className="lead">
                  This service is for Japanese speakers living abroad who would rather talk about
                  their body and exercise in Japanese — even if they usually search in English.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="worry-grid">
                {[
                  "Japanese people and Japanese-speaking families living outside Japan",
                  "People who find local explanations hard to follow and want them organized in Japanese",
                  "People who want exercise continuation support after seeing a local provider",
                  "Families in Japan worried about a parent or relative living overseas",
                  "People returning from a short stay in Japan who want to keep exercising abroad",
                  "Anyone who wants exercise support in Japanese before deciding on local services",
                ].map((w, i) => (
                  <div className="worry-card" key={w}>
                    <span className="mark">{String(i + 1).padStart(2, "0")}</span>
                    <p>{w}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== What we support ===== */}
        <section className="section alt" id="support">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">What we support</span>
                <h2>Physical therapist-based exercise support, in Japanese</h2>
                <p className="lead">
                  A Japanese physical therapist online listens to your situation, reviews how you
                  move, and helps you find exercise and self-care directions you can continue at
                  home. This is not a medical service, and it does not replace local providers.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="split">
                <ul className="svc-list">
                  <li>
                    <h3>Low back pain support in Japanese</h3>
                    <p>Organize your concerns and find ways to keep moving with confidence.</p>
                  </li>
                  <li>
                    <h3>Knee pain exercise support in Japanese</h3>
                    <p>Exercise guidance matched to your knees, your home, and your daily life.</p>
                  </li>
                  <li>
                    <h3>Hip pain and walking concerns</h3>
                    <p>Support for walking confidence and fall prevention at home.</p>
                  </li>
                  <li>
                    <h3>Exercise continuation support</h3>
                    <p>Keep exercising after local healthcare visits, with guidance in Japanese.</p>
                  </li>
                  <li>
                    <h3>Self-care support at home</h3>
                    <p>Simple routines shared by PDF or video, with online follow-up.</p>
                  </li>
                </ul>
                <Image
                  src="/images/overseas-support/online-training-at-home.png"
                  alt="Exercise guidance in Japanese delivered online to a home living room"
                  width={860}
                  height={700}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="section green">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">About</span>
                <h2>A physical therapist from Japan, online</h2>
              </div>
              <div style={{ maxWidth: 740 }}>
                <p>
                  Priseness is a rehabilitation-focused exercise gym in Sapporo, Japan, run by a
                  licensed physical therapist with over 20 years of experience. Our online
                  exercise support brings the same careful, person-by-person approach to Japanese
                  speakers living abroad — fully in Japanese, over Zoom, scheduled around your
                  time zone.
                </p>
                <div className="hero-ctas" style={{ marginTop: 24 }}>
                  <TrackedLink
                    href={PRISENESS_OFFICIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    event={EVENTS.clickPrisenessOfficialSite}
                  >
                    Visit the Priseness official site (Japanese)
                  </TrackedLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== How it works ===== */}
        <section className="section" id="how">
          <div className="container">
            <Reveal>
              <div className="section-head center">
                <span className="eyebrow">How it works</span>
                <h2>Start with a free inquiry</h2>
              </div>
            </Reveal>
            <Reveal>
              <ol className="flow">
                <li className="free">
                  <strong>Free inquiry</strong>
                  <span>Tell us your situation through the inquiry form. No payment at this stage.</span>
                </li>
                <li>
                  <strong>Review</strong>
                  <span>The physical therapist reviews whether the service fits your situation.</span>
                </li>
                <li>
                  <strong>Scheduling</strong>
                  <span>We coordinate a time across time zones by email.</span>
                </li>
                <li>
                  <strong>Pricing guidance, only if needed</strong>
                  <span>If you choose to book a session, we guide you individually about payment.</span>
                </li>
                <li>
                  <strong>Online session in Japanese</strong>
                  <span>Held on Zoom. Family members are welcome to join.</span>
                </li>
                <li>
                  <strong>Exercise guidance shared</strong>
                  <span>Routines are shared by PDF or video so you can continue at home.</span>
                </li>
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ===== Pricing ===== */}
        <section className="section alt">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Pricing</span>
                <h2>Pricing guide (USD)</h2>
                <p className="price-note">
                  Prices are a guide. Everything starts with a free inquiry — there is no direct
                  checkout on this page.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="price-grid">
                {PLANS.map((p) => (
                  <div className={`price-card ${p.featured ? "featured" : ""}`} key={p.id}>
                    <h3>{p.en}</h3>
                    <div className="price">
                      {p.price}
                      {p.per && <small> / month</small>}
                    </div>
                    <p>{p.enNote}</p>
                    <TrackedLink
                      href={JA_FORM}
                      className="btn btn-ghost"
                      event={p.event ?? EVENTS.clickFreeConsultation}
                      eventParams={{ plan: p.id, locale: "en" }}
                    >
                      Ask about this plan
                    </TrackedLink>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Safety ===== */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="safety">
                <h2 style={{ fontSize: "1.25rem" }}>Important safety notes</h2>
                <ul>
                  <li>
                    This service provides exercise support and exercise guidance in Japanese. It is
                    not emergency care and does not replace local medical providers.
                  </li>
                  <li>
                    Please seek local medical care for severe pain, numbness, paralysis, sudden
                    worsening symptoms, or pain after a fall.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section alt" id="faq">
          <div className="container">
            <Reveal>
              <div className="section-head center">
                <span className="eyebrow">FAQ</span>
                <h2>Frequently asked questions</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="faq">
                {FAQ.map(({ q, a }) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <div className="a">{a}</div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Closing ===== */}
        <section className="section closing green">
          <div className="container">
            <Reveal>
              <h2>Looking for exercise support in Japanese while living abroad?</h2>
              <p className="lead" style={{ maxWidth: 640, margin: "0 auto 28px" }}>
                Send a free inquiry first. We will review your situation, coordinate the schedule
                around your time zone, and guide you from there — in Japanese.
              </p>
              <TrackedLink
                href={JA_FORM}
                className="btn btn-primary"
                event={EVENTS.clickFreeConsultation}
                eventParams={{ placement: "en_closing" }}
              >
                Send a free inquiry
              </TrackedLink>
              <span className="btn-note">The inquiry form is in Japanese. No payment at this stage.</span>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container inner">
          <div>
            <strong style={{ fontFamily: "var(--font-display)" }}>Priseness</strong>
            <br />
            Online exercise support in Japanese, from Sapporo, Japan
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <TrackedLink
              href={PRISENESS_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              event={EVENTS.clickPrisenessOfficialSite}
            >
              Official site
            </TrackedLink>
            <TrackedLink href="/" event={EVENTS.clickLanguageSwitchJa}>
              日本語
            </TrackedLink>
          </div>
        </div>
      </footer>
    </>
  );
}
