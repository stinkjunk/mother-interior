import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { RichTranslationValues } from "next-intl";
import Image from "next/image";

import { Metadata } from "next";
import links from "@/lib/links.json";
import Link from "next/link";

const resolvers: RichTranslationValues = {
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  return {
    title: t("title"),
  };
}

export default function About() {
  const t = useTranslations("AboutPage.about");

  return (
    <div className="aboutPage scrollablePage overflow-y-scroll pb-20 flex flex-col items-center">
      <div className="w-7/10 sm:w-2/3 lg:w-1/2 sm:relative">
        <div className="max-sm:w-full max-sm:my-10 sm:absolute right-0 top-0 w-40 aspect-1">
          <div className="max-sm:w-full max-sm:aspect-1 w-0.4 sm:fixed h-40 40">
            <Image
              src="/media/owner.jpg"
              loading="eager"
              alt={t("ownerImage.alt")}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="textClass sm:w-3/5 md:w-4/5">
          <h1 className="text-3xl font-medium">{t("landingInfo.h1")}</h1>
          <p className="sm:mr-20 lg:mr-40">
            {t.rich("landingInfo.description", resolvers)}
          </p>
        </div>

        <div className="textClass sm:w-4/5 mt-5 pr-15">
          <h2 className="text-xl font-medium mt-10">{t("purchasing.h2")}</h2>
          <p className="mt-5">{t.rich("purchasing.description", resolvers)}</p>
          <p className="mt-5">{t.rich("purchasing.callToAction", resolvers)}</p>
          <h2 className="text-xl font-medium mt-20">{t("address.h2")}</h2>
          <p>{t.rich("address.address", resolvers)}</p>
          <p className="mt-5">{t.rich("address.hours", resolvers)}</p>
          <p className="mt-5">{t.rich("address.appointment", resolvers)}</p>
        </div>
      </div>
    </div>
  );
}
