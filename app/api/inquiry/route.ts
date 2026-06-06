import { NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/inquiry-email";

type InquiryPayload = {
  name?: string;
  email?: string;
  country?: string;
  timezone?: string;
  topics?: string[];
  message?: string;
  consultationFor?: string;
  contactPreference?: string;
  preferredTime?: string;
  consentLocalCare?: boolean;
  consentNonMedical?: boolean;
};

function compact(value: unknown, maxLength = 1200) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function buildAdminText(payload: Required<InquiryPayload>) {
  return [
    "海外在住日本人向けオンライン運動サポートに問い合わせがありました。",
    "",
    `お名前: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    `居住国: ${payload.country}`,
    `タイムゾーン: ${payload.timezone}`,
    `相談したい内容: ${payload.topics.join(", ")}`,
    `本人/家族: ${payload.consultationFor}`,
    `希望する連絡方法: ${payload.contactPreference}`,
    `希望時間帯: ${payload.preferredTime}`,
    "",
    "簡単な相談内容:",
    payload.message,
    "",
    "次の対応案:",
    "1. 相談可否を確認",
    "2. 日程調整",
    "3. 必要に応じて事前確認フォームを案内",
    "4. Stripe決済リンクを送付"
  ].join("\n");
}

function buildUserText(name: string) {
  return `${name} 様

お問い合わせありがとうございます。
内容を確認のうえ、初回オンライン相談の対象となるか、日程調整やお支払い方法についてメールでご案内いたします。

強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、相談日を待たずに現地医療機関へご相談ください。

リハビリジムプライズネス`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryPayload;
  const payload: Required<InquiryPayload> = {
    name: compact(body.name, 120),
    email: compact(body.email, 160),
    country: compact(body.country, 120),
    timezone: compact(body.timezone, 120),
    topics: Array.isArray(body.topics) ? body.topics.map((topic) => compact(topic, 80)).filter(Boolean) : [],
    message: compact(body.message),
    consultationFor: compact(body.consultationFor, 120),
    contactPreference: compact(body.contactPreference, 120),
    preferredTime: compact(body.preferredTime, 400),
    consentLocalCare: Boolean(body.consentLocalCare),
    consentNonMedical: Boolean(body.consentNonMedical)
  };

  if (!payload.name || !payload.email || !payload.country || !payload.timezone || !payload.message) {
    return NextResponse.json({ error: "必須項目を入力してください。" }, { status: 400 });
  }

  if (!payload.topics.length) {
    return NextResponse.json({ error: "相談したい内容を1つ以上選択してください。" }, { status: 400 });
  }

  if (!payload.consentLocalCare || !payload.consentNonMedical) {
    return NextResponse.json({ error: "確認チェックを確認してください。" }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "mail@prizenes.com";
  const fromEmail = process.env.INQUIRY_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const emailStatus = await sendInquiryEmails({
      adminEmail,
      fromEmail,
      userEmail: payload.email,
      userName: payload.name,
      subject: `オンライン運動サポート問い合わせ: ${payload.name}`,
      adminText: buildAdminText(payload),
      userText: buildUserText(payload.name)
    });

    return NextResponse.json({
      ok: true,
      emailStatus
    });
  } catch {
    return NextResponse.json({
      ok: true,
      emailStatus: {
        adminEmailSent: false,
        userEmailSent: false
      }
    });
  }
}
