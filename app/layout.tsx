import type { Metadata } from "next";
import "./globals.css";
import LangPlayerButton from "./components/menu/lang-playerbutton";

export const metadata: Metadata = {
  title: "Mother Interior",
  description:
    "Mother Interior is a Copenhagen based store for vintage furniture and vinyl records. We are passionate about curating a unique collection of timeless pieces that blend style and functionality. Our carefully selected inventory includes mid-century modern furniture, retro home decor, and a diverse range of vinyl records spanning various genres. Whether you're a design enthusiast or a music lover, Mother Interior offers a curated selection that celebrates the beauty of the past while adding character to your living space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-hidden">
        <header className="absolute w-screen top-0 z-50">
          <LangPlayerButton />
        </header>
        {children}
      </body>
    </html>
  );
}
