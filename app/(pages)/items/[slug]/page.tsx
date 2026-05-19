import { Metadata } from "next";
import { createClient } from "contentful";
import { useTranslations } from "next-intl";
import Link from "next/link";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [slugPart] = slug.split("--");
  const title = slugPart.replace(/-/g, " ").replace(/!HYPH/g, "-");
  return {
    title: `${title} | Mother Interior`,
  };
}

export default async function Item({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = slug.split("--").at(-1)!;
  const entry = await client.getEntry(id);
  const fields = entry.fields as any;

  const resolveMedia = async (mediaArray: any[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const asset of mediaArray) {
      const fileUrl: string = asset.fields.file.url;
      const contentType: string = asset.fields.file.contentType;
      if (contentType === "application/json") {
        const res = await fetch(`https:${fileUrl}`);
        const json = await res.json();
        urls.push(
          ...json.map((url: string) =>
            url.startsWith("http") ? url : `https:${url}`
          )
        );
      } else {
        urls.push(`https:${fileUrl}`);
      }
    }
    return urls;
  };

  const getDeezerData = async (deezerAPICall: string) => {
    const res = await fetch(deezerAPICall, { next: { revalidate: 86400 } });
    const data = await res.json();

    // console.log("Rå deezer data: ", data);

    const cover = {
      standard: data.cover,
      sm: data.cover_small,
      md: data.cover_medium,
      lg: data.cover_big,
      xl: data.cover_xl,
    };

    const link = data.link;
    const artist = data.artist.name;
    const title = data.title;
    const duration = data.duration;

    const tracklistRes = await fetch(data.tracklist, {
      next: { revalidate: 86400 },
    });
    const tracklistData = await tracklistRes.json();

    // console.log("Rå tracklist data: ", tracklistData);

    const tracklist = tracklistData.data.map((track: any) => ({
      title: track.title,
      duration: track.duration,
      position: track.track_position,
      link: track.link,
    }));

    return { link, artist, title, duration, cover, tracklist };
  };

  const contentTypeMap: Record<string, string> = { post: "interior" };
  const contentType =
    contentTypeMap[entry.sys.contentType.sys.id] ??
    entry.sys.contentType.sys.id;

  const isProduct = contentType === "vinyls" || contentType === "interior";

  // console.log("raw contentType:", entry.sys.contentType.sys.id);
  // console.log("resolved contentType:", contentType);
  // console.log("isProduct:", isProduct);

  const item = {
    title: fields.title as string,
    description: fields.description,
    media: isProduct ? await resolveMedia(fields.media as any[]) : undefined,
    thumbnail: !isProduct
      ? `https:${fields.thumbnail.fields.file.url}`
      : undefined,
    instaLink: fields.instaLink as string | undefined,
    price_dkk: fields.price_dkk as number | undefined,
    deezerData:
      contentType === "vinyls" && fields.deezerAPICall
        ? await getDeezerData(fields.deezerAPICall)
        : undefined,
    isSold: fields.isSold as boolean,
    tags: fields.tags as string[],
    locale: fields.locale as string,
    pinned: fields.pinned as boolean,
    contentType,
    isProduct,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  };

  console.log("Fetched item:", item);

  return <Body item={item} />;
}

function Body({ item }: { item: any }) {
  const contentType = item.contentType;

  const isProduct = contentType === "vinyls" || contentType === "interior";
  const pageClass = `itemPage  ${isProduct ? `productPage ${contentType}Page` : "blogPage"}`;

  // console.log("Fetched item:", item.title);
  // console.log("Item Type:", contentType);
  // console.log("Product? ", isProduct);
  // console.log("content:", item);
  // console.log("Page Class:", pageClass);

  const t = useTranslations("ItemPage");
  return (
    <div className={`itemsPage itemPage ${pageClass} scrollablePage`}>
      <main className="pb-5">
        <div className="w-full px-5 pt-10 overflow-hidden">
          <p className="w-full flex font-label text-sm max-sm:text-xs">
            <Link
              href={`/items?category=${isProduct ? contentType : "blogposts"}`}
              className="filterTag border px-2 mr-2 flex gap-1 items-center"
            >
              {contentType === "vinyls"
                ? t("categories.vinylsShort")
                : contentType === "interior"
                  ? t("categories.interior")
                  : t("categories.blogpostsShort")}
            </Link>
            <span className="flex-1 truncate">/ {item.title}</span>
          </p>
        </div>
      </main>
    </div>
  );
}
