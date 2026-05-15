import Link from "next/link";
import { useTranslations } from "next-intl";
import ToggleMenu from "./togglemenu";
export default function NavMenu() {
  const t = useTranslations("Navigation");
  return (
    <nav className="h-full w-dvw">
      <ul className="mediaConditional h-full w-full flex flex-row-reverse max-sm:flex-col-reverse max-sm:justify-evenly max-sm:items-stretch justify-center sm:gap-20 md:gap-40 lg:gap-60 items-center sm:font-semibold">
        <li className="aboutLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-about">
          <Link
            href="/about"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-about"
          >
            {t("about")}
          </Link>
        </li>
        <li className="blogLink overflow-hidden max-sm:flex-1 max-sm:bg-blogposts">
          <Link
            href="/items?category=blogposts"
            className="flex h-full w-full items-center pl-7 font-display text-8xl text-on-blogposts"
          >
            {t("blog")}
          </Link>
        </li>
        <li className="vinylsLink overflow-hidden max-sm:flex-1 max-sm:bg-vinyls">
          <Link
            href="/items?category=vinyls"
            className="flex h-full w-full items-center pl-7 font-display text-8xl text-on-vinyls"
          >
            {t("vinyls")}
          </Link>
        </li>
        <li className="interiorLink overflow-hidden max-sm:flex-1 max-sm:bg-interior">
          <Link
            href="/items?category=interior"
            className="flex h-full w-full items-center pl-7 font-display text-8xl text-on-interior"
          >
            {t("interior")}
          </Link>
        </li>
        <li className="itemsLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-items">
          <Link
            href="/items"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-items"
          >
            {t("items")}
          </Link>
        </li>
      </ul>
      <ToggleMenu />
    </nav>
  );
}
