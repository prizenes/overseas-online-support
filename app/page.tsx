import type { Metadata } from "next";
import Image from "next/image";
import { ApplyForm } from "@/components/ApplyForm";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { TrackedLink } from "@/components/TrackedLink";
import type { AnalyticsEventName } from "@/lib/analytics";
import { brandAssets, concerns, faqs, plans, safetyNotes, serviceName, targetUsers } from "@/lib/service-content";
import { organizationJsonLd, prizenesOfficialUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const pageTitle =
  "海外在住日本人のオンライン運動サポート｜腰痛・膝痛・歩行不安を日本語で理学療法士に相談";
const pageDescription =
  "海外在住の日本人向けに、理学療法士が日本語でオンライン身体相談・運動サポートを行います。腰痛、膝痛、股関節痛、歩行不安、転倒不安、運動不足、病院リハビリ後の運動継続をサポート。まずは無料で相談できます。";

const images = {
  hero: {
    src: "/images/overseas-support/hero-online-consultation.png",
    alt: "海外在住日本人が日本語でオンライン身体相談を受ける様子"
  },
  worries: {
    src: "/images/overseas-support/worries-back-pain-consultation.png",
    alt: "海外生活で腰や膝の不安を日本語で相談する女性"
  },
  family: {
    src: "/images/overseas-support/family-online-consultation.png",
    alt: "海外在住の家族がオンラインで身体の相談をする様子"
  },
  chair: {
    src: "/images/overseas-support/exercise-at-home-chair.png",
    alt: "自宅で椅子を使って安全に運動を行う女性"
  },
  training: {
    src: "/images/overseas-support/online-training-at-home.png",
    alt: "自宅でオンライン運動指導を受ける男性"
  },
  therapist: {
    src: "/images/overseas-support/therapist-kuriyagawa.jpg",
    alt: "担当セラピスト栗谷川豊 理学療法士"
  }
};

const therapist = {
  name: "栗谷川 豊",
  qualification: "理学療法士",
  experience: "理学療法士歴23年目",
  affiliation: "リハビリジムプライズネス",
  specialties: [
    "膝・腰・股関節の運動相談",
    "歩行不安・転倒予防",
    "病院リハビリ後の運動継続",
    "高齢者・中高年の運動サポート",
    "自宅で続けられる自主トレ提案"
  ]
};

const recommended = [
  "海外で腰や膝の不安を日本語で相談できる相手がいない",
  "歩行不安や転倒不安があり、運動を続けてよいか迷っている",
  "海外在住の親や家族の体力低下が心配",
  "病院リハビリ後に、自宅で続ける運動を整理したい",
  "一時帰国後も、海外で運動継続サポートを受けたい"
];

const serviceCards = [
  {
    title: "オンライン身体相談",
    body: "Zoomで生活状況や身体の不安を確認し、運動を安全に続けるための相談を行います。"
  },
  {
    title: "自主トレメニュー提案",
    body: "状態に合わせた運動提案を、PDFまたは動画で共有します。"
  },
  {
    title: "フォーム確認",
    body: "動画やオンライン画面をもとに、無理のない動き方を一緒に確認します。"
  },
  {
    title: "継続サポート",
    body: "月2回または月4回のオンラインフォローで、運動継続を支援します。"
  },
  {
    title: "家族同席相談",
    body: "海外在住のご家族、日本在住のご家族も同席できます。"
  }
];

const canConsult = [
  "腰痛・膝痛・股関節痛に対する運動相談",
  "歩行不安・転倒不安に対する運動継続サポート",
  "運動不足や体力低下に合わせた運動提案",
  "現地医療・診断後のセルフケア支援",
  "家族同席での身体の不安整理",
  "日本時間の朝・夜を含めた時差調整の相談"
];

const cannotConsult = [
  "病名や原因を判断すること",
  "医師の代わりに判断すること",
  "強い症状や急な変化への緊急対応",
  "対面検査や徒手的な評価",
  "結果や変化を保証すること"
];

const inquiryFlow = [
  "無料お問い合わせ",
  "内容確認",
  "日程調整",
  "ご利用方法のご案内",
  "事前確認フォーム入力",
  "Zoomでオンライン相談",
  "運動メニュー共有",
  "継続サポートへ移行"
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: siteUrl,
    languages: {
      ja: siteUrl,
      en: `${siteUrl}/en`,
      "x-default": siteUrl
    }
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteUrl,
    siteName: "リハビリジムプライズネス",
    locale: "ja_JP",
    type: "website",
    images: [`${siteUrl}${images.hero.src}`]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}${images.hero.src}`]
  }
};

function ScrollLink({
  href,
  children,
  variant = "primary",
  eventName
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  eventName?: AnalyticsEventName;
}) {
  const className =
    variant === "primary"
      ? "bg-sea text-white hover:bg-ink"
      : "border border-sea bg-white text-sea hover:bg-mist";

  return (
    <TrackedLink
      href={href}
      eventName={eventName}
      className={`${className} inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-base font-bold transition sm:text-lg`}
    >
      {children}
    </TrackedLink>
  );
}

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="relative overflow-hidden bg-paper px-5 pb-12 pt-8 sm:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <img src={brandAssets.logo} alt="リハビリジムプライズネス" className="h-12 w-auto object-contain" />
              <p className="text-sm font-bold text-sea">リハビリジムプライズネス</p>
            </div>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">{serviceName}</h1>
            <p className="mt-6 text-2xl font-bold leading-9 text-leaf">
              腰痛・膝痛・歩行不安を、日本語で理学療法士に相談。
            </p>
            <p className="mt-6 text-lg leading-8 text-ink/75 sm:text-xl sm:leading-9">
              海外で身体の不安を感じたとき、日本語で相談できる場所があるだけでも安心につながります。
              まずは現在のお悩みをお聞かせください。内容を確認したうえで、初回オンライン相談の対象となるか、日程やご利用の流れをご案内します。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["日本語対応", "海外在住者向け", "Zoom対応", "家族同席可能", "まずは無料相談"].map((label) => (
                <span key={label} className="rounded-md bg-mist px-4 py-2 text-sm font-bold text-sea">
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ScrollLink href="#apply" eventName="click_free_consultation">
                無料で相談する
              </ScrollLink>
              <ScrollLink href="#service" variant="secondary">
                サービス内容を見る
              </ScrollLink>
            </div>
            <div className="mt-5">
              <TrackedLink href="/en" eventName="click_language_switch_en" className="text-sm font-bold text-sea underline underline-offset-4">
                English support page
              </TrackedLink>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-md bg-white shadow-soft">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="aspect-[16/12] w-full object-cover sm:aspect-[16/10] lg:min-h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/5 to-transparent" />
            </div>
            <div className="relative -mt-10 ml-auto mr-4 max-w-xs rounded-md bg-white p-5 shadow-soft">
              <p className="text-sm font-black text-coral">まずは初回相談</p>
              <p className="mt-2 text-4xl font-black text-ink">$79</p>
              <p className="mt-1 text-base font-bold leading-6 text-ink">オンライン身体相談 60分</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-8 text-white sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight">まずは無料でご相談ください</h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              膝や腰の不安、運動を始めるべきか迷っていること、現地での説明がわかりにくいことなど、まずは現在のお悩みをお聞かせください。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ScrollLink href="#apply" eventName="click_free_consultation">
              無料で相談する
            </ScrollLink>
          </div>
        </div>
      </section>

      <Section title="こんな方におすすめ" tone="white">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Image
            src={images.family.src}
            alt={images.family.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] rounded-md object-cover shadow-soft"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {recommended.map((item) => (
              <div key={item} className="rounded-md border border-ink/10 bg-paper p-5 text-lg font-bold leading-8">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="海外でこんなお悩みはありませんか？" tone="paper">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Image
            src={images.worries.src}
            alt={images.worries.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="aspect-[16/11] rounded-md object-cover shadow-soft"
          />
          <div className="grid gap-4">
            {concerns.map((concern) => (
              <div key={concern} className="rounded-md border border-ink/10 bg-white p-5 text-lg font-bold leading-8">
                {concern}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="service"
        eyebrow="サービス内容"
        title="プライズネスのオンライン運動サポートとは"
        description="現地医療・診断後のセルフケア支援として、生活状況や動作をオンラインで確認し、無理なく続けられる運動を一緒に整理します。必要に応じて現地医療機関の受診を推奨します。"
        tone="mist"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((feature) => (
              <div key={feature.title} className="rounded-md bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold leading-7 text-ink">{feature.title}</h3>
                <p className="mt-3 leading-7 text-ink/75">{feature.body}</p>
              </div>
            ))}
          </div>
          <Image
            src={images.training.src}
            alt={images.training.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="aspect-[4/3] rounded-md object-cover shadow-soft"
          />
        </div>
      </Section>

      <Section title="相談できる内容・相談できない内容" tone="white">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Image
            src={images.chair.src}
            alt={images.chair.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[16/11] rounded-md object-cover shadow-soft"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-md bg-mist p-6">
              <h3 className="text-xl font-bold">相談できる内容</h3>
              <ul className="mt-5 grid gap-3">
                {canConsult.map((item) => (
                  <li key={item} className="text-base font-semibold leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-coral/30 bg-coral/5 p-6">
              <h3 className="text-xl font-bold">相談できない内容</h3>
              <ul className="mt-5 grid gap-3">
                {cannotConsult.map((item) => (
                  <li key={item} className="text-base font-semibold leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="プライズネス"
        title="日本のリハビリジムで培った、身体を見る力をオンラインへ"
        tone="paper"
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-md bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-5 text-lg leading-8 text-ink/78">
              <p>
                プライズネスは、札幌市にある理学療法士によるリハビリジムです。膝・腰・股関節の不安、歩行や転倒への不安、病院でのリハビリ終了後の運動継続など、身体に不安を抱える方の「これからの生活を支える運動」を大切にしています。
              </p>
              <p>
                海外在住向けオンラインサポートでは、店舗の器具を使うのではなく、理学療法士が日本語でお話を伺い、現在の身体の状態、生活環境、運動への不安を整理します。そのうえで、ご自宅で無理なく続けられる運動やセルフケアの方向性を一緒に考えます。
              </p>
              <p>
                現地の医療やリハビリの説明がわかりにくい方、膝や腰に不安があり運動してよいか迷っている方、一時帰国後も運動を続けたい方に、札幌のリハビリジムで培った経験をオンラインでお届けします。
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={prizenesOfficialUrl}
                eventName="click_priseness_official_site"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-sea px-6 py-3 text-base font-bold text-white transition hover:bg-ink sm:text-lg"
              >
                リハビリジムプライズネス公式サイトを見る
              </TrackedLink>
              <ScrollLink href="#apply" variant="secondary" eventName="click_free_consultation">
                日本語で相談する
              </ScrollLink>
            </div>
          </div>

          <aside className="rounded-md border border-sea/15 bg-white p-5 shadow-soft sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row lg:flex-col">
              <Image
                src={images.therapist.src}
                alt={images.therapist.alt}
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="aspect-[4/3] w-full rounded-md object-cover sm:w-48 lg:w-full"
              />
              <div>
                <p className="text-sm font-black text-sea">セラピスト紹介</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-ink">{therapist.name}</h3>
                <dl className="mt-4 grid gap-2 text-base leading-7">
                  <div>
                    <dt className="font-bold text-ink">資格</dt>
                    <dd className="text-ink/75">{therapist.qualification}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">経験</dt>
                    <dd className="text-ink/75">{therapist.experience}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">所属</dt>
                    <dd className="text-ink/75">{therapist.affiliation}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="mt-5 leading-7 text-ink/75">
              担当する理学療法士が、身体の状態や生活背景を丁寧に確認し、無理なく続けられる運動を一緒に考えます。オンラインでは触診や機器測定は行えませんが、問診・動作確認・生活状況の確認を通じて、現在の不安を整理します。
            </p>
            <div className="mt-5">
              <p className="text-sm font-black text-ink">専門・対応領域</p>
              <ul className="mt-3 grid gap-2">
                {therapist.specialties.map((specialty) => (
                  <li key={specialty} className="rounded-md bg-mist px-4 py-3 text-sm font-bold leading-6 text-sea">
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-md bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h3 className="text-xl font-black leading-tight text-ink">実店舗がある安心感を、オンライン相談にも</h3>
              <p className="mt-3 leading-7 text-ink/75">
                オンラインでは店舗の器具を使用するわけではありません。店舗で培った評価・運動指導の考え方をもとに、海外のご自宅で続けやすい方法を一緒に整理します。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {brandAssets.facility.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-md bg-paper">
                  <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="対象となる方" tone="white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {targetUsers.map((user) => (
            <div key={user} className="rounded-md border border-sea/20 bg-paper p-5 text-lg leading-8">
              {user}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="plans"
        title="料金プラン"
        description="料金は目安です。まずは無料相談で内容を確認し、初回相談や継続サポートが合いそうな場合に、ご利用の流れを個別にご案内します。"
        tone="mist"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => {
            const featured = plan.id === "initial-consultation";
            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-md bg-white p-6 shadow-sm ${featured ? "xl:col-span-2 ring-4 ring-coral/30" : ""}`}
              >
                {featured ? <p className="mb-3 text-sm font-black text-coral">まずはこちら</p> : null}
                <h3 className="text-xl font-bold leading-7">{plan.name}</h3>
                <p className="mt-4 text-4xl font-black text-sea">
                  {plan.price}
                  {plan.interval ? <span className="text-base font-bold text-ink/60">{plan.interval}</span> : null}
                </p>
                <p className="mt-4 grow leading-7 text-ink/70">{plan.description}</p>
                <TrackedLink
                  href="#apply"
                  eventName={
                    plan.id === "initial-consultation"
                      ? "click_plan_initial_79"
                      : plan.id === "monthly-2"
                        ? "click_plan_monthly_149"
                        : plan.id === "monthly-4"
                          ? "click_plan_monthly_279"
                          : undefined
                  }
                  className="mt-5 rounded-md bg-sea px-4 py-3 text-center font-bold text-white transition hover:bg-ink"
                >
                  このプランについて相談する
                </TrackedLink>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="ご利用の流れ" tone="paper">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inquiryFlow.map((step, index) => (
            <li key={step} className="rounded-md border border-ink/10 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sea text-sm font-black text-white">
                {index + 1}
              </span>
              <p className="mt-4 text-lg font-bold leading-7">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="安全にご利用いただくために" tone="white">
        <div className="rounded-md border border-coral/40 bg-coral/10 p-6">
          <p className="text-xl font-black leading-8 text-coral">
            強い痛み・しびれ・麻痺・急な症状悪化・転倒後の痛みがある場合は、相談日を待たずに現地医療機関を受診してください。
          </p>
          <ul className="mt-5 grid gap-4">
            {safetyNotes.map((note) => (
              <li key={note} className="text-lg font-semibold leading-8 text-ink">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="FAQ" tone="mist">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-md bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-lg font-bold leading-8">{faq.question}</summary>
              <p className="mt-3 leading-7 text-ink/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section
        id="apply"
        eyebrow="無料相談"
        title="無料相談フォーム"
        description="現在のお悩みと希望日時をお聞かせください。内容を確認し、初回オンライン相談の対象となるか、日程調整やご利用の流れをメールでご案内します。"
        tone="paper"
      >
        <ApplyForm />
      </Section>

      <section className="bg-ink px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            海外でも、日本語で身体の不安を相談できる場所を。
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/80">
            腰痛・膝痛・股関節痛・歩行不安に対する運動相談から、海外在住の親や家族の体力低下の不安まで、まずは無料お問い合わせで状況をお聞かせください。
          </p>
          <div className="mt-8">
            <ScrollLink href="#apply" eventName="click_free_consultation">
              無料で相談する
            </ScrollLink>
          </div>
        </div>
      </section>
    </main>
  );
}
