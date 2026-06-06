import { NextResponse } from "next/server";
import { getBaseUrl, getPlanForCheckout, getStripe } from "@/lib/stripe";
import type { ServicePlanId } from "@/lib/service-content";

type CheckoutPayload = {
  name?: string;
  email?: string;
  country?: string;
  timezone?: string;
  age?: string;
  planId?: ServicePlanId;
  topics?: string[];
  currentSymptoms?: string;
  diagnosis?: string;
  surgeryHistory?: string;
  exerciseRestrictions?: string;
  redFlags?: string;
  preferredSchedule?: string;
  familyAttendance?: string;
  receipt?: string;
  consentNonMedical?: boolean;
  consentLocalCare?: boolean;
  consentSelfPaced?: boolean;
};

function compact(value: unknown, maxLength = 450) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: Request) {
  if (!process.env.PRAISENESS_PAYMENT_TOKEN_TEST && !process.env.STRIPE_TEST_SECRET_KEY && !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe Secret Keyが設定されていません。" }, { status: 500 });
  }

  const payload = (await request.json()) as CheckoutPayload;

  if (!payload.name || !payload.email || !payload.planId) {
    return NextResponse.json({ error: "氏名、メールアドレス、希望サービスは必須です。" }, { status: 400 });
  }

  if (!payload.consentNonMedical || !payload.consentLocalCare || !payload.consentSelfPaced) {
    return NextResponse.json({ error: "同意チェックを確認してください。" }, { status: 400 });
  }

  if (!payload.topics?.length) {
    return NextResponse.json({ error: "主な相談内容を1つ以上選択してください。" }, { status: 400 });
  }

  if (payload.redFlags === "あり") {
    return NextResponse.json(
      { error: "強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、先に現地医療機関へご相談ください。" },
      { status: 400 }
    );
  }

  let checkoutPlan: ReturnType<typeof getPlanForCheckout>;

  try {
    checkoutPlan = getPlanForCheckout(payload.planId);
  } catch {
    return NextResponse.json({ error: "選択されたサービスのStripe Price IDが設定されていません。" }, { status: 500 });
  }

  if (!checkoutPlan) {
    return NextResponse.json({ error: "選択されたサービスが見つかりません。" }, { status: 400 });
  }

  const { plan, priceId } = checkoutPlan;
  const baseUrl = getBaseUrl(request);
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan.checkoutMode,
      customer_email: payload.email,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        name: compact(payload.name),
        email: compact(payload.email),
        country: compact(payload.country),
        timezone: compact(payload.timezone),
        age: compact(payload.age),
        planId: plan.id,
        planName: plan.name,
        topics: compact(payload.topics?.join(", ")),
        currentSymptoms: compact(payload.currentSymptoms),
        diagnosis: compact(payload.diagnosis),
        surgeryHistory: compact(payload.surgeryHistory),
        exerciseRestrictions: compact(payload.exerciseRestrictions),
        redFlags: compact(payload.redFlags),
        preferredSchedule: compact(payload.preferredSchedule),
        familyAttendance: compact(payload.familyAttendance),
        receipt: compact(payload.receipt)
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Stripe Checkout session creation failed", {
        name: error.name,
        message: error.message
      });
    }

    return NextResponse.json({ error: "Stripe Checkoutの作成に失敗しました。環境変数とPrice IDを確認してください。" }, { status: 500 });
  }
}
