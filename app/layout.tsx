import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-eril.vercel.app"),
  title: {
    template: "%s | Eriel Budiman",
    default: "Eriel Budiman — Software Engineer",
  },
  description:
    "Portfolio of Eriel Budiman, a Software Engineer focused on building clean, robust, and business-driven web applications.",
  keywords: [
    "Eriel Budiman",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Engineering Portfolio"
  ],
  authors: [{ name: "Eriel Budiman", url: "https://portfolio-eril.vercel.app" }],
  creator: "Eriel Budiman",
  openGraph: {
    title: "Eriel Budiman — Software Engineer",
    description:
      "Software Engineer focused on building clean, robust, and business-driven web applications.",
    url: "https://portfolio-eril.vercel.app",
    siteName: "Eriel Budiman Portfolio",
    images: [
      {
        url: "/api/og", // Ensure this endpoint exists or replace with a static image like /og-image.jpg
        width: 1200,
        height: 630,
        alt: "Eriel Budiman — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eriel Budiman — Software Engineer",
    description: "Software Engineer focused on building clean, robust, and business-driven web applications.",
    creator: "@erielbudiman",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { LanguageProvider } from "@/components/ui/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
