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
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false };
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
    throw new Error("Email provider request failed.");
  }

  return { sent: true };
}

export async function sendInquiryEmails(payload: InquiryEmailPayload) {
  const adminResult = await sendResendEmail({
    to: payload.adminEmail,
    from: payload.fromEmail,
    subject: payload.subject,
    text: payload.adminText
  });

  const userResult = await sendResendEmail({
    to: payload.userEmail,
    from: payload.fromEmail,
    subject: "お問い合わせありがとうございます｜リハビリジムプライズネス",
    text: payload.userText
  });

  return {
    adminEmailSent: adminResult.sent,
    userEmailSent: userResult.sent
  };
}
