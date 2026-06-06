import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "正式申込・決済案内｜オンライン運動サポート",
  description:
    "無料お問い合わせ後に、相談可否と日程を確認した方へ向けた正式申込・Stripe決済リンク案内ページです。",
  alternates: {
    canonical: `${siteUrl}/apply`
  }
};

const steps = [
  "メールで日程と相談内容を確認",
  "対象サービスと料金を確認",
  "個別に送付されたStripe決済リンクから支払い",
  "事前確認フォームを入力",
  "Zoomでオンライン相談"
];

export default function ApplyGuidePage() {
  return (
    <main className="bg-paper px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold text-sea">For confirmed inquiries</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">正式申込・決済案内</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          このページは、無料お問い合わせ後に日程と相談内容を確認した方向けの案内ページです。
          決済はこのページから直接行うのではなく、メールでお送りする個別のStripe決済リンクからお手続きください。
        </p>

        <section className="mt-10 rounded-md border border-coral/30 bg-coral/5 p-6">
          <h2 className="text-2xl font-bold text-ink">まだ問い合わせ前の方へ</h2>
          <p className="mt-3 text-lg leading-8 text-ink/75">
            相談できる内容か確認してから日程と決済をご案内します。先に無料お問い合わせフォームをご利用ください。
          </p>
          <Link href="/#apply" className="mt-5 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-ink">
            無料お問い合わせフォームへ
          </Link>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">正式申込までの流れ</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step} className="rounded-md bg-white p-5 shadow-sm">
                <span className="text-sm font-black text-coral">STEP {index + 1}</span>
                <p className="mt-2 text-lg font-bold leading-7 text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">料金確認</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-md bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold leading-7 text-ink">{plan.name}</h3>
                <p className="mt-3 text-3xl font-black text-sea">
                  {plan.price}
                  {plan.interval ? <span className="text-base text-ink/60">{plan.interval}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-md bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">安全にご利用いただくために</h2>
          <p className="mt-3 text-lg leading-8 text-ink/75">
            本サービスは診断・治療を目的とした医療行為ではありません。強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、現地医療機関の受診を優先してください。
          </p>
        </section>
      </div>
    </main>
  );
}
