import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orangemedicaltransport.com"),
  title: "Orange Medical Transport | Non-Emergency Medical Transport",
  description:
    "Safe and efficient non-emergency medical transport across Central Florida. Ambulatory, wheelchair, and stretcher services. Book your ride today.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} min-h-screen font-sans antialiased`}>
        <Header />
        <main className="min-h-[50vh] sm:min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
