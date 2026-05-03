import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sparsh Hospital — Redefining Healthcare with Precision & Compassion",
  description:
    "Sparsh Hospital is a world-class healthcare facility offering advanced medical treatments across 50+ specialities with 200+ expert doctors. Where advanced technology meets compassionate care.",
  keywords: [
    "Sparsh Hospital",
    "healthcare",
    "hospital",
    "medical",
    "doctors",
    "specialities",
    "cardiology",
    "orthopaedics",
    "neurology",
  ],
  authors: [{ name: "Sparsh Hospital" }],
  openGraph: {
    title: "Sparsh Hospital — Redefining Healthcare",
    description:
      "Where advanced technology meets world-class care. 25+ years of excellence in healthcare.",
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
      <body className={`${inter.variable} antialiased bg-[#0A0E27] text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
