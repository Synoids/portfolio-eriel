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
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased gradient-bg min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
