import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi, Work_Sans, DM_Sans, Libre_Baskerville, Fraunces } from "next/font/google";
import "../style/globals.css";
import ClientLayoutWrapper from "@/components/global/layout/ClientLayoutWrapper";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import { SITE_BASE_URL } from "@/constants/wp.constants";
import Script from "next/script";

const tiroHindi = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const fraunces = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yuva Unstoppable | Transforming Government Schools in India",
    template: "%s | Yuva Unstoppable",
  },
  description:
    "Yuva Unstoppable is a premier non-profit empowering resilient communities and government schools across India through digital literacy, sanitation, scholarships, and climate action.",
  metadataBase: new URL(SITE_BASE_URL),
  openGraph: {
    title: "Yuva Unstoppable | Transforming Government Schools in India",
    description:
      "Yuva Unstoppable is a premier non-profit empowering resilient communities and government schools across India through digital literacy, sanitation, scholarships, and climate action.",
    url: SITE_BASE_URL,
    siteName: "Yuva Unstoppable",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/logos/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Yuva Unstoppable Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuva Unstoppable | Transforming Government Schools in India",
    description:
      "Yuva Unstoppable is a premier non-profit empowering resilient communities and government schools across India through digital literacy, sanitation, scholarships, and climate action.",
    images: ["/assets/logos/logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // icons: {
  //   icon: [{ url: "/favicon.png", type: "image/png" }],
  //   shortcut: "/favicon.png",
  //   apple: "/favicon.png",
  // },
  verification: {
    google: "b6qx4wzArIWqBz4a1Mx-gN721pdHX6iWTu25iMaZxY8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${tiroHindi.variable} ${workSans.variable} ${dmSans.variable} ${libreBaskerville.variable} ${fraunces.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://cms.yuvaunstoppable.org/cms" />
        <link rel="preconnect" href="https://cms.yuvaunstoppable.org/cms" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7JX66S5NNY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7JX66S5NNY');
          `}
        </Script>
        <SiteJsonLd />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

