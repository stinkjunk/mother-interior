import ImageLoader from "@/app/components/imageloader";
import Link from "next/link";
import { MdPushPin } from "react-icons/md";

export default function Card({
  category,
  title,
  thumbnail,
  pinned,
  isSold,
  priority,
  className = "",
  href,
}: {
  category: "vinyl" | "interior" | "blogpost";
  title: string;
  thumbnail: string;
  pinned: boolean;
  isSold?: boolean;
  priority?: "horizontal" | "vertical";
  className?: string;
  href: string;
}) {
  const categoryStyle =
    category === "vinyl"
      ? "vinylStyling"
      : category === "interior"
        ? "interiorStyling"
        : "blogpostStyling";
  const priorityStyle =
    priority === "horizontal"
      ? "col-span-2 h-40 sm:h-60"
      : priority === "vertical"
        ? "row-span-2 h-80 sm:h-120"
        : "h-40 sm:h-60";

  return (
    <Link
      href={href}
      className={`itemCard ${categoryStyle} relative block ${priorityStyle} ${className}`}
    >
      <div
        className={`bg-background text-foreground flex h-full w-full flex-col`}
      >
        {pinned && (
          <MdPushPin className="absolute top-2 right-2 z-5 fill-foreground w-9 h-9 rotate-45 bg-background p-1 rounded-full" />
        )}
        {isSold && (
          <div className="soldContainer absolute h-full w-full px-2 py-1 text-xs font-bold flex items-center justify-center pb-8 sm:pb-10 z-5">
            <p
              className={`font-label text-[8cqw] md:text-[5cqw] ${category === "vinyl" ? "text-mi-mint-100" : ""}`}
            >
              SOLD
            </p>
          </div>
        )}
        <ImageLoader
          src={thumbnail}
          alt={title}
          className={`object-cover flex-1 w-full overflow-hidden p-1.5 sm:p-4 ${isSold ? "opacity-40" : ""}`}
          loaderClasses="bg-background z-10"
          loaderThingClasses="scale-75"
          width={priority === "horizontal" ? 300 : 150}
          height={priority === "vertical" ? 300 : 150}
        />
        <p className="font-medium px-1.5 h-8 sm:px-4 sm:h-10 z-5 truncate">
          {title}
        </p>
      </div>
    </Link>
  );
}
