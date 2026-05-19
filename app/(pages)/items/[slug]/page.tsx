import { Metadata } from "next";
import { createClient } from "contentful";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Images from "./components/Images";
import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";

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

    console.log("Formateret tracklist: ", tracklist);

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

  //   console.log("Fetched item:", item);

  return <Body item={item} />;
}

function Body({ item }: { item: any }) {
  const contentType = item.contentType;

  const isProduct = contentType === "vinyls" || contentType === "interior";
  const pageClass = `itemPage  ${isProduct ? `productPage ${contentType}Page` : "blogPage"}`;

  const pageLocale = useLocale();
  const itemLocale = item.locale || "en";
  const isOtherLocale = pageLocale !== itemLocale;

  const formattedDate = new Date(item.createdAt).toLocaleDateString(
    pageLocale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const t = useTranslations("ItemPage");

  const [priceInt, priceDec] =
    item.price_dkk !== undefined
      ? item.price_dkk.toFixed(2).replace(".", ",").split(",")
      : ["", ""];
  const formattedPriceInt = priceInt.replace(/(\d{4})(?=\d)/g, "$1.");

  return (
    <div className={`itemsPage itemPage ${pageClass} scrollablePage`}>
      <main className="pb-5">
        <div className="w-full pt-10 overflow-hidden">
          <p className="w-full flex font-label text-sm max-sm:text-xs px-5 sm:px-25">
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
        <div className="md:grid md:grid-cols-[3fr_4fr] gap-10 mt-5 md:mr-25">
          <Images
            urls={item.media ?? [item.thumbnail]}
            title={item.title}
            imageX={t("imageX")}
            thumbnailX={t("thumbnailX")}
            ofX={t("ofX")}
            priceInt={formattedPriceInt}
            priceDec={priceDec}
            isSold={item.isSold}
            soldLabel={t("soldLabel")}
          ></Images>
          <div className="max-sm:px-5 max-md:px-15 md:px-0 md:mr-25 max-md:mt-10 ">
            <h1 className="text-3xl font-medium mb-3">{item.title}</h1>
            <p className="text-sm font-label font-light">
              {t("postedOn")} {formattedDate}
            </p>
            {isOtherLocale && (
              <p className="absolute text-xs font-label inline-flex items-center gap-1 opacity-70 mt-1">
                <HiOutlineInformationCircle /> {t("otherLocaleNotice")}
              </p>
            )}
          </div>
        </div>
        <div className="px-5 sm:px-15 md:px-25 mt-20">
          {contentType === "vinyls" && item.deezerData != undefined ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-row w-full justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.deezerData.cover.standard}
                    alt={`${item.deezerData.title} cover`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {item.deezerData.title}
                    </p>
                    <p className="text-sm opacity-70">
                      {item.deezerData.artist}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <p className="font-medium text-sm">
                    {t("vinyls.tracklist.title")}
                  </p>
                  <p className="text-sm opacity-70">
                    {t("vinyls.tracklist.deezerInfo")}{" "}
                    <Link
                      href={item.deezerData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Deezer
                    </Link>
                  </p>
                </div>
              </div>
              <div className="">
                {item.deezerData.tracklist.map((track: any, index: number) => (
                  <p
                    key={index}
                    className="flex justify-between text-sm opacity-70"
                  >
                    <span>
                      {track.position}. {track.title}
                    </span>
                    <span>
                      {Math.floor(track.duration / 60)}:
                      {String(track.duration % 60).padStart(2, "0")}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
