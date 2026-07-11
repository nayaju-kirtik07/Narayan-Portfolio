import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narayan Khatri — Video Editor & Documentary Filmmaker",
  description:
    "Portfolio of Narayan Khatri, a video editor, documentary filmmaker, and visual storyteller based in Kathmandu, Nepal.",
  openGraph: {
    title: "Narayan Khatri — Video Editor & Documentary Filmmaker",
    description:
      "Portfolio of Narayan Khatri, a video editor, documentary filmmaker, and visual storyteller based in Kathmandu, Nepal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
