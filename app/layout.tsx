import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scooptopia | Filipino Street Food Catering",
  description:
    "Authentic Filipino street food catering for celebrations, weddings, and corporate events across the United States.",
  keywords: [
    "Filipino catering",
    "Filipino street food catering",
    "Filipino food catering USA",
    "Filipino event catering",
    "Filipino party catering",
    "Filipino wedding catering",
    "Filipino corporate catering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
