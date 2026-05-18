import Link from "next/link";
import { useTranslations } from "next-intl";
import ToggleMenu from "./togglemenu";
export default function NavMenu() {
  const t = useTranslations("Navigation");
  return (
    <nav className="h-full w-dvw">
      <ul className="mediaConditional h-full w-full flex flex-row-reverse max-sm:flex-col-reverse max-sm:justify-evenly max-sm:items-stretch justify-center sm:justify-between items-center">
        <li className="aboutLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-about lg:mr-60 sm:font-semibold">
          <Link
            href="/about"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-about"
          >
            {t("about")}
          </Link>
        </li>
        <li className="blogLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-blogposts">
          <Link
            href="/items?category=blogposts"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-blogposts"
          >
            {t("blog")}
          </Link>
        </li>
        <li className="vinylsLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-vinyls">
          <Link
            href="/items?category=vinyls"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-vinyls"
          >
            {t("vinylsShort")}
          </Link>
        </li>
        <li className="interiorLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-interior">
          <Link
            href="/items?category=interior"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:pl-7 max-sm:font-display max-sm:text-8xl max-sm:text-on-interior"
          >
            {t("interior")}
          </Link>
        </li>
        <li className="itemsLink desktopHandler overflow-hidden max-sm:flex-1 max-sm:bg-items lg:ml-60 sm:font-semibold">
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
