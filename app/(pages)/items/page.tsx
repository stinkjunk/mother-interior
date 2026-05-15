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
    <div className="h-[calc(100dvh-var(--headerheight))] scrollablePage itemsPage">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-display">Items Page</h1>
      </div>
      <div className="h-[500dvh]">{/* spacer div for scrollin'! */}</div>
    </div>
  );
}
