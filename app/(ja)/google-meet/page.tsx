import type { Metadata } from "next";
import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import { EVENTS, PRISENESS_OFFICIAL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google Meetの参加方法｜海外在住者向けオンライン運動サポート",
  description:
    "オンライン相談で使うGoogle Meetの参加方法。パソコンはアプリ不要でURLを開くだけ、スマートフォン・タブレットは事前にアプリのインストールが必要です。当日の流れと事前準備をわかりやすくご案内します。",
  alternates: { canonical: "/google-meet" },
  robots: { index: true, follow: true },
};

export default function GoogleMeetGuidePage() {
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
              eventParams={{ placement: "guide_header" }}
            >
              無料で相談する
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main className="guide-main">
        <span className="eyebrow">ご利用の準備</span>
        <h1>Google Meet の参加方法</h1>
        <p className="guide-lead">
          オンライン相談は <strong>Google Meet</strong> を使って行います。
          特別な契約やアカウント作成は不要で、当日はお送りするURLから参加できます。
          ご利用の端末ごとに、事前のご準備をご案内します。
        </p>

        <figure className="setup-figure" style={{ marginTop: 0, marginBottom: 30 }}>
          <Image
            src="/images/overseas-support/online-session-setup.png"
            alt="オンライン相談を自宅で受けるための準備のポイント。全身が映るように設定、機器を机や棚に置く、機器から2〜3m離れる、明るい部屋、動きやすい服装、椅子やマットを準備、送られたGoogle Meetのリンクから参加。"
            width={1122}
            height={1402}
            sizes="(max-width: 760px) 100vw, 680px"
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
          />
        </figure>

        <section className="guide-card">
          <h2>
            <span className="tag">パソコン</span>
            アプリのインストールは不要です
          </h2>
          <ol>
            <li>事前にメールでお送りする <strong>参加用URL</strong> をご用意ください。</li>
            <li>相談時間の少し前に、そのURLをクリックして開きます。</li>
            <li>
              Chrome・Edge・Safari などのブラウザがそのまま開きます。
              <strong>インストールは必要ありません。</strong>
            </li>
            <li>カメラとマイクの使用を「許可」して、参加ボタンを押せば入室できます。</li>
          </ol>
          <p className="guide-note">
            初めて使うブラウザの場合、カメラ・マイクの利用許可を一度だけ求められます。「許可」を選んでください。
          </p>
        </section>

        <section className="guide-card">
          <h2>
            <span className="tag">スマホ・タブレット</span>
            事前にアプリのインストールが必要です
          </h2>
          <ol>
            <li>
              当日までに、無料の <strong>Google Meet アプリ</strong> をインストールしておきます。
              <ul style={{ marginTop: 8 }}>
                <li>iPhone・iPad … App Store で「Google Meet」を検索</li>
                <li>Android … Google Play で「Google Meet」を検索</li>
              </ul>
            </li>
            <li>相談時間の少し前に、お送りした参加用URLをタップします。</li>
            <li>自動でMeetアプリが開きます。カメラ・マイクを「許可」して参加します。</li>
          </ol>
          <p className="guide-note">
            アプリのインストールには数分かかることがあります。当日あわてないよう、前日までに済ませておくのがおすすめです。
          </p>
        </section>

        <section className="guide-card">
          <h2>当日までにご確認いただきたいこと</h2>
          <ul>
            <li>安定したインターネット環境（Wi-Fi推奨）</li>
            <li>カメラとマイクが使える状態（イヤホンがあるとより聞き取りやすいです）</li>
            <li>身体を動かして確認することがあるため、少し動けるスペース</li>
            <li>参加用URLは相談の少し前に開き、数分前には入室できるようにしておくと安心です</li>
          </ul>
          <p className="guide-note">
            うまく入室できない場合は、あわてずメールでご連絡ください。一緒に確認し、必要であれば日程を調整します。
          </p>
        </section>

        <TrackedLink
          href="/#consult"
          className="btn btn-primary guide-back"
          event={EVENTS.clickFreeConsultation}
          eventParams={{ placement: "guide_footer" }}
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
