import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { brandAssets, plans } from "@/lib/service-content";
import { organizationJsonLd, siteUrl } from "@/lib/site";

const pageTitle = "Online Exercise Support in Japanese for Expats｜Physical Therapist-Based Guidance from Japan";
const pageDescription =
  "Online exercise support in Japanese for people living abroad. A Japanese physical therapist provides guidance for low back pain, knee pain, hip pain, walking concerns, fall prevention, and exercise continuation. USD payment available.";

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

const faq = [
  {
    question: "Who is this service for?",
    answer:
      "This page is mainly for Japanese speakers, Japanese people, and people with Japanese roots living abroad who want to discuss exercise concerns in Japanese."
  },
  {
    question: "Is this a medical service?",
    answer:
      "No. This service does not replace local healthcare providers or emergency care. It provides physical therapist-based exercise support and exercise continuation guidance."
  },
  {
    question: "Can family members join the session?",
    answer: "Yes. Family members can join the online session, especially when supporting an older parent or relative living abroad."
  },
  {
    question: "When should I contact local medical services?",
    answer:
      "Please contact a local medical provider if you have strong pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall."
  }
];

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
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-sea">Japanese language support</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">
              Online Exercise Support in Japanese for People Living Abroad
            </h1>
            <p className="mt-6 text-2xl font-bold leading-9 text-leaf">
              Low back pain, knee pain, hip pain, walking concerns, and exercise support — guided in Japanese by a physical therapist from Japan.
            </p>
            <p className="mt-6 text-lg leading-8 text-ink/75">
              This English page is a support page for search visibility. The service itself is designed for Japanese speakers living abroad who want to discuss body and exercise concerns in Japanese.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#apply" className="rounded-md bg-sea px-6 py-3 text-center text-lg font-bold text-white hover:bg-ink">
                Contact us on Japanese page
              </Link>
              <Link href="/" className="rounded-md border border-sea bg-white px-6 py-3 text-center text-lg font-bold text-sea hover:bg-mist">
                Japanese LP
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <img src={brandAssets.hero[0].src} alt={brandAssets.hero[0].alt} className="col-span-5 aspect-[16/11] rounded-md object-cover shadow-soft" />
            <img src={brandAssets.hero[1].src} alt={brandAssets.hero[1].alt} className="col-span-3 aspect-[4/3] rounded-md object-cover shadow-soft" />
            <div className="col-span-2 rounded-md bg-white p-4 shadow-soft">
              <p className="text-sm font-bold text-sea">Initial consultation</p>
              <p className="mt-2 text-4xl font-black text-ink">$79</p>
              <p className="mt-2 font-bold leading-6">60 minutes / Zoom / USD payment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">What We Support</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Online exercise support in Japanese",
              "Exercise continuation support after local healthcare consultation",
              "Low back pain, knee pain, hip pain, and walking concern guidance",
              "Family participation for older parents living abroad",
              "Exercise menu sharing by PDF or video",
              "Scheduling with time zone consideration"
            ].map((item) => (
              <div key={item} className="rounded-md bg-mist p-5 text-lg font-bold leading-8 text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coral/5 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-md border border-coral/30 bg-white p-6">
          <h2 className="text-3xl font-bold text-ink">Important Notice</h2>
          <p className="mt-5 text-lg leading-8 text-ink/75">
            This service is not designed to provide medical decisions, emergency care, or guaranteed results. If you have strong pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall, please contact a local medical provider.
          </p>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-ink">Plans</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-5">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-md bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold leading-7">{plan.name}</h3>
                <p className="mt-4 text-3xl font-black text-sea">
                  {plan.price}
                  {plan.interval ? <span className="text-base text-ink/60">{plan.interval}</span> : null}
                </p>
                <p className="mt-4 leading-7 text-ink/70">{plan.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/#apply" className="inline-flex rounded-md bg-sea px-6 py-3 text-lg font-bold text-white hover:bg-ink">
              Contact us in Japanese
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
