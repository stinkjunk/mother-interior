import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "contentful";
import Card from "./components/card";
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
  // params
  const { category } = await searchParams;
  const categories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  // contentful:
  const fetchThese = [];
  if (categories.length !== 0) {
    if (categories.includes("vinyls")) fetchThese.push("vinyls");
    if (categories.includes("interior")) fetchThese.push("post");
    // da jeg lavede denne content type, kaldte jeg den for "post" i contentful,
    // indtil jeg fandt ud af, at flere content types ville passe projektet bedre;
    // men efter omnavngivingen ændrede contently ikke API identifier lol!
    if (categories.includes("blogposts")) fetchThese.push("blogpost");
  } else {
    fetchThese.push("vinyls", "post", "blogpost");
  }
  const selectThese = [
    "sys.id",
    "sys.createdAt",
    "sys.contentType",
    "fields.pinned",
    "fields.title",
  ] as any;
  const selectProduct = [
    ...selectThese,
    "fields.media",
    "fields.price_dkk",
    "fields.isSold",
  ] as any;
  const selectBlogpost = [...selectThese, "fields.thumbnail"] as any;

  const selectMap: Record<string, any> = {
    vinyls: selectProduct,
    post: selectProduct,
    blogpost: selectBlogpost,
  };

  fetchThese.map((cat) =>
    client.getEntries({ content_type: cat, select: selectMap[cat] })
  );

  const results = await Promise.all(
    fetchThese.map((cat) =>
      client.getEntries({
        content_type: cat,
        select: selectMap[cat],
      })
    )
  );

  const allItems = results.flatMap((r) => r.items) as any[];
  allItems.sort((a, b) => {
    const aIsDupe =
      (a.fields.title as string)?.toLowerCase().includes("duplicate") ||
      (a.fields.title as string)?.toLowerCase().includes("duplikeret");
    const bIsDupe =
      (b.fields.title as string)?.toLowerCase().includes("duplicate") ||
      (b.fields.title as string)?.toLowerCase().includes("duplikeret");
    const aIsPinned = a.fields.pinned;
    const bIsPinned = b.fields.pinned;
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;

    if (aIsDupe && !bIsDupe) return 1;
    if (!aIsDupe && bIsDupe) return -1;
    return b.sys.createdAt.localeCompare(a.sys.createdAt);
    // date kører kun hvis to items er ens i forhold til pinned/dupe status.
  });

  const normalizedItems = allItems.map((item) => {
    const fields = item.fields as any;
    const rawMedia = fields.media?.[0] ?? fields.thumbnail ?? null;
    const mediaUrl = rawMedia?.fields?.file?.url;
    const contentType = item.sys.contentType.sys.id;
    const newContentType =
      contentType === "post"
        ? "interior"
        : contentType === "vinyls"
          ? "vinyl"
          : contentType;
    return {
      id: item.sys.id,
      contentType: newContentType,
      title: fields.title,
      thumbnail: mediaUrl ? `https:${mediaUrl}` : null,
      price: fields.price_dkk ?? null,
      isSold: fields.isSold ?? null,
      pinned: fields.pinned ?? false,
      createdAt: item.sys.createdAt,
    };
  });

  const withJSONThumbnails = await Promise.all(
    normalizedItems.map(async (item) => {
      const url = item.thumbnail;
      if (url?.endsWith(".json")) {
        const res = await fetch(url);
        const links: string[] = await res.json();
        return { ...item, thumbnail: links[0] ?? null };
      }
      return item;
    })
  );

  return <Body categories={categories} items={withJSONThumbnails} />;
}

function Body({ categories, items }: { categories?: string[]; items?: any[] }) {
  const t = useTranslations("ItemsPage");

  return (
    <div
      className={`itemsPage ${categories?.includes("interior") ? "interiorFilter " : ""}${categories?.includes("vinyls") ? "vinylsFilter " : ""}${categories?.includes("blogposts") ? "blogFilter " : ""}scrollablePage`}
    >
      <header className="h-20 max-sm:px-10 px-15 fixed bg-background w-full -translate-y-px z-10">
        <h1 className="text-3xl font-medium mt-5">{t("h1")}</h1>
        <div className="w-full flex"></div>
      </header>

      <main className="max-sm:px-10 px-15 mt-25">
        <div className="grid grid-cols-2 md:grid-cols-3">
          {items?.map((item) => (
            <div key={item.id}>
              <Card
                category={item.contentType}
                title={item.title}
                thumbnail={item.thumbnail}
                pinned={item.pinned}
                price={item.price}
                isSold={item.isSold}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
