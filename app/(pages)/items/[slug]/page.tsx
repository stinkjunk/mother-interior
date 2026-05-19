import { Metadata } from "next";
import { createClient } from "contentful";
import { useTranslations } from "next-intl";

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
  const id = slug.split("--").slice(-1)[0];
  const item = await client.getEntry(id);

  return <Body item={item} />;
}

function Body({ item }: { item: any }) {
  const metadata = item.sys;
  const content = item.fields;

  const contentType =
    metadata.contentType.sys.id === "post"
      ? "interior"
      : metadata.contentType.sys.id;
  // pga. akavet navngivning i contentful, se kommentar i items/page.tsx

  const isProduct = contentType === "vinyls" || contentType === "interior";
  const pageClass = `itemPage  ${isProduct ? `productPage ${contentType}Page` : "blogPage"}`;

  console.log("Fetched item:", content.title);
  console.log("Item Type:", contentType);
  console.log("Product? ", isProduct);
  console.log("content:", content);
  console.log("Metadata:", metadata);
  console.log("Page Class:", pageClass);

  const t = useTranslations("ItemPage");
  return (
    <div className={`itemsPage itemPage ${pageClass} scrollablePage`}>
      <main className="pb-5">
        <div className="w-full px-5 pt-10 overflow-hidden">
          <p className="w-full flex font-label text-sm max-sm:text-xs">
            <span className="filterTag border px-2 mr-2 flex gap-1 items-center">
              {contentType === "vinyls"
                ? t("categories.vinylsShort")
                : contentType === "interior"
                  ? t("categories.interior")
                  : t("categories.blogpostsShort")}
            </span>
            <span className="flex-1 truncate">/ {content.title}</span>
          </p>
        </div>
      </main>
    </div>
  );
}
