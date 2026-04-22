import { google } from "googleapis";
import nodemailer from "nodemailer";
import { submitToN8n } from "@/app/lib/submitToN8n";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;
const RECAPTCHA_SECRET = process.env.PWD_RECAPTCHA_SECRET_KEY!;

const PW_N8N_SPAM_WEBHOOK = 'https://n8n.precisewolf.net/webhook/54ebafa4-0ecb-408b-aa06-4913543a34f9';
const PW_N8N_SPAM_SECRET = '06b4e75591a91fb8fc6a1b96a535122cab39054d854690b1d7c94fdb6f427bfa';
const PW_N8N_FAIL_CLOSED = true;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_name, user_email, user_phone, message, law_firm_name, embed_url, token } = body;

    // 1. reCAPTCHA verification
    const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });
    const captchaData = await captchaRes.json();

    // 2. Honeypot check
    if (body.job_title && body.job_title.trim() !== "") {
      return new Response(JSON.stringify({ error: "Bot detected." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. reCAPTCHA score check
    if (!captchaData.success || captchaData.score < 0.5) {
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 4. n8n spam check
    const spamPayload = {
      site: {
        name: 'Precise Wolf Digital',
        url: embed_url,
      },
      form: {
        id:    'podcast_contact',
        title: 'Podcast Contact Form',
      },
      contact: {
        name:    user_name,
        email:   user_email,
        phone:   user_phone,
        message: message,
      },
      request: {
        page_url:   embed_url,
        ip:         req.headers.get('cf-connecting-ip')
                    ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim()
                    ?? '',
        user_agent: req.headers.get('user-agent') ?? '',
        timestamp:  new Date().toISOString(),
      },
      fields: [
        { id: 'user_name',     label: 'Name',          value: user_name },
        { id: 'user_email',    label: 'Email',         value: user_email },
        { id: 'user_phone',    label: 'Phone',         value: user_phone },
        { id: 'law_firm_name', label: 'Law Firm Name', value: law_firm_name },
        { id: 'message',       label: 'Message',       value: message },
      ],
    };

    try {
      const n8nRes = await fetch(PW_N8N_SPAM_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type':        'application/json',
          'X-PW-Webhook-Secret': PW_N8N_SPAM_SECRET,
        },
        body: JSON.stringify(spamPayload),
        signal: AbortSignal.timeout(10000),
      });

      if (n8nRes.ok) {
        const n8nData = await n8nRes.json();
        const decision = (n8nData.decision ?? '').toLowerCase().trim();
        if (decision === 'block' || decision === 'review') {
          return new Response(JSON.stringify({ error: 'Your message was flagged as spam.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else if (PW_N8N_FAIL_CLOSED) {
        return new Response(JSON.stringify({ error: 'Unable to verify submission.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch {
      if (PW_N8N_FAIL_CLOSED) {
        return new Response(JSON.stringify({ error: 'Unable to verify submission.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 5. submitToN8n (logging/CRM)
    await submitToN8n({
      form_type: "podcast_contact",
      user_name,
      user_email,
      user_phone,
      law_firm_name,
      message,
      embed_url,
      submitted_at: new Date().toISOString(),
    });

    // 6. Send email
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transport.verify()
      .then(() => console.log("✅ Nodemailer is ready to send emails."))
      .catch((err) => console.error("❌ Nodemailer verify failed:", err));

    const mailOptions = {
      from: `"Precise Wolf Digital" <${process.env.GMAIL_USER}>`,
      to: "ted@precisewolf.com",
      subject: `PWD - Website Lead - Podcast Contact: "${user_name}"`,
      replyTo: `"${user_name}" <${user_email}>`,
      html: `<table style="background-color: #f7f7f7; width: 100%;">
<tbody>
<tr>
<td>
<table style="margin: auto; padding-top:20px;padding-bottom: 20px;">
<tbody>
<tr>
<td style="text-align: center;"><img src="https://www.precisewolf.com/logos/logo.png" alt="Logo" width="250px" height="auto" /></td>
</tr>
</tbody>
</table>
<table style="background-color: white; width: 100%; max-width: 600px; margin: auto; border-left: 15px solid #f7f7f7; border-right: 15px solid #f7f7f7;">
<tbody>
<tr>
<td style="padding: 20px 20px;">
<p>Someone filled the podcast contact form. See details below:</p>
<p><strong>Name:</strong> ${user_name}</p>
<p><strong>Email:</strong> ${user_email}</p>
<p><strong>Phone:</strong> ${user_phone}</p>
<p><strong>Law Firm Name:</strong> ${law_firm_name}</p>
<p><strong>Message:</strong> ${message}</p>
</td>
</tr>
</tbody>
</table>
<table style="margin: auto; padding: 20px; width: 100%; max-width: 600px; text-align: center;">
<tbody>
<tr>
<td><em><small><p><strong>Submitted from:</strong> <a href="${embed_url}" target="_blank">${embed_url}</a></p></small></em></td>
</tr>
<tr>
<td>Have questions about the form submission or the website?
Reach out to your web support at <a href="mailto:ted@precisewolf.com">ted@precisewolf.com</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>`,
    };

    const result = await transport.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: "Email sent successfully!", data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("🔥 Email send error:", error instanceof Error ? error.stack : JSON.stringify(error));
    return new Response(JSON.stringify({ error: "Email failed to send." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}