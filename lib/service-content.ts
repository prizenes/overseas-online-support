export const serviceName = "海外在住日本人のためのオンライン運動サポート";

export const brandAssets = {
  logo: "https://prizenes.com/common/upload_data/prizenescom/image/logo1.png",
  hero: [
    {
      src: "https://prizenes.com/images/convert/prizenescom/20221202101242.jpg/image.webp",
      alt: "リハビリジムプライズネスのトレーニング風景"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/20221202100510.jpg/image.webp",
      alt: "リハビリジムプライズネスの施設内"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/20221202100920.jpg/image.webp",
      alt: "理学療法士による運動サポートの様子"
    }
  ],
  trainers: [
    {
      src: "https://prizenes.com/images/convert/prizenescom/20250809091854.jpg/image.webp",
      alt: "成田悟志 理学療法士"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/20250809091916.jpg/image.webp",
      alt: "栗谷川豊 理学療法士"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/20250809085957.jpg/image.webp",
      alt: "岡部浩季 理学療法士"
    }
  ],
  facility: [
    {
      src: "https://prizenes.com/images/convert/prizenescom/20221111170823.jpg/image.webp",
      alt: "リハビリジムプライズネスのトレーニングルーム"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/de24bfb740ef7421e00b7346ea704e3e.jpeg/image.webp",
      alt: "豊富なトレーニング器具"
    },
    {
      src: "https://prizenes.com/images/convert/prizenescom/1e9b14117c20116e7402e9b12c1df6a7-1-300x300.jpeg/image.webp",
      alt: "身体の状態確認の様子"
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

export const serviceFeatures = [
  "Zoomによるオンライン相談",
  "問診、動作確認、生活状況確認",
  "状態に合わせた自主トレメニュー提案",
  "必要に応じて現地医療機関の受診を推奨",
  "PDFまたは動画で運動メニューを共有",
  "継続プランでは、月2回または月4回のオンラインフォローを実施"
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
    name: "初回オンライン身体相談",
    price: "$79",
    description: "60分。身体の不安を整理し、初回相談の対象となるか確認します。",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_INITIAL_CONSULTATION"
  },
  {
    id: "single-followup",
    name: "単発フォロー",
    price: "$69",
    description: "45分。運動メニューの確認や継続時の不安を相談できます。",
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

export const flowSteps = [
  "無料お問い合わせ",
  "内容確認",
  "日程調整",
  "Stripe決済リンクを送付",
  "事前確認フォーム入力",
  "Zoomでオンライン相談",
  "運動メニュー共有",
  "必要に応じて継続サポートへ移行"
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
    answer: "はい。Zoomを使用できる通信環境があれば、海外から日本語でご相談いただけます。"
  },
  {
    question: "問い合わせ後すぐに決済になりますか？",
    answer: "いいえ。まず内容を確認し、相談可否や日程をメールでご案内します。決済はその後にStripe決済リンクで行います。"
  },
  {
    question: "支払いはどうなりますか？",
    answer: "相談可否と日程を確認した後、Stripeによるクレジットカード決済リンクをお送りします。料金はUSD建てです。"
  },
  {
    question: "時差対応は可能ですか？",
    answer: "居住国とタイムゾーンを確認したうえで、可能な範囲で日程を調整します。"
  },
  {
    question: "家族も同席できますか？",
    answer: "はい。海外在住のご家族を日本在住のご家族が一緒にサポートしたい場合も同席できます。"
  },
  {
    question: "医師の診断がなくても相談できますか？",
    answer: "運動や生活上の不安について相談できます。ただし強い症状や急な変化がある場合は現地医療機関の受診をおすすめします。"
  },
  {
    question: "英語が苦手でも大丈夫ですか？",
    answer: "はい。相談は日本語で行います。現地で説明を受けた内容の整理が必要な場合も、わかる範囲で一緒に確認します。"
  },
  {
    question: "キャンセルや日程変更はできますか？",
    answer: "日程確定後の変更やキャンセルについては、決済リンク送付時の案内で確認いただける形を想定しています。"
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
