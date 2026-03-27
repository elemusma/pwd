import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./components/nav";
import "./globals.css";
// import "./styles/01.scss";
import Footer from "./components/footer";
import "./styles/btn.scss";
import "./styles/fonts.scss";
import "./styles/home.scss";
import "./styles/body.scss";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Main from "./js/main";
// import "./styles/layout.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Get More Leads & Clients - Show Up in Google & AI Results - Precise Wolf Digital",
  description:
    "A good-looking site that nobody finds or trusts isn&apos;t doing its job. I fix both problems. I create content that makes your clients find you when they're actively searching for an expert like you.",
  metadataBase: new URL("https://precisewolf.com"), // required for relative OG URLs
  alternates: {
    canonical: "https://precisewolf.com", // ✅ correct canonical
  },

  openGraph: {
    title:
      "Get More Leads & Clients - Show Up in Google & AI Results - Precise Wolf Digital",
    description:
      "A good-looking site that nobody finds or trusts isn&apos;t doing its job. I fix both problems. I create content that makes your clients find you when they're actively searching for an expert like you.",
    url: "https://precisewolf.com",
    siteName: "Precise Wolf Digital",
    images: [
      {
        url: "https://precisewolf.com/photos/Helping-Expert-Witnesses.jpg", // Make sure this path is valid!
        width: 1200,
        height: 630,
        alt: "Get More Leads & Clients - Show Up in Google & AI Results - Precise Wolf Digital",
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/assets/favicon.ico", // Ensure this path is correct
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main />
        <Nav />
        {children}
        <Footer />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </body>
    </html>
  );
}
