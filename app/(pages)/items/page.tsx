import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import searchParams from "next/navigation";
// http://localhost:3000/items?category=vinyls&category=interior&category=blogposts

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ItemsPage");
  return {
    title: t("title"),
  };
}

export default async function Items({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  console.log(category);
  const categories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  return (
    <div
      className={`itemsPage ${categories.includes("interior") ? "interiorFilter " : ""}${categories.includes("vinyls") ? "vinylsFilter " : ""}${categories.includes("blogposts") ? "blogFilter " : ""} scrollablePage h-[calc(100dvh-var(--headerheight))]`}
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-display">Items Page</h1>
      </div>
      <div className="h-[500dvh]">{/* spacer div for scrollin'! */}</div>
    </div>
  );
}
