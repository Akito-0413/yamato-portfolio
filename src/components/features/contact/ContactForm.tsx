import { redirect } from 'next/navigation';
import styles from './ContactForm.module.css';
import { sendMail } from '@/lib/sendMail';

export default function ContactForm({
  errorMessage,
  sent,
}: {
  errorMessage?: string;
  sent?: boolean;
}) {
  async function send(formData: FormData) {
    'use server';
    const toErr = (msg: string) =>
      redirect(`/?error=${encodeURIComponent(msg)}`);
    const toSendSuccess = () => redirect('/?sent=1');

    const website = String(formData.get('website') || '').trim();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (website) toErr('不正な入力です。');
    if (!name || !email || !subject || !message)
      toErr('必須項目が不足しています。');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      toErr('メールアドレスの形式が不正です。');
    if (message.length > 5000)
      toErr('メッセージが長すぎます（最大5000文字）。');
    try {
      await sendMail({ name, email, subject, message });
    } catch {
      toErr('送信に失敗しました。時間を置いて再度お試しください。');
    }
    toSendSuccess();
  }

  return (
    <section className={styles.wrap}>
      <h2 className={styles.contactTitle} id="contact">
        Contact
      </h2>

      {errorMessage && (
        <div className={styles.alertError} role="alert" aria-live="polite">
          {errorMessage}
        </div>
      )}
      {sent && (
        <div
          className={styles.alertSendSuccess}
          role="status"
          aria-live="polite"
        >
          送信しました。折り返しご連絡いたします。
        </div>
      )}

      <form action={send} className={styles.form} noValidate={false}>
        <div className={styles.field}>
          <label htmlFor="name">お名前</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="山田 太郎"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="subject">件名</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            minLength={2}
            placeholder="ご依頼・ご相談"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">内容</label>
          <textarea
            id="message"
            name="message"
            rows={8}
            required
            minLength={5}
            placeholder="ご用件の詳細をご記入ください。"
          />
        </div>

        <div className={styles.hp} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button className={styles.button} type="submit">
          送信する
        </button>
      </form>
    </section>
  );
}
