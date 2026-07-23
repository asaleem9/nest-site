import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — Nest",
  description: "Nest collects nothing. Your baby's data stays on your phone and in your own iCloud.",
};

export default function Privacy() {
  return (
    <main className="wrap legal">
      <p className="eyebrow" style={{ marginTop: "4rem" }}>Privacy policy</p>
      <h1 className="display" style={{ marginTop: "0.8rem", fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
        We collect nothing. That&apos;s the whole policy.
      </h1>
      <p className="muted" style={{ marginTop: "1.2rem", maxWidth: "44rem" }}>
        The long version, for the careful readers — last updated July 2026.
      </p>

      <section>
        <h2>What Nest stores, and where</h2>
        <p>
          Everything you log — feeds, sleep, diapers, growth, medicine, milk stash,
          milestones, your baby&apos;s profile and photo — is stored in a database on
          your device. If your phone is signed into iCloud, that database syncs
          through <strong>your own iCloud account</strong> using Apple&apos;s CloudKit,
          so your data follows you to a new phone. We operate no servers of our own,
          and we could not read your data if we wanted to: it lives in your private
          iCloud database, which Apple encrypts and which is accessible only to your
          Apple ID.
        </p>
      </section>

      <section>
        <h2>What Nest collects about you</h2>
        <p>
          Nothing. Nest has no accounts, no sign-up, no analytics, no crash trackers,
          no advertising identifiers, and no third-party SDKs. The app never sends
          your data to us — there is no &quot;us&quot; to send it to. Our App Store
          privacy label reads &quot;Data Not Collected&quot; because that is literally
          true.
        </p>
      </section>

      <section>
        <h2>Sharing with caregivers</h2>
        <p>
          If you invite a partner or caregiver, Apple&apos;s CloudKit sharing creates a
          private, invite-only share between your iCloud account and theirs. You choose
          who joins, you can see every participant, and you can stop sharing at any
          time. The invitation link only works for the people you send it to.
        </p>
      </section>

      <section>
        <h2>Deleting your data</h2>
        <p>
          Profile → Privacy &amp; data → &quot;Erase all data…&quot; deletes everything —
          from the device and from your iCloud database. Deleting the app removes the
          local copy; the iCloud copy can also be removed from iOS Settings → your
          name → iCloud → Manage Account Storage.
        </p>
      </section>

      <section>
        <h2>Health content</h2>
        <p>
          The week-by-week guide summarizes public developmental references (CDC
          &quot;Learn the Signs. Act Early.&quot; milestones; WHO growth standards).
          It is educational content, not medical advice, and it never leaves the app
          to be personalized — because nothing about your baby leaves the app at all.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          If this policy ever changes, the change will be visible on this page before
          an app update ships. Questions? Reach us through the{" "}
          <Link href="/support">contact form</Link>.
        </p>
      </section>

      <p style={{ margin: "4rem 0" }}>
        <Link href="/">← Back to Nest</Link>
      </p>
    </main>
  );
}
