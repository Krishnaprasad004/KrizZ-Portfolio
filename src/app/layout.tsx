import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import StarField from "@/components/StarField";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Prasad H",
  description: "Data Engineer / Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body flex min-h-full flex-col bg-[#0a0a0a]">
        <StarField />
        <ScrollProgressBar />
        <SmoothScroll>
          <CommandPaletteProvider>{children}</CommandPaletteProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
