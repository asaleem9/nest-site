import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { APP_STORE_URL } from "../lib/links";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nestsleepapp.com"),
  title: "Nest — the calmest baby tracker ever made",
  description:
    "Feeds, sleep, diapers, milestones and more — free forever, no ads, no accounts. Built for 3am, shared with the people who help. Free on the App Store.",
  openGraph: {
    title: "Nest — the calmest baby tracker ever made",
    description:
      "Free forever. No ads. No accounts. The baby tracker that respects your night.",
    images: ["/media/og.png"],
  },
};

// Structured data so search results can show Nest as a free iOS app with a
// direct install link. Deliberately no author/publisher field.
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nest: Baby Tracker",
  description:
    "Feeds, sleep, diapers, milestones and more — free forever, no ads, no accounts. Built for 3am, shared with the people who help.",
  operatingSystem: "iOS",
  applicationCategory: "HealthApplication",
  url: "https://nestsleepapp.com",
  installUrl: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  image: "https://nestsleepapp.com/media/og.png",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(appJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
