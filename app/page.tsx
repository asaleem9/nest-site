import type { Metadata } from "next";
import NestSite from "@/components/NestSite";

// Set here rather than in the layout so the other pages don't inherit it.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <NestSite />;
}
