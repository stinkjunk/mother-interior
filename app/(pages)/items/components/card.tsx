export default function Card({
  category,
  title,
  thumbnail,
  pinned,
  price,
  isSold,
  priority,
  className = "",
}: {
  category: "vinyl" | "interior" | "blogpost";
  title: string;
  thumbnail: string;
  pinned: boolean;
  price?: number;
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

  return (
    <div
      className={`itemCard ${categoryStyle} ${className} bg-background text-foreground`}
    >
      <p className="font-medium">{title}</p>
    </div>
  );
}
