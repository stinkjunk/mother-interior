import Link from "next/link";
import links from "@/lib/links.json";
import type { RichTranslationValues } from "next-intl";

export const resolvers: RichTranslationValues = {
  linkOwnerInsta: (chunks) => (
    <Link href={links.ownerInstagram} target="_blank">
      {chunks}
    </Link>
  ),
  linkMiInsta: (chunks) => (
    <Link href={links.miInstagram} target="_blank">
      {chunks}
    </Link>
  ),
  linkStoreLocation: (chunks) => (
    <Link href={links.storeLocation.maps} target="_blank">
      {chunks}
    </Link>
  ),
  strong: (chunks) => <strong>{chunks}</strong>,
  br: () => <br />,
};
