import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/html";
import { rateLimit, clientIp } from "@/lib/rate-limit";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(`contact:${clientIp(request)}`, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: ContactFormData;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { name, email, message } = body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email ||
      typeof message !== "string" || !message.trim()
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    // Initialize at runtime, not build time
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Escape everything user-provided before it lands in the email HTML —
    // otherwise anyone can inject markup that renders in the support inbox
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");
    const subjectName = name.trim().replace(/[\r\n]+/g, " ");

    const fromAddress = process.env.RESEND_FROM_ADDRESS;
    if (!fromAddress) {
      console.error("RESEND_FROM_ADDRESS not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const { error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: ["techstarsm@gmail.com"],
      replyTo: email,
      subject: `Nest Support: ${subjectName}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1c2130;">
          <h2 style="font-family: Georgia, serif; border-bottom: 2px solid #b97f35; padding-bottom: 8px;">
            New support message
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f7f4ee; padding: 16px; border-left: 3px solid #b97f35; border-radius: 6px;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
