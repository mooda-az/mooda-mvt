import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { t } from "@/lib/i18n";
import { getContext } from "@/lib/server-context";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin", "latin-ext", "cyrillic-ext"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "cyrillic"] });

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getContext();
  const d = t(lang);
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f9f8f6",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { lang } = await getContext();
  return (
    <html lang={lang} className={`${jakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded bg-canvas px-4 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-float)] transition-transform focus-visible:translate-y-0"
        >
          {t(lang).skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
