import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getContext } from "@/lib/server-context";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin", "latin-ext", "cyrillic-ext"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "cyrillic"] });

export const metadata: Metadata = {
  title: "mooda — Bakının butikləri bir yerdə",
  description: "Bakının seçilmiş butiklərindən orijinal geyim, ayaqqabı və çantalar.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { lang } = await getContext();
  return (
    <html lang={lang} className={`${jakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
