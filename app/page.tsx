import type { Metadata } from "next";
import { ApplyForm } from "@/components/ApplyForm";
import { Section } from "@/components/Section";
import {
  brandAssets,
  concerns,
  faqs,
  flowSteps,
  plans,
  safetyNotes,
  serviceFeatures,
  serviceName,
  targetUsers
} from "@/lib/service-content";

export const metadata: Metadata = {
  title: "海外在住日本人のためのオンライン運動サポート",
  description:
    "海外在住の日本人向けに、腰痛・膝痛・股関節痛・歩行不安を日本語で理学療法士に相談できるオンライン身体相談・運動継続支援ページです。"
};

function ScrollLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "bg-sea text-white hover:bg-ink"
      : "border border-sea bg-white text-sea hover:bg-mist";

  return (
    <a
      href={href}
      className={`${className} inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-base font-bold transition sm:text-lg`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-paper px-5 pb-16 pt-8 sm:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl flex-1">
            <div className="mb-6 flex items-center gap-4">
              <img src={brandAssets.logo} alt="リハビリジムプライズネス" className="h-12 w-auto object-contain" />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sea">Praiseness Online Support</p>
            </div>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">{serviceName}</h1>
            <p className="mt-6 text-2xl font-bold leading-9 text-leaf">腰痛・膝痛・歩行不安を、日本語で理学療法士に相談。</p>
            <p className="mt-6 text-lg leading-8 text-ink/75 sm:text-xl sm:leading-9">
              海外で身体の不安を感じたとき、日本語で相談できる専門家が近くにいないことがあります。プライズネスでは、理学療法士がオンラインで身体の状態や生活状況を確認し、無理なく続けられる運動をサポートします。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ScrollLink href="#apply">初回相談を申し込む</ScrollLink>
              <ScrollLink href="#service" variant="secondary">
                サービス内容を見る
              </ScrollLink>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-3">
              <img
                src={brandAssets.hero[0].src}
                alt={brandAssets.hero[0].alt}
                className="col-span-5 aspect-[16/11] rounded-md object-cover shadow-soft"
              />
              <img
                src={brandAssets.hero[1].src}
                alt={brandAssets.hero[1].alt}
                className="col-span-3 aspect-[4/3] rounded-md object-cover shadow-soft"
              />
              <div className="col-span-2 flex flex-col justify-between rounded-md bg-white p-4 shadow-soft">
                <img src={brandAssets.hero[2].src} alt={brandAssets.hero[2].alt} className="aspect-square rounded-md object-cover" />
                <div className="mt-4">
                  <p className="text-sm font-bold text-sea">USD / Stripe Checkout</p>
                  <p className="mt-2 text-3xl font-black text-ink">$79</p>
                  <p className="mt-1 text-base font-bold leading-6 text-ink">初回オンライン身体相談 60分</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="海外でこんなお悩みはありませんか？" tone="white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {concerns.map((concern) => (
            <div key={concern} className="rounded-md border border-ink/10 bg-paper p-5 text-lg font-bold leading-8">
              {concern}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="service"
        eyebrow="Service"
        title="プライズネスのオンライン運動サポートとは"
        description="現地医療・診断後のセルフケア支援として、生活状況や動作をオンラインで確認し、続けやすい運動を一緒に整えます。必要に応じて現地医療機関の受診を推奨します。"
        tone="mist"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {serviceFeatures.map((feature) => (
            <div key={feature} className="rounded-md bg-white p-5 text-lg font-semibold leading-8 shadow-sm">
              {feature}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Praiseness"
        title="札幌のリハビリジムで培った、理学療法士による運動継続支援"
        description="プライズネスは、理学療法士が一人ひとりの身体の状態や生活背景を確認し、続けやすい運動を支えるリハビリジムです。海外向けオンラインサポートでも、その考え方をもとに、日本語で身体の不安を整理し、無理のないセルフケアを支援します。"
        tone="white"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {brandAssets.facility.map((image) => (
            <figure key={image.src} className="rounded-md bg-mist p-3">
              <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full rounded-md object-cover" />
              <figcaption className="mt-3 px-1 text-base font-bold leading-7 text-ink">{image.alt}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 grid gap-4 rounded-md bg-paper p-5 sm:grid-cols-3">
          {brandAssets.trainers.map((trainer) => (
            <div key={trainer.src} className="flex items-center gap-4">
              <img src={trainer.src} alt={trainer.alt} className="h-20 w-20 shrink-0 rounded-md object-cover" />
              <div>
                <p className="text-sm font-bold text-sea">理学療法士</p>
                <p className="mt-1 text-base font-bold leading-6 text-ink">{trainer.alt.replace(" 理学療法士", "")}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="対象となる方" tone="paper">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {targetUsers.map((user) => (
            <div key={user} className="rounded-md border border-sea/20 bg-white p-5 text-lg leading-8">
              {user}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="サービス内容"
        description="オンライン身体相談、運動メニューの共有、継続フォローを組み合わせ、海外生活の中で運動を続けるための支援を行います。"
        tone="white"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-md bg-mist p-6">
            <h3 className="text-2xl font-bold">相談</h3>
            <p className="mt-4 text-lg leading-8 text-ink/75">問診、動作確認、生活環境の確認をZoomで行います。</p>
          </div>
          <div className="rounded-md bg-mist p-6">
            <h3 className="text-2xl font-bold">提案</h3>
            <p className="mt-4 text-lg leading-8 text-ink/75">状態に合わせた自主トレメニューをPDFまたは動画で共有します。</p>
          </div>
          <div className="rounded-md bg-mist p-6">
            <h3 className="text-2xl font-bold">継続</h3>
            <p className="mt-4 text-lg leading-8 text-ink/75">月2回または月4回のオンラインフォローで運動継続を支援します。</p>
          </div>
        </div>
      </Section>

      <Section
        title="料金プラン"
        description="料金はUSD建てです。お支払いはStripeによるクレジットカード決済を想定しています。カード会社により、現地通貨への換算手数料が発生する場合があります。"
        tone="mist"
      >
        <div className="grid gap-5 lg:grid-cols-5">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col rounded-md bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold leading-7">{plan.name}</h3>
              <p className="mt-4 text-3xl font-black text-sea">
                {plan.price}
                {plan.interval ? <span className="text-base font-bold text-ink/60">{plan.interval}</span> : null}
              </p>
              <p className="mt-4 grow leading-7 text-ink/70">{plan.description}</p>
              <a href="#apply" className="mt-5 rounded-md bg-sea px-4 py-3 text-center font-bold text-white transition hover:bg-ink">
                申し込む
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-md bg-white p-5 text-lg leading-8 text-ink/75">
          決済完了後に、Zoom URLと事前確認フォームをお送りします。
        </p>
      </Section>

      <Section title="ご利用の流れ" tone="paper">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {flowSteps.map((step, index) => (
            <li key={step} className="rounded-md border border-ink/10 bg-white p-5">
              <span className="text-sm font-black text-coral">STEP {index + 1}</span>
              <p className="mt-2 text-lg font-bold">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="安全にご利用いただくために" tone="white">
        <div className="rounded-md border border-coral/30 bg-coral/5 p-6">
          <ul className="grid gap-4">
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
        eyebrow="Apply"
        title="申込フォーム"
        description="送信後、選択したサービスのStripe Checkoutへ進みます。入力内容は日程調整と事前確認のために利用します。"
        tone="paper"
      >
        <ApplyForm />
      </Section>

      <section className="bg-ink px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">海外でも、日本語で身体の不安を相談できる場所を。</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">
            腰痛・膝痛・股関節痛・歩行不安に対する運動相談から、海外在住の親や家族の体力低下の不安まで、まずは初回相談で状況をお聞かせください。
          </p>
          <div className="mt-8">
            <ScrollLink href="#apply">初回相談を申し込む</ScrollLink>
          </div>
        </div>
      </section>
    </main>
  );
}
