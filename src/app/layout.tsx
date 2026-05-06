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
  title: "Sparsh Hospital Rajula — Best Gynecology & Women's Hospital in Rajula, Gujarat",
  description:
    "Sparsh Hospital Rajula is the best gynecology & obstetrics hospital in Rajula, Gujarat. Expert women's healthcare, maternity care, IVF, laparoscopy, sonography & normal delivery by Dr. Vijay Ladumor. 8+ years, 5000+ deliveries, 24/7 emergency.",
  keywords: [
    "sparsh hospital rajula",
    "sparsh hospital",
    "rajula hospital",
    "hospitals in rajula",
    "gynecologist in rajula",
    "best hospital in rajula",
    "women hospital rajula",
    "maternity hospital rajula",
    "gynecology hospital rajula",
    "obstetrics rajula",
    "IVF hospital rajula",
    "delivery hospital rajula",
    "Dr. Vijay Ladumor",
    "lady doctor rajula",
    "gynecologic surgery rajula",
    "fertility treatment rajula",
    "laparoscopy hospital rajula",
    "sonography rajula",
    "emergency hospital rajula gujarat",
    "hospital pipavav rajula",
  ],
  authors: [{ name: "Sparsh Gynecology Hospital" }],
  creator: "Sparsh Gynecology Hospital",
  publisher: "Sparsh Gynecology Hospital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sparsh Hospital Rajula — Best Gynecology & Women's Hospital in Rajula",
    description:
      "Best gynecology & obstetrics hospital in Rajula, Gujarat. Expert maternity care, IVF, laparoscopy & 24/7 emergency by Dr. Vijay Ladumor. 5000+ successful deliveries.",
    type: "website",
    locale: "en_IN",
    siteName: "Sparsh Hospital Rajula",
    url: "https://sparshhospitalrajula.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparsh Hospital Rajula — Best Gynecology Hospital in Rajula",
    description:
      "Best gynecology & obstetrics hospital in Rajula. Expert maternity care, IVF & 24/7 emergency. 5000+ successful deliveries.",
  },
  alternates: {
    canonical: "https://sparshhospitalrajula.com",
  },
  verification: {
    google: "google269c86874cec7269",
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
