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
  preferredSlots?: {
    label?: string;
    localDateTime?: string;
    localTimeZone?: string;
    localDisplay?: string;
    japanDisplay?: string;
    isWithinJapanBusinessHours?: boolean;
  }[];
  consentLocalCare?: boolean;
  consentNonMedical?: boolean;
};

function compact(value: unknown, maxLength = 1200) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

type NormalizedInquiryPayload = Omit<Required<InquiryPayload>, "preferredSlots"> & {
  preferredSlots: {
    label: string;
    localDateTime: string;
    localTimeZone: string;
    localDisplay: string;
    japanDisplay: string;
    isWithinJapanBusinessHours: boolean;
  }[];
};

function formatPreferredSlots(slots: NormalizedInquiryPayload["preferredSlots"]) {
  return slots
    .map((slot) =>
      [
        `${slot.label}:`,
        `  現地時間: ${slot.localDisplay}`,
        `  日本時間: ${slot.japanDisplay}`,
        `  判定: ${slot.isWithinJapanBusinessHours ? "対応可能時間内" : "日本時間の対応時間外"}`
      ].join("\n")
    )
    .join("\n\n");
}

function buildAdminText(payload: NormalizedInquiryPayload) {
  return [
    "海外在住日本人向けオンライン運動サポートにお問い合わせがありました。",
    "",
    `お名前: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    `居住国: ${payload.country}`,
    `利用者のタイムゾーン: ${payload.timezone}`,
    `相談したい内容: ${payload.topics.join(", ")}`,
    `本人/家族: ${payload.consultationFor}`,
    `希望する連絡方法: ${payload.contactPreference}`,
    "",
    "希望日時:",
    formatPreferredSlots(payload.preferredSlots),
    "",
    "簡単な相談内容:",
    payload.message,
    "",
    "次の対応案:",
    "1. 相談可否を確認",
    "2. 日程調整",
    "3. 必要に応じて事前確認フォームを案内",
    "4. ご利用方法と支払い方法を個別に案内"
  ].join("\n");
}

function buildUserText(name: string, slots: NormalizedInquiryPayload["preferredSlots"]) {
  return `${name} 様

お問い合わせありがとうございます。
内容を確認のうえ、初回オンライン相談の対象となるか、日程調整やご利用の流れについてメールでご案内いたします。

送信いただいた希望日時:
${formatPreferredSlots(slots)}

強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みがある場合は、相談日を待たずに現地医療機関へご相談ください。

リハビリジムプライズネス`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryPayload;
  const preferredSlots = Array.isArray(body.preferredSlots)
    ? body.preferredSlots
        .map((slot, index) => ({
          label: compact(slot.label || `第${index + 1}希望`, 40),
          localDateTime: compact(slot.localDateTime, 80),
          localTimeZone: compact(slot.localTimeZone, 120),
          localDisplay: compact(slot.localDisplay, 160),
          japanDisplay: compact(slot.japanDisplay, 160),
          isWithinJapanBusinessHours: Boolean(slot.isWithinJapanBusinessHours)
        }))
        .filter((slot) => slot.localDateTime && slot.localTimeZone && slot.japanDisplay)
    : [];

  const payload: NormalizedInquiryPayload = {
    name: compact(body.name, 120),
    email: compact(body.email, 160),
    country: compact(body.country, 120),
    timezone: compact(body.timezone, 120),
    topics: Array.isArray(body.topics) ? body.topics.map((topic) => compact(topic, 80)).filter(Boolean) : [],
    message: compact(body.message),
    consultationFor: compact(body.consultationFor, 120),
    contactPreference: compact(body.contactPreference, 120),
    preferredSlots,
    consentLocalCare: Boolean(body.consentLocalCare),
    consentNonMedical: Boolean(body.consentNonMedical)
  };

  if (!payload.name || !payload.email || !payload.country || !payload.timezone || !payload.message || !payload.preferredSlots.length) {
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
      subject: `オンライン運動サポートお問い合わせ: ${payload.name}`,
      adminText: buildAdminText(payload),
      userText: buildUserText(payload.name, payload.preferredSlots)
    });

    if (!emailStatus.adminEmailSent) {
      return NextResponse.json(
        {
          error: "メール送信設定が未完了のため送信できませんでした。管理者にお問い合わせください。",
          adminEmail,
          emailStatus
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      adminEmail,
      emailStatus
    });
  } catch {
    return NextResponse.json(
      {
        error: "メール送信に失敗しました。時間をおいて再度お試しください。",
        adminEmail,
        emailStatus: {
          adminEmailSent: false,
          userEmailSent: false
        }
      },
      { status: 500 }
    );
  }
}
