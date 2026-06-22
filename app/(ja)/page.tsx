import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import JstClock from "@/components/JstClock";
import Reveal from "@/components/Reveal";
import ConsultForm from "@/components/ConsultForm";
import { EVENTS, PLANS, PRISENESS_OFFICIAL_URL, CONTACT_ANCHOR } from "@/lib/site";

// ---------------- FAQ(本文とJSON-LDで共用) ----------------
const FAQ = [
  {
    q: "海外からでも受けられますか？",
    a: "はい。Google Meetを使える通信環境があれば、どの国からでも日本語でご相談いただけます。時差をふまえて日程を調整します。",
  },
  {
    q: "無料相談を送ると、料金が発生しますか？",
    a: "いいえ。無料相談の段階で費用は一切かかりません。内容を確認し、初回オンライン相談をご希望の場合のみ、日程調整のあとに個別にご案内します。",
  },
  {
    q: "現地の病院やPhysical Therapyに通っていても相談できますか？",
    a: "はい。本サービスは現地医療の代わりではなく、受けた説明の整理や、ご自宅での運動の進め方を日本語で一緒に考えるものです。併用していただけます。",
  },
  {
    q: "時差が大きいのですが、日程は調整できますか？",
    a: "お住まいの国とタイムゾーンを確認したうえで、可能な範囲で調整します。フォームは現地時間のまま入力でき、日本時間へは自動で変換されます。",
  },
  {
    q: "家族も同席できますか？",
    a: "はい。海外在住のご本人に日本のご家族が同席する形や、ご家族についてのご相談も可能です。",
  },
  {
    q: "医師の診断がなくても相談できますか？",
    a: "運動や生活上の不安についてはご相談いただけます。ただし、強い症状や急な変化がある場合は、現地医療機関の受診を優先してください。",
  },
  {
    q: "英語が苦手でも大丈夫ですか？",
    a: "はい。相談はすべて日本語で行います。現地で受けた説明の内容を整理したい場合も、わかる範囲で一緒に確認します。",
  },
  {
    q: "キャンセルや日程変更はできますか？",
    a: "完全予約制のため、ご予約確定後は原則として返金ではなく別日への日程変更で対応します。日程変更は開始24時間前まで無料です。体調不良など急なご事情がある場合は、お早めにメールでご相談ください。詳しくは「キャンセル・日程変更について」のページをご覧ください。",
  },
  {
    q: "Google Meetは初めてですが、難しくないですか？",
    a: "いいえ。パソコンならアプリのインストールは不要で、お送りするURLを開くだけで参加できます。スマートフォン・タブレットの場合のみ、事前に無料のGoogle Meetアプリのインストールが必要です。くわしい参加方法は「Google Meetの参加方法」ページでご案内しています。",
  },
  {
    q: "支払い方法は？クレジットカードは使えますか？",
    a: "Stripeを利用した安全なオンラインカード決済です。Visa・Mastercard・American Express・JCB・Diners Club・Discoverなどの主要ブランドに対応し、海外発行のカードもご利用いただけます。お支払いは無料相談のあと・日程が確定したプランのみで、それ以前に費用は発生しません。",
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

// ---------------- ページ ----------------
export default function Page() {
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
            プライズネス
            <small>海外在住者向けオンライン運動サポート</small>
          </a>
          <nav className="header-actions">
            <TrackedLink href="/en" className="lang-switch" event={EVENTS.clickLanguageSwitchEn}>
              English
            </TrackedLink>
            <TrackedLink
              href={CONTACT_ANCHOR}
              className="btn btn-primary header-cta"
              event={EVENTS.clickFreeConsultation}
              eventParams={{ placement: "header" }}
            >
              無料で相談する
            </TrackedLink>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="container inner">
            <div className="hero-copy">
              <p className="hero-pain">現地の病院、英語での説明が不安…</p>
              <h1>
                海外でも、
                <br />
                日本語で身体の相談を。
              </h1>
              <p className="lead">
                現地でのリハビリ・通院後の運動継続から、腰痛・膝痛・歩行の不安、一時帰国後のフォローまで。
                理学療法士が、日本語で運動の進め方を一緒に整理します。
              </p>
              <div className="hero-ctas">
                <TrackedLink
                  href={CONTACT_ANCHOR}
                  className="btn btn-primary"
                  event={EVENTS.clickFreeConsultation}
                  eventParams={{ placement: "hero" }}
                >
                  無料で相談する
                </TrackedLink>
                <a href="#service" className="btn btn-ghost">
                  サービス内容を見る
                </a>
              </div>
              <div className="hero-badges">
                <span>日本語対応</span>
                <span>海外在住者向け</span>
                <span>Google Meet対応</span>
                <span>家族同席可</span>
              </div>
              <JstClock lang="ja" />
            </div>
            <div className="hero-photo">
              <Image
                src="/images/overseas-support/hero-online-consultation.png"
                alt="海外在住の日本人が自宅から日本語でオンライン運動相談を受けている様子"
                width={920}
                height={690}
                priority
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
        </section>

        {/* ===== 悩み ===== */}
        <section className="section" id="worries">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">お悩み</span>
                <h2>海外で、こんなお悩みはありませんか？</h2>
                <p className="lead">
                  ひとつでも当てはまれば、まず無料相談で状況をお聞かせください。
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="split rev-mobile" style={{ marginBottom: 36 }}>
                <Image
                  src="/images/overseas-support/worries-back-pain-consultation.png"
                  alt="海外生活のなかで腰や膝の不安を抱える40〜50代の日本人女性"
                  width={860}
                  height={640}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
                <div className="worry-grid" style={{ gridTemplateColumns: "1fr" }}>
                  {[
                    "海外で身体の不安を日本語で相談できない",
                    "膝や腰が痛いが、運動してよいかわからない",
                    "現地の医療やリハビリの説明が理解しにくい",
                  ].map((w, i) => (
                    <div className="worry-card" key={w}>
                      <span className="mark">{String(i + 1).padStart(2, "0")}</span>
                      <p>{w}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="worry-grid">
                {[
                  "親や家族の歩行・体力低下が心配",
                  "一時帰国後も運動を継続したい",
                  "ジムや運動を始めたいが、自分に合う方法がわからない",
                ].map((w, i) => (
                  <div className="worry-card" key={w}>
                    <span className="mark">{String(i + 4).padStart(2, "0")}</span>
                    <p>{w}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 現地サービスと迷っている方へ ===== */}
        <section className="section blue">
          <div className="container">
            <Reveal>
              <div className="section-head center">
                <span className="eyebrow">私たちの立ち位置</span>
                <h2>現地のサービスと迷っている方へ</h2>
              </div>
              <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
                <p>
                  現地の医療機関やPhysical Therapyを受けることは大切です。
                  ただ、英語での説明がわかりにくい、運動をどう続ければよいかわからない、
                  受診前に日本語で不安を整理したい、という場面もあります。
                </p>
                <p>
                  プライズネスのオンラインサポートは、<strong>現地医療の代わりではありません</strong>。
                  日本語で身体の不安を整理し、ご自宅で無理なく続けられる運動やセルフケアの方向性を
                  一緒に考えるサービスです。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== サービス内容 ===== */}
        <section className="section" id="service">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">サービス内容</span>
                <h2>オンラインでできること</h2>
                <p className="lead">
                  生活状況や動作を画面越しに確認し、無理なく続けられる運動を一緒に整理します。
                  必要に応じて、現地医療機関の受診をおすすめします。
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="split">
                <ul className="svc-list">
                  <li>
                    <h3>オンライン身体相談</h3>
                    <p>Google Meetで生活状況と身体の不安を伺い、運動を安全に進めるための整理をします。</p>
                  </li>
                  <li>
                    <h3>自主トレメニュー提案</h3>
                    <p>状態に合わせた運動を、PDFまたは動画でわかりやすく共有します。</p>
                  </li>
                  <li>
                    <h3>フォーム確認</h3>
                    <p>動画や画面をもとに、無理のない動き方を一緒に確認します。</p>
                  </li>
                  <li>
                    <h3>継続サポート</h3>
                    <p>月2回または月4回のフォローで、運動の習慣化を支えます。</p>
                  </li>
                  <li>
                    <h3>家族同席相談</h3>
                    <p>海外在住のご家族も、日本在住のご家族も同席できます。</p>
                  </li>
                </ul>
                <Image
                  src="/images/overseas-support/online-training-at-home.png"
                  alt="自宅のリビングでオンライン運動指導を受けながら運動する男性"
                  width={860}
                  height={700}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== できる・できない ===== */}
        <section className="section alt">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">相談できること</span>
                <h2>相談できること・できないことを明確にしています</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="split rev-mobile" style={{ alignItems: "start" }}>
                <Image
                  src="/images/overseas-support/exercise-at-home-chair.png"
                  alt="自宅で椅子を使い、安全に配慮しながら運動する女性"
                  width={860}
                  height={760}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
                <div className="scope" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="scope-card ok">
                    <h3>相談できること</h3>
                    <ul>
                      <li>腰痛・膝痛・股関節痛に関する運動相談</li>
                      <li>歩行不安・転倒不安に対する運動継続サポート</li>
                      <li>運動不足や体力低下に合わせた運動提案</li>
                      <li>現地医療・診断後のセルフケア支援</li>
                      <li>家族同席での身体の不安整理</li>
                      <li>日本時間の朝・夜を含めた時差調整の相談</li>
                    </ul>
                  </div>
                  <div className="scope-card ng">
                    <h3>相談できないこと</h3>
                    <ul>
                      <li>病名や原因を判断すること</li>
                      <li>医師の代わりに判断すること</li>
                      <li>強い症状や急な変化への緊急対応</li>
                      <li>対面での検査や徒手的な評価</li>
                      <li>結果や変化を保証すること</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== プライズネス(信頼形成) ===== */}
        <section className="section green" id="about">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">プライズネスについて</span>
                <h2>日本のリハビリジムで培った、身体を見る力をオンラインへ</h2>
              </div>
              <div style={{ maxWidth: 760 }}>
                <p>
                  プライズネスは、札幌市にある理学療法士によるリハビリジムです。
                  膝・腰・股関節の不安、歩行や転倒への不安、病院でのリハビリ終了後の運動継続など、
                  身体に不安を抱える方の「これからの生活を支える運動」を大切にしています。
                </p>
                <p>
                  海外在住向けオンラインサポートでは、店舗の器具を使うのではなく、
                  理学療法士が日本語でお話を伺い、現在の身体の状態、生活環境、運動への不安を整理します。
                  そのうえで、ご自宅で無理なく続けられる運動やセルフケアの方向性を一緒に考えます。
                </p>
                <div className="hero-ctas" style={{ marginTop: 26 }}>
                  <TrackedLink
                    href={PRISENESS_OFFICIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    event={EVENTS.clickPrisenessOfficialSite}
                  >
                    リハビリジム プライズネス公式サイトを見る
                  </TrackedLink>
                </div>
              </div>
            </Reveal>

            {/* セラピスト紹介カード */}
            <Reveal>
              <div className="therapist" style={{ marginTop: 56 }}>
                <Image
                  src="/images/overseas-support/therapist-kuriyagawa.jpg"
                  alt="オンライン運動サポートを担当する理学療法士・栗谷川豊"
                  width={640}
                  height={760}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 320px"
                />
                <div>
                  <span className="eyebrow">担当セラピスト</span>
                  <h3 style={{ fontSize: "1.5rem" }}>栗谷川 豊</h3>
                  <dl>
                    <dt>資格</dt>
                    <dd>理学療法士</dd>
                    <dt>経験</dt>
                    <dd>理学療法士歴23年</dd>
                    <dt>所属</dt>
                    <dd>リハビリジム プライズネス（札幌市）</dd>
                  </dl>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)" }}>
                    身体の状態や生活背景を丁寧に伺い、無理なく続けられる運動を一緒に考えます。
                    オンラインでは触診や機器測定は行えませんが、問診・動作確認・生活状況の確認を通じて、
                    いまの不安を整理し、自宅でできる運動の方向性をご提案します。
                  </p>
                  <div className="tag-list">
                    <span>腰・膝・股関節の運動相談</span>
                    <span>歩行不安・転倒予防</span>
                    <span>病院リハビリ後の運動継続</span>
                    <span>自宅で続けられる自主トレ提案</span>
                    <span>中高年・高齢者の運動サポート</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 料金 ===== */}
        <section className="section" id="plans">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">料金の目安</span>
                <h2>料金の目安</h2>
                <p className="price-note">
                  まずは無料お問い合わせで内容を確認し、オンラインで対応可能な場合に
                  初回オンライン身体相談をご案内します。継続サポートは、初回相談後に必要な場合のみご案内します。
                  月額プランを無理におすすめすることはありません。
                </p>
              </div>
            </Reveal>
            {/* 初回相談を主役として大きく表示。単発・継続は初回後のご案内として表示 */}
            {(() => {
              const featured = PLANS.find((p) => p.featured)!;
              const single = PLANS.find((p) => p.id === "single")!;
              const monthly = PLANS.filter((p) => p.id === "monthly2" || p.id === "monthly4");
              return (
                <>
                  <Reveal>
                    <div className="price-hero">
                      <div>
                        <span className="price-hero-badge">初めての方はまずこちら</span>
                        <h3>{featured.ja}</h3>
                        <p>{featured.jaNote}</p>
                      </div>
                      <div className="price-hero-cta">
                        <div className="price">
                          {featured.price}
                          {featured.durationJa && <small> / {featured.durationJa}</small>}
                        </div>
                        <TrackedLink
                          href={CONTACT_ANCHOR}
                          className="btn btn-primary"
                          event={featured.event ?? EVENTS.clickFreeConsultation}
                          eventParams={{ plan: featured.id }}
                        >
                          まずは無料お問い合わせ
                        </TrackedLink>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal>
                    <p className="price-sub-label">初回相談後の、必要なときのフォロー</p>
                    <div
                      className="price-grid sub"
                      style={{ gridTemplateColumns: "1fr", maxWidth: 460, margin: "0 auto" }}
                    >
                      <div className="price-card">
                        <h3>{single.ja}</h3>
                        <div className="price">
                          {single.price}
                          {single.durationJa && <small> / {single.durationJa}</small>}
                        </div>
                        <p>{single.jaNote}</p>
                        <p className="plan-status">初回相談後にご案内します</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal>
                    <p className="price-sub-label">継続をご希望の方</p>
                    <div className="price-grid sub">
                      {monthly.map((p) => (
                        <div className="price-card" key={p.id}>
                          <h3>{p.ja}</h3>
                          <div className="price">
                            {p.price}
                            {p.per && <small> / 月</small>}
                          </div>
                          <p>{p.jaNote}</p>
                          <p className="plan-status">初回相談後、必要な場合のみご案内します</p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </>
              );
            })()}

            <Reveal>
              <div className="pay-box">
                <h3>お支払いについて</h3>
                <p>
                  お支払いが発生するのは、無料お問い合わせのあと、初回オンライン相談などの有料プランに進むことが決まった場合のみです。
                </p>
                <p>
                  決済は<strong>Stripe</strong>を利用した安全なオンライン決済です。海外発行のクレジットカードもご利用いただけます。
                </p>
                <div className="pay-brands">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>American Express</span>
                  <span>JCB</span>
                  <span>Diners Club</span>
                  <span>Discover</span>
                </div>
                <p style={{ marginTop: 14, marginBottom: 0, fontSize: "0.85rem" }}>
                  ご予約確定後のキャンセルは、返金ではなく日程変更を基本とさせていただきます。
                  開始24時間前までの日程変更は無料、それ以降のキャンセル・無断キャンセルは原則返金いたしかねます。
                  施設側の都合や通信トラブルで実施できなかった場合は、日程変更または返金で対応します。{" "}
                  <a href="/cancellation-policy" className="inline-link">詳しくはこちら</a>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== ご利用の流れ ===== */}
        <section className="section alt" id="flow">
          <div className="container">
            <Reveal>
              <div className="section-head center">
                <span className="eyebrow">ご利用の流れ</span>
                <h2>ご利用の流れ</h2>
                <p className="lead">お支払いのご案内は、日程調整のあと・必要な場合のみです。</p>
              </div>
            </Reveal>
            <Reveal>
              <ol className="flow">
                <li className="free">
                  <strong>無料相談</strong>
                  <span>フォームにお名前とメールアドレスを入力して送信するだけ。</span>
                </li>
                <li>
                  <strong>内容確認</strong>
                  <span>理学療法士が内容を確認し、メールでご連絡します。</span>
                </li>
                <li>
                  <strong>日程調整</strong>
                  <span>時差をふまえて、無理のない日時を一緒に決めます。</span>
                </li>
                <li>
                  <strong>必要に応じて決済リンクをご案内</strong>
                  <span>初回相談を希望される場合のみ、個別にご案内します。</span>
                </li>
                <li>
                  <strong>事前確認フォーム入力</strong>
                  <span>当日の相談がスムーズになるよう、状態を簡単に伺います。</span>
                </li>
                <li>
                  <strong>Google Meetでオンライン相談</strong>
                  <span>
                    日本語で、身体の不安と運動の進め方を整理します。
                    パソコンはURLを開くだけ、スマホは事前にアプリが必要です。{" "}
                    <a href="/google-meet" className="inline-link">参加方法を見る →</a>
                  </span>
                </li>
                <li>
                  <strong>運動メニュー共有</strong>
                  <span>PDFまたは動画で、自宅で続けやすい運動をお渡しします。</span>
                </li>
                <li>
                  <strong>継続サポートへ移行</strong>
                  <span>ご希望の方のみ。月2回・月4回のフォローで継続を支えます。</span>
                </li>
              </ol>
            </Reveal>

            <Reveal>
              <figure className="setup-figure">
                <h3>オンライン相談は、こんなふうに受けられます</h3>
                <p>ご自宅でこのように準備いただくと、スムーズに相談できます。</p>
                <Image
                  src="/images/overseas-support/online-session-setup.png"
                  alt="オンライン相談を自宅で受けるための準備のポイント。全身が映るように設定、機器を机や棚に置く、機器から2〜3m離れる、明るい部屋、動きやすい服装、椅子やマットを準備、送られたGoogle Meetのリンクから参加。"
                  width={1122}
                  height={1402}
                  loading="lazy"
                  sizes="(max-width: 760px) 100vw, 680px"
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
                />
                <figcaption>
                  <a href="/google-meet" className="inline-link">Google Meetの参加方法をくわしく見る →</a>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ===== 安全のご案内 ===== */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="safety">
                <h2 style={{ fontSize: "1.25rem" }}>安全にご利用いただくために</h2>
                <p style={{ margin: 0 }}>
                  強い痛み・しびれ・麻痺・急な症状悪化・転倒後の痛みがある場合は、
                  相談日を待たずに現地医療機関を受診してください。
                </p>
                <ul>
                  <li>本サービスは診断・治療を目的とした医療行為ではありません。</li>
                  <li>医師から運動制限を受けている場合は、必ず事前にお知らせください。</li>
                  <li>運動は無理のない範囲で実施してください。</li>
                  <li>オンラインのため、対面での検査や徒手的な評価は行えません。</li>
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
                <span className="eyebrow">よくあるご質問</span>
                <h2>よくあるご質問</h2>
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

        {/* ===== 無料相談フォーム ===== */}
        <section className="section green" id="consult">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">無料お問い合わせ</span>
                <h2>まずは無料お問い合わせ</h2>
                <p className="lead">
                  無料お問い合わせは、初回オンライン身体相談に進む前の事前確認です。この段階ではお支払いは発生しません。
                  内容を確認したうえで、オンラインで対応可能か、初回相談に進む場合の流れをご案内します。
                  必要なのは、お名前とメールアドレスだけです。
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="form-wrap">
                <div className="form-side">
                  <Image
                    src="/images/overseas-support/family-online-consultation.png"
                    alt="海外在住の家族が一緒にオンラインで身体の相談をしている様子"
                    width={820}
                    height={620}
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                  <p className="form-note">
                    ご家族についてのご相談や、ご家族同席のご希望もフォームからお知らせください。
                  </p>
                </div>
                <ConsultForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== クロージング ===== */}
        <section className="section closing">
          <div className="container">
            <Reveal>
              <h2>
                海外でも、日本語で身体の不安を
                <br />
                相談できる場所を。
              </h2>
              <p className="lead" style={{ maxWidth: 620, margin: "0 auto 28px" }}>
                腰痛・膝痛・歩行の不安から、海外在住のご家族の体力低下のご心配まで。
                まずは無料相談で、いまの状況をお聞かせください。
              </p>
              <TrackedLink
                href={CONTACT_ANCHOR}
                className="btn btn-primary"
                event={EVENTS.clickFreeConsultation}
                eventParams={{ placement: "closing" }}
              >
                無料で相談する
              </TrackedLink>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===== スマホ固定CTA（モバイルのみ常時表示） ===== */}
      <TrackedLink
        href={CONTACT_ANCHOR}
        className="sticky-cta"
        event={EVENTS.clickFreeConsultation}
        eventParams={{ placement: "sticky" }}
      >
        まずは無料相談
        <span aria-hidden="true">›</span>
      </TrackedLink>

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
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="/cancellation-policy">キャンセルポリシー</a>
            <TrackedLink
              href={PRISENESS_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              event={EVENTS.clickPrisenessOfficialSite}
            >
              公式サイト
            </TrackedLink>
            <TrackedLink href="/en" event={EVENTS.clickLanguageSwitchEn}>
              English
            </TrackedLink>
            <a href="/en/blog">English Blog</a>
          </div>
        </div>
      </footer>
    </>
  );
}
