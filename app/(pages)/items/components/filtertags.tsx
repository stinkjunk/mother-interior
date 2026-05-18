"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BiPlus } from "react-icons/bi";

export default function FilterTags({
  labels,
}: {
  labels: { interior: string; vinyls: string; blogposts: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.getAll("category");
  const filterTagStyle =
    "border font-label text-sm px-2 max-sm:text-xs flex gap-1 items-center";

  function handleFilter(tag: string) {
    const next = active.includes(tag)
      ? active.filter((t) => t !== tag)
      : [...active, tag];

    if (next.length === 0) {
      router.push("/items", { scroll: false });
    } else {
      const params = next.map((c) => `category=${c}`).join("&");
      router.push(`/items?${params}`, { scroll: false });
    }
  }

  return (
    <div className="w-full flex my-auto gap-3">
      <button
        className={`filterTag interiorFilter ${filterTagStyle} ${!active.includes("interior") ? "disabled" : ""}`}
        onClick={() => handleFilter("interior")}
      >
        <BiPlus />
        {labels.interior}
      </button>
      <button
        className={`filterTag vinylsFilter ${filterTagStyle} ${!active.includes("vinyls") ? "disabled" : ""}`}
        onClick={() => handleFilter("vinyls")}
      >
        <BiPlus />
        {labels.vinyls}
      </button>
      <button
        className={`filterTag blogFilter ${filterTagStyle} ${!active.includes("blogposts") ? "disabled" : ""}`}
        onClick={() => handleFilter("blogposts")}
      >
        <BiPlus />
        {labels.blogposts}
      </button>
    </div>
  );
}
