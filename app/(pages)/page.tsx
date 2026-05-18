import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CompositeLogo from "../components/compositelogo";
import LineDrawer from "../components/homepage/linedrawer";
import BgLoader from "../components/homepage/bgloader";

export default function Home() {
  const t = useTranslations("HomePage");
  const nav = useTranslations("Navigation");

  return (
    <main>
      <div className="absolute z-10 flex flex-col w-fit ml-10 mt-10 text-mi-neutral-50">
        <div className=" flex flex-col items-center">
          <CompositeLogo
            className="w-22 h-22 mb-1"
            fillAll="fill-mi-yellow-300"
          ></CompositeLogo>
          <h1 className="text-xl font-display">{t("brandName")}</h1>
        </div>
        <nav>
          <ul className="flex flex-col mt-5 gap-5 items-start font-semibold">
            <Link
              href="/items"
              className="dskHeroLink pr-2 sm:pr-5 max-sm:py-1 "
            >
              {nav("items")}
            </Link>
            <Link
              href="/items?category=interior"
              className="dskHeroLink Interior pr-2 sm:pr-5 max-sm:py-1 "
              id="interior-link"
            >
              {nav("interior")}
            </Link>
            <Link
              href="/items?category=vinyls"
              className="dskHeroLink Vinyls pr-2 sm:pr-5 max-sm:py-1 "
              id="vinyls-link"
            >
              {nav("vinyls")}
            </Link>
            <Link
              href="/items?category=blogposts"
              className="dskHeroLink pr-2 sm:pr-5 max-sm:py-1 "
            >
              {nav("blog")}
            </Link>
            <Link
              href="/about"
              className="dskHeroLink pr-2 sm:pr-5 max-sm:py-1 "
            >
              {nav("about")}
            </Link>
          </ul>
        </nav>
      </div>
      <div className="h-dvh w-dvw absolute frontPage">
        <BgLoader
          src="/media/heroimg-placeholder.jpg"
          alt={t("heroImageAlt")}
          className="object-cover"
        />
      </div>
      <div className="overflow-hidden absolute w-screen h-screen">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "max(100vw, calc(100dvh * 637 / 478))",
            aspectRatio: "637/ 478",
          }}
        >
          <Link
            href="/items?category=interior"
            aria-labelledby="interior-link"
            className="absolute bBox Interior"
            style={{ top: "50%", left: "45%", width: "60%", height: "50%" }}
          />
          <Link
            href="/items?category=vinyls"
            aria-labelledby="vinyls-link"
            className="absolute bBox Vinyls"
            style={{ top: "30%", left: "25%", width: "35%", height: "30%" }}
          />
        </div>
      </div>

      <LineDrawer />
    </main>
  );
}
