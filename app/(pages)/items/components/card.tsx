import Image from "next/image";
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
}: {
  category: "vinyl" | "interior" | "blogpost";
  title: string;
  thumbnail: string;
  pinned: boolean;
  isSold?: boolean;
  priority?: "horizontal" | "vertical";
  className?: string;
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
    <Link href="#" className="relative">
      <div
        className={`itemCard ${categoryStyle} ${priorityStyle} ${className} bg-background text-foreground flex flex-col`}
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
        <Image
          src={thumbnail}
          alt={title}
          className={`object-cover flex-1 w-full overflow-hidden p-1.5 sm:p-4 ${isSold ? "opacity-40" : ""}`}
          width={150}
          height={150}
        />
        <p className="font-medium px-1.5 h-8 sm:px-4 sm:h-10 z-10 truncate">
          {title}
        </p>
      </div>
    </Link>
  );
}
