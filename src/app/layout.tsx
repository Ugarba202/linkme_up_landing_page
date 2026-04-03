import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://linkqr.app"),
  title: "LinkQR - One QR Code for All Your Socials",
  description: "Create a permanent QR code for all your social links. Update instantly, share forever.",
  keywords: ["QR code", "social media", "link in bio", "LinkQR", "networking"],
  authors: [{ name: "LinkQR Team" }],
  openGraph: {
    title: "LinkQR - One QR Code. All Your Links. Forever.",
    description: "Connect your social media. Generate a permanent QR. Share it anywhere.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-primary/20 selection:text-primary">
        <Providers>
          {children}
          <Toaster />
          <Sonner position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
