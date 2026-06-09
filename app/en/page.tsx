import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/TrackedLink";
import { brandAssets, plans } from "@/lib/service-content";
import { organizationJsonLd, siteUrl } from "@/lib/site";

const pageTitle = "Online Exercise Support in Japanese for Expats｜Physical Therapist-Based Guidance from Japan";
const pageDescription =
  "Online exercise support in Japanese for people living abroad. A Japanese physical therapist provides guidance for low back pain, knee pain, hip pain, walking concerns, fall prevention, and exercise continuation. USD payment is available after inquiry and scheduling.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      ja: siteUrl,
      en: `${siteUrl}/en`,
      "x-default": siteUrl
    }
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/en`,
    siteName: "Praiseness Online Exercise Support",
    locale: "en_US",
    type: "website",
    images: [brandAssets.hero[0].src]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [brandAssets.hero[0].src]
  }
};

const audience = [
  "Japanese speakers living outside Japan",
  "Japanese people, Japanese families, and people with Japanese roots living abroad",
  "People who want to discuss exercise concerns in Japanese",
  "Families in Japan who are worried about a parent or relative living overseas",
  "People who want to continue exercise support after local healthcare consultation"
];

const supportItems = [
  "Low back pain support in Japanese",
  "Knee pain exercise support Japanese",
  "Hip pain and walking concern guidance",
  "Exercise continuation support after local healthcare consultation",
  "Fall prevention and exercise habit support",
  "Family-supported online exercise guidance from Japan"
];

const steps = [
  "Send a free inquiry through the Japanese form",
  "We review whether the service may fit your situation",
  "We coordinate schedule and time zone by email",
  "A Stripe payment link is sent after inquiry and scheduling",
  "You complete a pre-session check form",
  "The online session is held via Zoom in Japanese",
  "Exercise guidance is shared by PDF or video when appropriate"
];

const faq = [
  {
    question: "Is this service provided in English?",
    answer:
      "The main support is provided in Japanese. This English page is a search support page for Japanese speakers using English-language Google settings abroad."
  },
  {
    question: "Who is this page for?",
    answer:
      "It is for Japanese speakers, Japanese people, Japanese families, and people with Japanese roots living abroad who want exercise support in Japanese."
  },
  {
    question: "Do I pay immediately from this page?",
    answer:
      "No. Payment is made after inquiry, situation review, and scheduling. We send a Stripe payment link only after those steps."
  },
  {
    question: "Can family members join the Zoom session?",
    answer:
      "Yes. Family members can join, especially when supporting an older parent or relative living abroad."
  },
  {
    question: "Is this a medical service?",
    answer:
      "No. This service provides exercise support and exercise continuation guidance. It is not emergency care and does not replace local medical providers."
  },
  {
    question: "When should I seek local medical care?",
    answer:
      "Please seek local medical care for severe pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall."
  }
];

function CtaLink({ children }: { children: React.ReactNode }) {
  return (
    <TrackedLink
      href="/#apply"
      eventName="click_language_switch_ja"
      className="inline-flex min-h-12 items-center justify-center rounded-md bg-sea px-6 py-3 text-base font-bold text-white transition hover:bg-ink sm:text-lg"
    >
      {children}
    </TrackedLink>
  );
}

export default function EnglishPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main className="bg-paper">
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='en';" }} />
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <img src={brandAssets.logo} alt="Praiseness Rehab Gym" className="h-12 w-auto object-contain" />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-sea">
              Japanese-speaking exercise support
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">
              Online Exercise Support in Japanese for People Living Abroad
            </h1>
            <p className="mt-6 text-2xl font-bold leading-9 text-leaf">
              Low back pain, knee pain, hip pain, walking concerns, and exercise continuation support - guided in Japanese by a physical therapist from Japan.
            </p>
            <p className="mt-6 text-lg leading-8 text-ink/75">
              This page is not for the general international market. It is a support page for Japanese speakers living abroad who search in English but want to consult in Japanese.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Provided in Japanese", "For Japanese speakers abroad", "Zoom online", "USD pricing", "Payment after inquiry"].map((label) => (
                <span key={label} className="rounded-md bg-mist px-4 py-2 text-sm font-bold text-sea">
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink>Contact us in Japanese</CtaLink>
              <TrackedLink
                href="/"
                eventName="click_language_switch_ja"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-sea bg-white px-6 py-3 text-base font-bold text-sea transition hover:bg-mist sm:text-lg"
              >
                Go to Japanese page
              </TrackedLink>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <img src={brandAssets.hero[0].src} alt={brandAssets.hero[0].alt} className="col-span-5 aspect-[16/11] rounded-md object-cover shadow-soft" />
            <img src={brandAssets.hero[1].src} alt={brandAssets.hero[1].alt} className="col-span-3 aspect-[4/3] rounded-md object-cover shadow-soft" />
            <div className="col-span-2 rounded-md bg-white p-4 shadow-soft">
              <p className="text-sm font-bold text-sea">Initial online consultation</p>
              <p className="mt-2 text-4xl font-black text-ink">$79</p>
              <p className="mt-2 font-bold leading-6">60 min / Zoom / USD</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-ink/70">Payment link is sent after inquiry and scheduling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">Who This Is For</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="rounded-md bg-paper p-5 text-lg font-bold leading-8 text-ink">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaLink>Ask if this service is right for you</CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">What We Support</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/75">
            We provide physical therapist-based exercise support, exercise guidance, self-care support after local healthcare consultation, and exercise continuation support in Japanese.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportItems.map((item) => (
              <div key={item} className="rounded-md bg-white p-5 text-lg font-bold leading-8 text-ink shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">How It Works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="rounded-md bg-white p-5 shadow-sm">
                <span className="text-sm font-black text-coral">STEP {index + 1}</span>
                <p className="mt-2 text-lg font-bold leading-7 text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">Pricing</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/75">
            Prices are shown in USD. Payment is not made directly from this English page. After inquiry and scheduling, we send an individual Stripe payment link.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-5">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-md bg-mist p-5 shadow-sm">
                <h3 className="text-xl font-bold leading-7 text-ink">{plan.name}</h3>
                <p className="mt-4 text-3xl font-black text-sea">
                  {plan.price}
                  {plan.interval ? <span className="text-base text-ink/60">{plan.interval}</span> : null}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaLink>Go to the Japanese inquiry form</CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-coral/5 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-md border border-coral/30 bg-white p-6">
          <h2 className="text-3xl font-bold text-ink">Important Safety Notes</h2>
          <p className="mt-5 text-lg leading-8 text-ink/75">
            This service provides exercise support and guidance in Japanese. It is not emergency care and does not replace local medical providers.
          </p>
          <p className="mt-4 text-lg font-bold leading-8 text-coral">
            Please seek local medical care for severe pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall.
          </p>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <details key={item.question} className="rounded-md bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-lg font-bold leading-8 text-ink">{item.question}</summary>
                <p className="mt-3 leading-7 text-ink/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">Need support in Japanese while living abroad?</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">
            Use the Japanese inquiry form first. We will review your situation, coordinate schedule, and guide you about payment after inquiry.
          </p>
          <div className="mt-8">
            <CtaLink>Go to the Japanese inquiry form</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
