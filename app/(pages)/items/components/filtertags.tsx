"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BiPlus } from "react-icons/bi";

const ALL = ["vinyls", "interior", "blogposts"];

export default function FilterTags({
  labels,
}: {
  labels: { interior: string; vinyls: string; blogposts: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.getAll("category");
  const active = raw.length === 0 ? ALL : raw;
  const isAll = active.length === ALL.length;
  const filterTagStyle =
    "border font-label text-sm px-2 max-sm:text-xs flex gap-1 items-center";

  function handleFilter(tag: string) {
    const isActive = active.includes(tag);
    let next: string[];

    if (isAll) {
      next = ALL.filter((t) => t !== tag);
    } else if (isActive) {
      next = active.filter((t) => t !== tag);
    } else {
      next = [...active, tag];
    }

    if (next.length === 0 || next.length === ALL.length) {
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
