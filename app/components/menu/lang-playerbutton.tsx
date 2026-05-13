import { FaPlay } from "react-icons/fa6";
import { Menu } from "@base-ui/react/menu";
import { useTranslations } from "next-intl";

export default function LangPlayerButton() {
  const t = useTranslations("Menu");

  return (
    <div className="flex gap-2 font-label absolute top-5 right-5">
      <Menu.Root>
        <Menu.Trigger
          className="altColor cursor-pointer"
          aria-label={t("LangSelect.openMenuAriaLabel")}
        >
          {t("LangSelect.currentLocale")}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup className="menuPopup">
              <Menu.Item
                className="cursor-pointer font-label altColor mt-2"
                aria-label={t("LangSelect.otherLocaleAriaLabel")}
              >
                {t("LangSelect.otherLocale")}
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className="cursor-pointer"
          aria-label={t("Player.openWidgetAriaLabel")}
        >
          <FaPlay className="altColor"></FaPlay>
        </Menu.Trigger>
      </Menu.Root>
    </div>
  );
}
