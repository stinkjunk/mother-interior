import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ItemsPage");
  return {
    title: t("title"),
  };
}

export default function Items() {
  return (
    <div className="flex h-screen items-center justify-center sm:pt-20 itemsPage">
      <h1 className="text-2xl font-display">Items Page</h1>
    </div>
  );
}
