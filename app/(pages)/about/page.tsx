import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ImageLoader from "@/app/components/imageloader";
import type { RichTranslationValues } from "next-intl";
import Image from "next/image";

import { Metadata } from "next";
import { resolvers } from "@/i8n/resolvers/resolvers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  return {
    title: t("title"),
  };
}

export default function About() {
  const t = useTranslations("AboutPage.about");

  return (
    <main className="aboutPage scrollablePage  pb-20 flex flex-col items-center">
      <div className="max-sm:w-full max-sm:px-10 sm:w-2/3 lg:w-1/2 sm:relative">
        <div className="max-sm:w-full max-sm:order-1 max-sm:mt-10 sm:absolute right-0 top-0 w-32 aspect-1">
          <div className="max-sm:w-full aspect-1 w-0.4 sm:fixed h-50 relative textClass">
            <ImageLoader
              src="/media/owner.jpg"
              loading="eager"
              alt={t("ownerImage.alt")}
              width={400}
              height={400}
              className="w-full h-full object-cover aspect-square"
            />
            <p className="font-label absolute bottom-0 w-full p-1 text-background text-[0.6rem]">
              {t.rich("ownerImage.caption", resolvers)}
            </p>
            <p className="font-label absolute bottom-0 w-full p-1 text-[0.6rem] translate-y-full max-sm:truncate">
              {t.rich("ownerImage.instagramHandle", resolvers)}
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-medium mb-5 sm:w-3/5 max-sm:mt-15 max-sm:order-first">
          {t("landingInfo.h1")}
        </h1>
        <div className="textClass">
          <p className="sm:mr-20 lg:mr-40 sm:w-2/5 md:w-3/5">
            {t.rich("landingInfo.description", resolvers)}
          </p>
        </div>

        <div className="textClass sm:w-6/7 max-sm:mt-10 md:mt-20 sm:pr-15 max-sm:order-2">
          <h2 className="text-xl font-medium mt-10">{t("purchasing.h2")}</h2>
          <p className="mt-5 sm:mr-10">
            {t.rich("purchasing.description", resolvers)}
          </p>
          <p className="mt-5">{t.rich("purchasing.callToAction", resolvers)}</p>
          <h2 className="text-xl font-medium mt-20 max-sm:mt-10">
            {t("address.h2")}
          </h2>
          <p>{t.rich("address.address", resolvers)}</p>
          <p className="mt-5">{t.rich("address.hours", resolvers)}</p>
          <p className="mt-5">{t.rich("address.appointment", resolvers)}</p>
        </div>
      </div>
    </main>
  );
}
