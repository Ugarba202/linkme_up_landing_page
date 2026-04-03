import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://linkmeup.app"),
  title: "LinkMeUp — One QR Code. All Your Socials. Forever.",
  description: "Connect your social media. Generate a permanent QR code. Share it anywhere. Update anytime — your QR never changes.",
  keywords: ["QR code", "social media", "link in bio", "LinkMeUp", "networking"],
  authors: [{ name: "LinkMeUp Team" }],
  openGraph: {
    title: "LinkMeUp — One QR Code. All Your Socials. Forever.",
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>
          {children}
          <Toaster />
          <Sonner position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
