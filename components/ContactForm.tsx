"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
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
          Something went wrong on our end. Please wait a moment and try again.
        </p>
      )}
      <button type="submit" className="form-send" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
