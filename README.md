# 海外在住日本人のためのオンライン運動サポート

リハビリジムプライズネス向けのNext.js / React / Tailwind CSS製LPです。

## Vercel連携手順

1. GitHubの `prizenes` アカウントまたはOrganizationに、このプロジェクト用リポジトリを作成します。
2. このプロジェクトをそのリポジトリへpushします。
3. Vercelの `priznes-projects` で `Add New...` から `Project` を選びます。
4. GitHub連携から作成したリポジトリをImportします。
5. Framework Presetは `Next.js` を選びます。
6. Environment Variablesに `.env.example` の値を登録します。
7. まずStripeのテストキーとテスト用Price IDでDeployします。

## 必要な環境変数

```txt
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=
STRIPE_SECRET_KEY=
STRIPE_TEST_SECRET_KEY=
PRAISENESS_PAYMENT_TOKEN_TEST=
PRAISENESS_PAYMENT_VALUE_TEST=
STRIPE_PRICE_INITIAL_CONSULTATION=
STRIPE_PRICE_SINGLE_FOLLOWUP=
STRIPE_PRICE_MONTHLY_2=
STRIPE_PRICE_MONTHLY_4=
STRIPE_PRICE_VIDEO_CHECK=
STRIPE_WEBHOOK_SECRET=
ADMIN_EMAIL=
```

`NEXT_PUBLIC_SITE_URL` はVercelの本番URL、または独自ドメイン設定後のURLを入れてください。

## Stripe Webhook

Vercelデプロイ後、Stripe DashboardでWebhook endpointを追加します。

```txt
https://your-domain.example/api/webhooks/stripe
```

イベントはまず `checkout.session.completed` を登録してください。

## ローカル確認

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いて確認します。
