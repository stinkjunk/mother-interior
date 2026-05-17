import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "contentful";
// http://localhost:3000/items?category=vinyls&category=interior&category=blogposts

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ItemsPage");
  return {
    title: t("title"),
  };
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default async function Items({
  //få al data i dette lag
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  console.log("Raw category from search params:", category);
  console.log(category);
  const categories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  // contentful:
  const fetchThese: string[] = [];
  if (categories.length !== 0) {
    if (categories.includes("vinyls")) fetchThese.push("vinyls");
    if (categories.includes("interior")) fetchThese.push("post");
    // da jeg lavede denne content type, kaldte jeg den for "post" i contentful,
    // indtil jeg fandt ud af, at flere content types ville passe projektet bedre;
    // men efter omnavngivingen ændrede contently ikke API identifier lol!
    if (categories.includes("blogposts")) fetchThese.push("blogpost");
  }
  console.log(fetchThese);

  const results =
    categories.length === 0 || categories.length === 3
      ? await client.getEntries({})
      : await Promise.all(
          fetchThese.map((cat) => client.getEntries({ content_type: cat }))
        );

  console.log("Resultater: ", results);
  const allItems = Array.isArray(results)
    ? results.flatMap((r) => r.items)
    : results.items;

  allItems.forEach((item) => {
    const title = item.fields.title;
    if (typeof title === "string") {
      const lowerTitle = title.toLowerCase();
      if (
        lowerTitle.includes("duplicate") ||
        lowerTitle.includes("duplikeret")
      ) {
        console.log("dupe fundet:", title);
      }
    }
  });

  return <Body categories={categories} />;
}

function Body({ categories }: { categories?: string[] }) {
  const t = useTranslations("ItemsPage");
  return (
    <div
      className={`itemsPage ${categories?.includes("interior") ? "interiorFilter " : ""}${categories?.includes("vinyls") ? "vinylsFilter " : ""}${categories?.includes("blogposts") ? "blogFilter " : ""}scrollablePage`}
    >
      <header className="itemsHeader max-sm:px-10">
        <h1 className="text-3xl font-medium mb-5 max-sm:mt-5">{t("h1")}</h1>
        <div className="w-full flex"></div>
      </header>
      <main className="itemsChunk"></main>
    </div>
  );
}
