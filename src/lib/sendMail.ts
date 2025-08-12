// src/lib/sendMail.ts
import "server-only";
import nodemailer from "nodemailer";

export type SendMailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendMail({
  name,
  email,
  subject,
  message,
}: SendMailPayload) {
  const { CONTACT_TO, MAIL_USER, MAIL_APP_PASSWORD } = process.env;

  if (!CONTACT_TO || !MAIL_USER || !MAIL_APP_PASSWORD) {
    throw new Error("メール送信の環境変数が不足しています。");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: MAIL_USER, pass: MAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"お問い合わせ（from YamaTo's Portfolio）" <${MAIL_USER}>`,
    to: CONTACT_TO,
    subject: `[Contact] ${subject}`,
    replyTo: `"${name}" <${email}>`,
    text: [
      `Name   : ${name}`,
      `Email  : ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
  });
}
