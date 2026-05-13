import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import LangPlayerButton from "./components/menu/lang-playerbutton";
import { NextIntlClientProvider } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html className="h-full antialiased" lang={locale}>
      <body className="min-h-full flex flex-col overflow-hidden">
        <NextIntlClientProvider>
          <header className="absolute w-screen top-0 z-50">
            <LangPlayerButton />
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
