import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eriel Budiman — Portfolio",
  description:
    "Personal portfolio of Eriel Budiman, Information Systems student and junior web developer at UIN Raden Fatah Palembang. Specializing in modern web technologies including Next.js, PHP, and MySQL.",
  keywords: [
    "Eriel Budiman",
    "web developer",
    "portfolio",
    "Next.js",
    "Information Systems",
    "UIN Raden Fatah",
  ],
  authors: [{ name: "Eriel Budiman" }],
  openGraph: {
    title: "Eriel Budiman — Portfolio",
    description:
      "Information Systems Student & Junior Web Developer building clean, functional web applications.",
    url: "https://portfolio-eril.vercel.app", // Sesuaikan dengan URL asli nanti
    siteName: "Eriel Portfolio",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Eriel Budiman Portfolio Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eriel Budiman — Portfolio",
    description: "Information Systems Student & Junior Web Developer building clean, functional web applications.",
    images: ["/api/og"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased gradient-bg min-h-screen">
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
