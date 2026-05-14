import Link from "next/link";
import { useTranslations } from "next-intl";
export default function NavMenu() {
  const t = useTranslations();
  return (
    <nav className="h-full">
      <ul className="h-full flex gap-20 md:gap-40 lg:gap-60 items-center justify-center font-semibold mediaConditional">
        <li className="itemsLink desktopHandler">
          <Link href="/items">{t("HomePage.nav.items")}</Link>
        </li>
        <li className="vinylsLink">
          <Link href="/items?category=vinyls">{t("HomePage.nav.vinyls")}</Link>
        </li>
        <li className="interiorLink">
          <Link href="/items?category=interior">
            {t("HomePage.nav.interior")}
          </Link>
        </li>
        <li className="blogLink">
          <Link href="/items?category=blogposts">{t("HomePage.nav.blog")}</Link>
        </li>
        <li className="aboutLink desktopHandler">
          <Link href="/about">{t("HomePage.nav.about")}</Link>
        </li>
      </ul>
    </nav>
  );
}
