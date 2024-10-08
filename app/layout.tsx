import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dummy Title",
  description: "This is a dummy description for the website.",
  openGraph: {
    title: "DUMMY OG TITLE",
    description: "This is a dummy OpenGraph description.",
    type: "website",
    url: "https://capsulethis.com",
    images: [
      {
        url: "/dummy-og.png",
        width: 1000,
        height: 500,
        alt: "Dummy OG Image Alt Text",
      },
    ],
    siteName: "DUMMY SITE",
  },
  twitter: {
    card: "summary_large_image",
    title: "DUMMY TWITTER TITLE",
    description: "This is a dummy Twitter card description.",
    images: ["/dummy-twitter.png"],
    creator: "@dummyhandle",
    site: "@dummysite",
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
