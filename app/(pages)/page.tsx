import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CompositeLogo from "../components/compositelogo";
import SimpleDropdown from "../components/simpledropdown";
import LineDrawer from "../components/homepage/linedrawer";

export default function Home() {
  const t = useTranslations("HomePage");
  const nav = useTranslations("Navigation");

  return (
    <>
      <div className="h-screen w-screen absolute frontPage">
        <Image
          className="h-full object-cover -z-10"
          src="/media/heroimg-placeholder.jpg"
          alt={t("heroImageAlt")}
          priority
          fill
        ></Image>
      </div>
      {/* BOUNDING BOX OVERLAY FOR HERO IMAGE - DESKTOP ONLY */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
        style={{
          width: "max(100vw, calc(100vh * 637 / 478))",
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
      <div className="absolute w-screen h-screen sm:hidden bg-mi-neutral-200/68 mix-blend-lighten -z-10"></div>
      <div className="max-sm:h-screen  z-10 flex flex-col max-sm:items-center max-sm:justify-center sm:w-fit sm:ml-10 sm:mt-10 sm:text-mi-neutral-50">
        <div className="max-sm:absolute max-sm:top-20 flex flex-col items-center">
          <CompositeLogo
            className="w-22 h-22 mb-1"
            fillAll="sm:fill-mi-yellow-300 fill-mi-blue-700"
          ></CompositeLogo>
          <h1 className="text-xl font-display">{t("brandName")}</h1>
        </div>
        <nav>
          <ul className="flex flex-col mt-5 gap-5 max-sm:items-center items-start font-semibold">
            <SimpleDropdown
              topClassName="sm:hidden"
              ulClassName="gap-5 items-center mt-5 font-normal"
              title={nav("items")}
              titleURL="/items"
              options={[
                {
                  label: nav("interior"),
                  url: "/items?category=interior",
                },
                { label: nav("vinyls"), url: "/items?category=vinyls" },
                { label: nav("blog"), url: "/items?category=blogposts" },
              ]}
              id="items-dropdown"
            ></SimpleDropdown>
            <Link
              href="/items"
              className="max-sm:hidden dskHeroLink allItems sm:pr-5"
            >
              {nav("allItems")}
            </Link>
            <Link
              href="/items?category=vinyls"
              className="max-sm:hidden dskHeroLink Vinyls sm:pr-5"
              id="vinyls-link"
            >
              {nav("vinyls")}
            </Link>
            <Link
              href="/items?category=interior"
              className="max-sm:hidden dskHeroLink Interior sm:pr-5"
              id="interior-link"
            >
              {nav("interior")}
            </Link>
            <Link
              href="/items?category=blogposts"
              className="max-sm:hidden dskHeroLink sm:pr-5"
            >
              {nav("blog")}
            </Link>
            <Link href="/about" className="dskHeroLink sm:pr-5">
              {nav("about")}
            </Link>
          </ul>
        </nav>
      </div>
      <LineDrawer />
    </>
  );
}
