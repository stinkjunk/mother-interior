import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import LangPlayerButton from "./components/menu/lang-playerbutton";
import { NextIntlClientProvider } from "next-intl";
import NavMenu from "./components/menu/navmenu";
import NavLogo from "./components/menu/navlogo";
import Link from "next/link";

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
  const homeLabel = locale === "en" ? "Home" : "Hjem";

  return (
    <html className="h-full antialiased" lang={locale}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <header className="bg-background w-dvw top-0 z-50 fixed">
            <div className="navMenu sm:h-20 max-sm:pt-26 max-sm:absolute h-dvh">
              <NavLogo
                className="pl-5 max-sm:pt-5 absolute top-0 left-0 h-20 flex items-center z-50 navLogoLink"
                ariaLabel={homeLabel}
              />
              <NavMenu />
            </div>
            <LangPlayerButton />
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
