import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Alien's Aileen", template: "%s — Alien's Aileen" },
  description:
    "Korean Is Contextual. Train communication decisions, not memorized translations. Relationship-based Korean communication system.",
  openGraph: {
    title: "Alien's Aileen",
    description: "Train communication decisions, not memorized translations.",
    siteName: "Alien's Aileen",
    type: "website",
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aileen",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}

