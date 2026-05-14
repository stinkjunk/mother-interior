import Link from "next/link";
import { useTranslations } from "next-intl";
import ToggleMenu from "./togglemenu";
export default function NavMenu() {
  const t = useTranslations("Navigation");
  return (
    <nav className="h-full">
      <ul className="h-full flex gap-20 md:gap-40 lg:gap-60 items-center justify-center font-semibold mediaConditional">
        <li className="itemsLink desktopHandler">
          <Link href="/items">{t("items")}</Link>
        </li>
        <li className="vinylsLink">
          <Link href="/items?category=vinyls">{t("vinyls")}</Link>
        </li>
        <li className="interiorLink">
          <Link href="/items?category=interior">{t("interior")}</Link>
        </li>
        <li className="blogLink">
          <Link href="/items?category=blogposts">{t("blog")}</Link>
        </li>
        <li className="aboutLink desktopHandler">
          <Link href="/about">{t("about")}</Link>
        </li>
      </ul>
      <ToggleMenu />
    </nav>
  );
}
