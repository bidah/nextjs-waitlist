import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capsule",
  description: "A new way to consume and discover media. Synthesize any content in seconds and get a summary right away.",
  openGraph: {
    title: "CAPSULE",
    description: "A new way to consume and discover media. Synthesize any content in seconds and get a summary right away.",
    type: "website",
    url: "https://capsulethis.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CAPSULE - A new way to consume and discover media",
      },
    ],
    siteName: "CAPSULE",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAPSULE",
    description: "A new way to consume and discover media. Synthesize any content in seconds and get a summary right away.",
    images: ["/og.png"],
    creator: "@capsulethis", // Replace with your Twitter handle
    site: "https://capsulethis.com", // Replace with your Twitter handle
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
