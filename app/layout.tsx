import React from "react";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Huzaifa Computers - Premium Printers in Lahore",
  description:
    "Premium printer solutions for your business. Shop quality LaserJet, Inkjet, and Dot Matrix printers at Huzaifa Computers, Hafeez Centre, Lahore.",
  appleWebApp: {
    title: "HC",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"
          }`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${
                process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"
              }');
            `,
          }}
        ></script>
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
