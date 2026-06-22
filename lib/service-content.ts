export const serviceName = "海外在住日本人のためのオンライン運動サポート";

export const brandAssets = {
  logo: "https://prizenes.com/common/upload_data/prizenescom/image/logo1.png",
  hero: [
    {
      src: "/images/overseas-support/hero-online-consultation.png",
      alt: "海外在住日本人が日本語でオンライン身体相談を受ける様子"
    },
    {
      src: "/images/overseas-support/family-online-consultation.png",
      alt: "海外在住の家族がオンラインで身体の相談をする様子"
    }
  ],
  facility: [
    {
      src: "https://prizenes.com/images/convert/prizenescom/20221111170823.jpg/image.webp",
      alt: "リハビリジムプライズネスの実店舗トレーニングルーム"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/de24bfb740ef7421e00b7346ea704e3e.jpeg/image.webp",
      alt: "リハビリジムプライズネスの運動サポート環境"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/1e9b14117c20116e7402e9b12c1df6a7-1-300x300.jpeg/image.webp",
      alt: "リハビリジムプライズネスで身体の状態を確認する様子"
    }
  ]
};

export const concerns = [
  "海外で身体の不安を日本語で相談できない",
  "膝や腰が痛いが、運動してよいかわからない",
  "現地の医療やリハビリの説明が理解しにくい",
  "親や家族の歩行・体力低下が心配",
  "一時帰国後も運動を継続したい",
  "ジムや運動を始めたいが、自分に合う方法がわからない"
];

export const targetUsers = [
  "腰痛、膝痛、股関節痛がある方",
  "歩行不安、転倒不安がある方",
  "運動不足を感じている方",
  "病院リハビリ終了後に運動を続けたい方",
  "海外在住の高齢家族の体力低下が心配な方",
  "一時帰国中に身体チェックを受け、海外でも継続したい方"
];

export type ServicePlanId =
  | "initial-consultation"
  | "single-followup"
  | "monthly-2"
  | "monthly-4"
  | "video-check";

export type ServicePlan = {
  id: ServicePlanId;
  name: string;
  price: string;
  interval?: string;
  description: string;
  checkoutMode: "payment" | "subscription";
  envKey: string;
};

export const plans: ServicePlan[] = [
  {
    id: "initial-consultation",
    name: "初回オンライン身体相談 60分",
    price: "$79",
    description: "身体の不安を整理し、初回オンライン相談の対象となるか確認します。",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_INITIAL_CONSULTATION"
  },
  {
    id: "single-followup",
    name: "単発フォロー 45分",
    price: "$69",
    description: "運動メニューの確認や継続時の不安を相談できます。",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_SINGLE_FOLLOWUP"
  },
  {
    id: "monthly-2",
    name: "月2回オンライン運動サポート",
    price: "$149",
    interval: "/month",
    description: "月2回のオンラインフォローで、無理のない運動継続を支援します。",
    checkoutMode: "subscription",
    envKey: "STRIPE_PRICE_MONTHLY_2"
  },
  {
    id: "monthly-4",
    name: "月4回オンライン運動サポート",
    price: "$279",
    interval: "/month",
    description: "より細かい確認が必要な方向けに、月4回フォローします。",
    checkoutMode: "subscription",
    envKey: "STRIPE_PRICE_MONTHLY_4"
  },
  {
    id: "video-check",
    name: "動画フォームチェック",
    price: "$29",
    description: "運動フォーム動画を確認し、続けやすい調整ポイントを共有します。",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_VIDEO_CHECK"
  }
];

export const safetyNotes = [
  "本サービスは診断・治療を目的とした医療行為ではありません。",
  "強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みなどがある場合は、現地医療機関を受診してください。",
  "医師から運動制限を受けている場合は、必ず事前にお知らせください。",
  "運動は無理のない範囲で実施してください。",
  "オンラインのため、対面での検査や徒手的な評価は行えません。"
];

export const faqs = [
  {
    question: "海外からでも受けられますか？",
    answer: "はい。Google Meetを使用できる通信環境があれば、海外から日本語でご相談いただけます。"
  },
  {
    question: "無料相談後はどうなりますか？",
    answer: "内容を確認し、初回オンライン相談の対象となるか、日程調整やご利用の流れをメールでご案内します。"
  },
  {
    question: "支払いはどうなりますか？",
    answer: "無料お問い合わせの段階ではお支払いはありません。初回相談や継続サポートをご希望の場合に、個別にご案内します。"
  },
  {
    question: "時差対応は可能ですか？",
    answer: "居住国とタイムゾーンを確認したうえで、可能な範囲で日程を調整します。原則、日本時間9:00〜19:00の範囲で調整します。"
  },
  {
    question: "家族も同席できますか？",
    answer: "はい。海外在住のご家族を日本在住のご家族が一緒にサポートしたい場合も同席できます。"
  },
  {
    question: "医師の診断がなくても相談できますか？",
    answer: "運動や生活上の不安について相談できます。ただし、強い症状や急な変化がある場合は現地医療機関の受診をおすすめします。"
  },
  {
    question: "英語が苦手でも大丈夫ですか？",
    answer: "はい。相談は日本語で行います。現地で受けた説明の整理が必要な場合も、わかる範囲で一緒に確認します。"
  },
  {
    question: "キャンセルや日程変更はできますか？",
    answer: "日程変更が必要な場合は、できるだけ早めにメールでご相談ください。具体的な取り扱いは日程調整時にご案内します。"
  }
];

export const consultationTopics = [
  "腰痛",
  "膝痛",
  "股関節痛",
  "歩行不安",
  "転倒不安",
  "運動不足",
  "病院リハビリ後の運動継続",
  "高齢家族の体力低下",
  "その他"
];
