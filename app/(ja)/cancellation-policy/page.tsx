import type { Metadata } from "next";
import TrackedLink from "@/components/TrackedLink";
import { EVENTS, PRISENESS_OFFICIAL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "キャンセル・日程変更について｜海外在住者向けオンライン運動サポート",
  description:
    "オンライン相談のキャンセル・日程変更についての基本方針。完全予約制のため、ご予約確定後は原則として別日への日程変更で対応します。日程変更は開始24時間前まで無料です。",
  alternates: { canonical: "/cancellation-policy" },
  robots: { index: true, follow: true },
};

export default function CancellationPolicyPage() {
  return (
    <>
      {/* ===== Header ===== */}
      <header className="site-header">
        <div className="container inner">
          <a href="/" className="brand">
            プライズネス
            <small>海外在住者向けオンライン運動サポート</small>
          </a>
          <nav className="header-actions">
            <a href="/" className="lang-switch">
              トップへ戻る
            </a>
            <TrackedLink
              href="/#consult"
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: "policy_header" }}
            >
              無料で相談する
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main className="guide-main">
        <span className="eyebrow">ご利用にあたって</span>
        <h1>キャンセル・日程変更について</h1>
        <p className="guide-lead">
          当施設のサービスは、完全予約制でお一人おひとりのために時間枠を確保して実施しております。
          安心してご利用いただけるよう、キャンセル・日程変更の基本方針をご案内します。
        </p>

        <section className="guide-card">
          <h2>基本方針</h2>
          <p>
            ご予約確定後のキャンセルにつきましては、原則として返金ではなく、
            別日への日程変更での対応を基本とさせていただきます。
          </p>
        </section>

        <section className="guide-card">
          <h2>日程変更</h2>
          <p>
            日程変更は、<strong>開始24時間前まで無料</strong>で承ります。
          </p>
        </section>

        <section className="guide-card">
          <h2>キャンセル・無断キャンセル</h2>
          <p>
            開始24時間前を過ぎてからのキャンセル、または無断キャンセルの場合は、
            予約枠を確保している都合上、原則として返金いたしかねます。
          </p>
        </section>

        <section className="guide-card">
          <h2>体調不良・急なご事情がある場合</h2>
          <p>
            可能な範囲で別日への日程変更にて対応いたしますので、お早めにご連絡ください。
          </p>
        </section>

        <section className="guide-card">
          <h2>当施設側の都合による場合</h2>
          <p>
            当施設側の都合や通信トラブル等によりサービスを実施できなかった場合は、
            日程変更または返金にて対応いたします。
          </p>
        </section>

        <TrackedLink
          href="/#consult"
          className="btn btn-primary guide-back"
          event={EVENTS.clickFreeConsultation}
          eventParams={{ placement: "policy_footer" }}
        >
          まずは無料相談へ
        </TrackedLink>
      </main>

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container inner">
          <div>
            <strong style={{ fontFamily: "var(--font-display)" }}>
              リハビリジム プライズネス
            </strong>
            <br />
            海外在住者向けオンライン運動サポート
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="/">トップ</a>
            <TrackedLink
              href={PRISENESS_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              event={EVENTS.clickPrisenessOfficialSite}
            >
              公式サイト
            </TrackedLink>
          </div>
        </div>
      </footer>
    </>
  );
}
