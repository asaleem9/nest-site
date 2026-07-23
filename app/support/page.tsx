import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Support — Nest",
  description:
    "How to reach us, plus answers to the questions parents ask most about Nest — the free, private baby tracker.",
};

const FAQS = [
  {
    q: "Is Nest really free?",
    a: "Yes — every feature, with no ads, no subscriptions, and nothing locked behind a paywall. Nest has no servers to pay for, because your data never leaves your own devices and iCloud, so there is nothing to charge for.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up, no login, and no password to forget. If your iPhone is signed into iCloud, syncing and sharing just work — that is all the identity Nest ever needs.",
  },
  {
    q: "Where is my data stored?",
    a: "On your iPhone, and — if you are signed into iCloud — in your own private iCloud database, so it follows you to a new phone. Nest runs no servers, has no analytics, and never sees anything you log.",
  },
  {
    q: "How do I share with a partner or caregiver?",
    a: "Open the More menu, choose Caregivers, and send an invite. When they accept, your baby appears in their app and every feed, nap, and diaper syncs live between phones. Both iPhones need to be signed into iCloud.",
  },
  {
    q: "Can I fix an entry I logged wrong?",
    a: "Yes — every entry is editable after the fact. Tap any row in the History tab and it opens pre-filled; change the details and save. Forgot to log something in the moment? Every tracker also lets you add it later.",
  },
  {
    q: "How do I export my data?",
    a: "From the Patterns tab you can export a CSV of every entry, or a one-page PDF summary made for pediatrician visits. Both are free, like everything else.",
  },
  {
    q: "How do I erase everything?",
    a: "Profile → Privacy & data → “Erase all data…” removes every entry from your device and from your iCloud database, and returns the app to a fresh start.",
  },
  {
    q: "Which devices does Nest support?",
    a: "Nest is built for iPhone and needs iOS 18 or later. It comes with Lock Screen and Home Screen widgets, Live Activities for running feed and sleep timers, and Siri logging — “log a bottle in Nest.”",
  },
];

export default function Support() {
  return (
    <main className="wrap legal">
      <p className="eyebrow" style={{ marginTop: "4rem" }}>Support</p>
      <h1 className="display" style={{ marginTop: "0.8rem", fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
        Need a hand with Nest?
      </h1>
      <p className="muted" style={{ marginTop: "1.2rem", maxWidth: "44rem" }}>
        Most answers are below. For everything else, there&apos;s a real inbox —
        we read every message.
      </p>

      <section className="contact">
        <h2>Contact us</h2>
        <p>
          Questions, problems, ideas — send us a message and we&apos;ll get back
          to you, usually within 1–2 days. If something isn&apos;t working,
          mentioning your iPhone model and iOS version helps us get you an
          answer faster.
        </p>
        <ContactForm />
      </section>

      <section>
        <h2>Common questions</h2>
        <div className="faq" style={{ paddingBlock: 0 }}>
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className="muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2>Your privacy</h2>
        <p>
          The short version: Nest collects nothing, and your baby&apos;s data
          stays on your phone and in your own iCloud. The long version lives in
          the <Link href="/privacy">privacy policy</Link>.
        </p>
      </section>

      <p style={{ margin: "4rem 0" }}>
        <Link href="/">← Back to Nest</Link>
      </p>
    </main>
  );
}
