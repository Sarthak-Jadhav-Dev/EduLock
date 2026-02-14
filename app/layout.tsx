
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Corrected import (Geist_Mono import was correct)
import "./globals.css";
// import { MinimalFooter } from "@/components/ui/minimal-footer"; (Removing unused import)
import { FooterWrapper } from "@/components/layout/FooterWrapper";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "EduLock — Secure Educational Content Distribution",
  description: "EduLock prevents unauthorized access, sharing, and piracy of digital academic materials with AES-256 encryption and role-based access control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
