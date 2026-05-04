import type { Metadata } from "next";
import { Inter, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansGujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sparsh Gynecology Hospital — Advanced Care. Human Touch.",
  description:
    "Sparsh Hospital is a world-class gynecology & obstetrics facility offering advanced women's healthcare with 100+ expert gynecologists. 25+ years of excellence in gynecologic surgery, IVF, maternity care.",
  keywords: [
    "Sparsh Hospital",
    "gynecology",
    "obstetrics",
    "women's health",
    "IVF",
    "maternity",
    "gynecologic surgery",
    "fertility",
  ],
  authors: [{ name: "Sparsh Gynecology Hospital" }],
  openGraph: {
    title: "Sparsh Gynecology Hospital — Advanced Care. Human Touch.",
    description:
      "World-class gynecology & obstetrics care. 25+ years of excellence in women's healthcare.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${notoSansGujarati.variable} antialiased bg-[#0A0E27] text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
