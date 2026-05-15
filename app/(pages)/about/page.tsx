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
      <div className="grid grid-cols-[5fr_2fr] sm:w-2/3 lg:w-1/2">
        <div className="textClass sm:col-start-1">
          <h1 className="text-3xl font-medium">{t("landingInfo.h1")}</h1>
          <p className="sm:mr-20 lg:mr-40">
            {t.rich("landingInfo.description", resolvers)}
          </p>
        </div>
        <div className="sm:fixed sm:flex sm:flex-col sm:items-center sm:w-full sm:right-0">
          <div className="sm:grid sm:grid-cols-[5fr_2fr] sm:w-2/3 lg:w-1/2">
            <div className="col-start-2">
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
        </div>
        <div className="textClass sm:col-start-1 mt-5 pr-15">
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
