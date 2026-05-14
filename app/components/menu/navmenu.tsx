import Link from "next/link";
import { useTranslations } from "next-intl";
import ToggleMenu from "./togglemenu";
export default function NavMenu() {
  const t = useTranslations("Navigation");
  return (
    <nav className="h-full">
      <ul className="h-full w-full flex max-sm:flex-col max-sm:justify-evenly max-sm:items-stretch justify-center sm:gap-20 md:gap-40 lg:gap-60 items-center mediaConditional sm:font-semibold mediaConditional">
        <li className="itemsLink desktopHandler max-sm:flex-1 max-sm:bg-items max-sm:overflow-hidden">
          <Link
            href="/items"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:text-on-items max-sm:font-display max-sm:text-8xl max-sm:pl-7"
          >
            {t("items")}
          </Link>
        </li>
        <li className="interiorLink flex-1 bg-interior overflow-hidden">
          <Link
            href="/items?category=interior"
            className="flex h-full w-full items-center  text-on-interior font-display text-8xl pl-7"
          >
            {t("interior")}
          </Link>
        </li>
        <li className="vinylsLink flex-1 bg-vinyls overflow-hidden">
          <Link
            className="flex h-full w-full items-center  text-on-vinyls font-display text-8xl pl-7"
            href="/items?category=vinyls"
          >
            {t("vinyls")}
          </Link>
        </li>
        <li className="blogLink flex-1 bg-blogposts overflow-hidden">
          <Link
            href="/items?category=blogposts"
            className="flex h-full w-full items-center  text-on-blogposts font-display text-8xl pl-7"
          >
            {t("blog")}
          </Link>
        </li>
        <li className="aboutLink desktopHandler max-sm:flex-1 max-sm:bg-about max-sm:overflow-hidden">
          <Link
            href="/about"
            className="max-sm:flex max-sm:h-full max-sm:w-full max-sm:items-center max-sm:text-on-about max-sm:font-display max-sm:text-8xl max-sm:pl-7"
          >
            {t("about")}
          </Link>
        </li>
      </ul>
      <ToggleMenu />
    </nav>
  );
}
