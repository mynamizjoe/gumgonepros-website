import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 10;
}

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { success: false, errors: ["Too many submissions. Please try again in 15 minutes."] },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, address, details, honeypot } = body;

    // Honeypot: bots fill this hidden field; real users don't
    if (honeypot) {
      return Response.json({ success: true });
    }

    const cleanName = stripHtml(String(name ?? "")).slice(0, 100);
    const cleanEmail = stripHtml(String(email ?? "")).slice(0, 200);
    const cleanPhone = stripHtml(String(phone ?? "")).slice(0, 30);
    const cleanCompany = stripHtml(String(company ?? "")).slice(0, 200);
    const cleanAddress = stripHtml(String(address ?? "")).slice(0, 300);
    const cleanDetails = stripHtml(String(details ?? "")).slice(0, 2000);

    const errors: string[] = [];

    if (!cleanName) errors.push("Name is required");
    if (!cleanEmail) errors.push("Email is required");
    else if (!isValidEmail(cleanEmail)) errors.push("Invalid email format");
    if (!cleanPhone) errors.push("Phone is required");
    else if (!isValidPhone(cleanPhone))
      errors.push("Phone must have at least 10 digits");
    if (!cleanCompany) errors.push("Company / Property Name is required");
    if (!cleanAddress) errors.push("Property Address is required");

    if (errors.length > 0) {
      return Response.json({ success: false, errors }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GumGone Pros Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `New Evaluation Request — ${cleanCompany}`,
      text: [
        "New free evaluation request from gumgonepros.com",
        "",
        `Name:              ${cleanName}`,
        `Email:             ${cleanEmail}`,
        `Phone:             ${cleanPhone}`,
        `Company/Property:  ${cleanCompany}`,
        `Property Address:  ${cleanAddress}`,
        cleanDetails ? `\nAdditional Details:\n${cleanDetails}` : "",
      ]
        .filter((l) => l !== undefined)
        .join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px 24px;background:#f5f5f5;border-radius:8px;">
          <h2 style="color:#c8a84b;margin-top:0;margin-bottom:4px;">New Free Evaluation Request</h2>
          <p style="color:#666;margin-top:0;margin-bottom:24px;">Submitted via gumgonepros.com</p>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="padding:12px 16px;font-weight:bold;width:180px;background:#fff;border-bottom:1px solid #eee;">Name</td>
              <td style="padding:12px 16px;background:#fff;border-bottom:1px solid #eee;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:bold;background:#fafafa;border-bottom:1px solid #eee;">Email</td>
              <td style="padding:12px 16px;background:#fafafa;border-bottom:1px solid #eee;"><a href="mailto:${cleanEmail}" style="color:#c8a84b;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:bold;background:#fff;border-bottom:1px solid #eee;">Phone</td>
              <td style="padding:12px 16px;background:#fff;border-bottom:1px solid #eee;"><a href="tel:${cleanPhone}" style="color:#c8a84b;">${cleanPhone}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:bold;background:#fafafa;border-bottom:1px solid #eee;">Company / Property</td>
              <td style="padding:12px 16px;background:#fafafa;border-bottom:1px solid #eee;">${cleanCompany}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:bold;background:#fff;${cleanDetails ? "border-bottom:1px solid #eee;" : ""}">Property Address</td>
              <td style="padding:12px 16px;background:#fff;${cleanDetails ? "border-bottom:1px solid #eee;" : ""}">${cleanAddress}</td>
            </tr>
            ${
              cleanDetails
                ? `<tr>
              <td style="padding:12px 16px;font-weight:bold;background:#fafafa;vertical-align:top;">Additional Details</td>
              <td style="padding:12px 16px;background:#fafafa;white-space:pre-wrap;">${cleanDetails.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
            </tr>`
                : ""
            }
          </table>
          <p style="color:#aaa;font-size:12px;margin-top:20px;margin-bottom:0;">GumGone Pros · gumgonepros.com</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { success: false, errors: ["Server error. Please try again."] },
      { status: 500 }
    );
  }
}
