type InquiryEmailPayload = {
  adminEmail: string;
  fromEmail: string;
  userEmail: string;
  userName: string;
  subject: string;
  adminText: string;
  userText: string;
};

async function sendResendEmail({
  to,
  from,
  subject,
  text
}: {
  to: string;
  from: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return { sent: false };
  }

  if (!apiKey.startsWith("re_") || /[^\x20-\x7E]/.test(apiKey)) {
    throw new Error("RESEND_API_KEY is invalid. Paste the actual Resend API key that starts with re_ and contains no Japanese text.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email provider request failed. status=${response.status} body=${errorText.slice(0, 500)}`);
  }

  return { sent: true };
}

export async function sendInquiryEmails(payload: InquiryEmailPayload) {
  // 管理者（事業者）宛メールが最優先。これが失敗したらリードを取り逃すので
  // 例外はそのまま上位に投げ、API 側で 500 にする。
  const adminResult = await sendResendEmail({
    to: payload.adminEmail,
    from: payload.fromEmail,
    subject: payload.subject,
    text: payload.adminText
  });

  // ユーザー宛の確認メールは「あると親切」程度の位置づけ。
  // 送信元ドメイン未認証などで失敗しても、問い合わせ自体は成功扱いにする
  // （管理者には届いており、後日メールで返信するため）。失敗はログのみ。
  let userEmailSent = false;
  try {
    const userResult = await sendResendEmail({
      to: payload.userEmail,
      from: payload.fromEmail,
      subject: "お問い合わせありがとうございます｜リハビリジムプライズネス",
      text: payload.userText
    });
    userEmailSent = userResult.sent;
  } catch (error) {
    console.error("User confirmation email failed (non-fatal)", error);
  }

  return {
    adminEmailSent: adminResult.sent,
    userEmailSent
  };
}
