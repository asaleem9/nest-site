"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

// Same rule the server applies in app/api/contact/route.ts — browsers accept
// addresses (like "name@host") that it turns away.
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const FIX_EMAIL = "That email address doesn't look complete. Please check it and try again.";
const FIX_FIELDS = "Please add your name, your email, and a message, then try again.";
const TOO_LONG = "That message is too long to send. Please shorten it and try again.";
const TOO_MANY = "That's a lot of messages in a short time. Please wait a minute and try again.";
const OUR_END = "Something went wrong on our end. Please wait a moment and try again.";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState(OUR_END);

  function fail(message: string) {
    setProblem(message);
    setStatus("error");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Catch what the server would reject before sending anything.
    if (!name || !email || !message) return fail(FIX_FIELDS);
    if (!EMAIL_PATTERN.test(email)) return fail(FIX_EMAIL);

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.status === 429) return fail(TOO_MANY);
      if (res.status === 400) {
        const reason = await res
          .json()
          .then((body) => String(body?.error ?? ""))
          .catch(() => "");
        if (reason === "Invalid email address") return fail(FIX_EMAIL);
        if (reason === "Message too long") return fail(TOO_LONG);
        return fail(FIX_FIELDS);
      }
      if (!res.ok) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      fail(OUR_END);
    }
  }

  if (status === "sent") {
    return (
      <div className="form-note form-note--ok" role="status">
        <strong>Message sent.</strong> We read every one and usually reply
        within 1–2 days — keep an eye on your inbox.
        <button type="button" className="form-again" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" required maxLength={200} autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={5} required maxLength={5000} />
      </div>
      {status === "error" && (
        <p className="form-note form-note--err" role="status">
          {problem}
        </p>
      )}
      <button type="submit" className="form-send" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
