import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  return {
    title: t("title"),
  };
}

export default function About() {
  return (
    <div className="flex h-screen items-center justify-center sm:pt-20 aboutPage">
      <h1 className="text-2xl font-display">About Page</h1>
    </div>
  );
}
