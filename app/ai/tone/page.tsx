import { Metadata } from "next";
import ToneClient from "@/components/ai/ToneClient";

export const metadata: Metadata = {
  title: "Tone Corrector — Alien's Aileen",
  description: "Paste any Korean sentence. Understand exactly what it sounds like to a native Korean.",
};

export default function TonePage() {
  return <ToneClient />;
}
