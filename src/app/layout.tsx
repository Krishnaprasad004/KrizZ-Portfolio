import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import FaceBackground from "@/components/FaceBackground";
import HudSpotlight from "@/components/HudSpotlight";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
      className={`${jetbrainsMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body flex min-h-full flex-col bg-[#0a0a0a]">
        <FaceBackground />
        <HudSpotlight />
        <ScrollProgressBar />
        <SmoothScroll>
          <CommandPaletteProvider>{children}</CommandPaletteProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
