import Link from "next/link";
import { useTranslations } from "next-intl";
export default function NavMenu() {
  const t = useTranslations();
  return (
    <nav className="h-full">
      <ul className="h-full flex gap-20 md:gap-40 lg:gap-60 items-center justify-center font-semibold">
        <li className="itemsLink">
          <Link href="/items">{t("HomePage.nav.items")}</Link>
        </li>
        <li className="aboutLink">
          <Link href="/about">{t("HomePage.nav.about")}</Link>
        </li>
      </ul>
    </nav>
  );
}
