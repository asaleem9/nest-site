import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Nest",
  description: "That page doesn't exist. Head back to Nest, the free, private baby tracker.",
};

export default function NotFound() {
  return (
    <main className="wrap legal">
      <p className="eyebrow" style={{ marginTop: "4rem" }}>Page not found</p>
      <h1 className="display" style={{ marginTop: "0.8rem", fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
        Nothing in this nest.
      </h1>
      <p className="muted" style={{ marginTop: "1.2rem", maxWidth: "44rem" }}>
        The page you were looking for has moved or never existed. Everything
        about Nest starts from the home page, and help lives on the{" "}
        <Link href="/support">support page</Link>.
      </p>

      <p style={{ margin: "4rem 0" }}>
        <Link href="/">← Back to Nest</Link>
      </p>
    </main>
  );
}
