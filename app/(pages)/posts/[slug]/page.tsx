import { Metadata } from "next";
import { createClient } from "contentful";
import { useTranslations, useLocale } from "next-intl";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Images from "./components/Images";
import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Tracklist from "./components/Tracklist";
import { resolvers } from "@/i8n/resolvers/resolvers";
import { number } from "motion";
import { div } from "motion/react-client";

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

    // console.log("Formateret tracklist: ", tracklist);

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
    description: fields.description ?? fields.content,
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
    height: fields.height as number | undefined,
    width: fields.width as number | undefined,
    length: fields.length as number | undefined,
    contentType,
    isProduct,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  };

  //   // console.log("Fetched item:", item);

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
    <div className={`postsPage itemPage ${pageClass} scrollablePage`}>
      <main className="pb-20">
        <div className="w-full pt-10 overflow-hidden">
          <p className="w-full flex font-label text-sm max-sm:text-xs px-5 sm:px-25">
            <Link
              href={`/posts?category=${isProduct ? contentType : "blogposts"}`}
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
        <div className="md:grid md:grid-cols-[5fr_3fr] lg:grid-cols-[3fr_4fr] md:grid-rows-[auto_1fr] mt-5 md:mr-25">
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
            className="row-span-2"
          ></Images>
          <h1 className="text-3xl font-medium mb-3 md:row-start-1 md:col-start-1 md:col-span-2 max-sm:px-5 max-md:px-15 md:px-0 md:mx-25 max-md:mt-10 lg:ml-10 lg:mr-10 lg:col-start-2 lg:col-span-1">
            {item.title}
          </h1>
          <div className="md:ml-10 max-sm:px-5 max-md:px-15 md:px-0 md:mr-10  md:col-start-2 md; lg:col-start-2 lg:row-start-2">
            <p className="text-sm font-label font-light">
              {t("postedOn")} {formattedDate}
            </p>
            {isOtherLocale && (
              <p className="absolute text-xs font-label inline-flex items-center gap-1 opacity-70 mt-1">
                <HiOutlineInformationCircle />{" "}
                {isProduct
                  ? t("otherLocaleNotice")
                  : t("otherLocaleBlogNotice")}
              </p>
            )}
            {contentType === "vinyls" && item.deezerData != undefined ? (
              <Tracklist
                tracks={item.deezerData}
                tracklistTitle={t("vinyls.tracklist.title")}
                deezerInfo={t("vinyls.tracklist.deezerInfo")}
                openTrackListLabel={t("vinyls.tracklist.openTrackListLabel")}
                closeTrackListLabel={t("vinyls.tracklist.closeTrackListLabel")}
              ></Tracklist>
            ) : null}
            {contentType === "interior" &&
              (item.height || item.width || item.length) && (
                <div className="mt-10">
                  <h2 className="text-xl font-medium">
                    {t("interior.dimensions.title")}
                  </h2>
                  <div className="w-full h2 flex mt-1 justify-between md:flex-col lg:flex-row sm:pr-40 md:pr-0 md:gap-5 lg:gap-0 lg:pr-20">
                    {item.height && (
                      <div>
                        <p>
                          <strong>{t("interior.dimensions.height")}:</strong>
                        </p>
                        <p>{item.height} cm</p>
                      </div>
                    )}
                    {item.width && (
                      <div>
                        <p>
                          <strong>{t("interior.dimensions.width")}:</strong>
                        </p>
                        <p>{item.width} cm</p>
                      </div>
                    )}
                    {item.length && (
                      <div>
                        <p>
                          <strong>{t("interior.dimensions.length")}:</strong>
                        </p>
                        <p>{item.length} cm</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
          <div className="max-sm:px-5 max-md:px-15 md:px-0 md:mr-25 max-md:mt-10 col-start-2 "></div>
        </div>
        <div className="px-10 md:px-35 lg:px-40 mt-10 md:mt-20 textClass">
          {item.description &&
            documentToReactComponents(item.description, {
              renderNode: {
                paragraph: (node, children) => (
                  <p className="mb-5 last:mb-0">{children}</p>
                ),
                hyperlink: (node, children) => {
                  const url = node.data.uri;
                  const isExternal = url.startsWith("http");
                  return (
                    <Link
                      href={url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="underline"
                    >
                      {children}
                    </Link>
                  );
                },
              },
            })}
          {!item.isSold && isProduct && (
            <>
              <h2 className="text-xl font-medium">{t("howToBuy.h2")}</h2>
              <p className="mt-5">{t("howToBuy.description")}</p>
              {item.instaLink && (
                <Link
                  href={item.instaLink}
                  className="mt-5 block"
                  target="_blank"
                >
                  {t("seeOnInsta")}
                </Link>
              )}
              <p className="mt-5">{t.rich("howToBuy.moreInfo", resolvers)}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
