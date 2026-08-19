import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fay-huang-travel-archive.vercel.app";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imageUrl = `${siteUrl}${basePath}/og.jpg`;

export const metadata: Metadata = {
    title: "Fay Huang — The Travel Archive",
    description: "A personal archive of travel, marketing, creativity and growth.",
    metadataBase: new URL(siteUrl),
    icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
    openGraph: {
      title: "Fay Huang — The Travel Archive",
      description: "A personal archive of travel, marketing, creativity and growth.",
      type: "website",
      images: [{ url: imageUrl, width: 1536, height: 864, alt: "Fay Huang — The Travel Archive" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fay Huang — The Travel Archive",
      description: "A personal archive of travel, marketing, creativity and growth.",
      images: [imageUrl],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
