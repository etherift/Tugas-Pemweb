import type { Metadata } from "next";
import { Literata, Nunito_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pontianak — Denyut Tenang Khatulistiwa",
  description: "Eksplorasi budaya, ketabahan kayu ulin, Sungai Kapuas, dan harmoni tiga etnis di titik hening khatulistiwa.",
  keywords: ["Pontianak", "Wisata Pontianak", "Sungai Kapuas", "Tugu Khatulistiwa", "Keraton Kadriah", "Rumah Radakng", "Tenun Corak Insang", "Kopi Pancong"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${literata.variable} ${nunitoSans.variable} ${jetbrainsMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf6f0] text-[#2e3230] font-sans selection:bg-[#4a7c59] selection:text-[#faf6f0]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
