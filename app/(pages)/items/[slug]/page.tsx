import { Metadata } from "next";
import { createClient } from "contentful";

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

  console.log("Fetched item:", content.title);
  console.log("Item Type:", contentType);
  console.log("Product? ", isProduct);
  console.log("content:", content);
  console.log("Metadata:", metadata);
  return <div className={`itemsPage itemPage ${""} scrollablePage`}>item</div>;
}
