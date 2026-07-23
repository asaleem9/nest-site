import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

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
    "Feeds, sleep, diapers, milestones and more — free forever, no ads, no accounts. Built for 3am, shared with the people who help. Coming soon to the App Store.",
  openGraph: {
    title: "Nest — the calmest baby tracker ever made",
    description:
      "Free forever. No ads. No accounts. The baby tracker that respects your night.",
    images: ["/media/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
