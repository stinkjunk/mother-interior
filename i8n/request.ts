import { headers, cookies } from "next/headers";

// https://nextjs.org/docs/app/api-reference/functions/headers

import { getRequestConfig } from "next-intl/server";

async function detectLocale() {
  const cookieStore = await cookies();
  const stored = cookieStore.get("locale")?.value;
  if (stored === "da" || stored === "en") return stored;

  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language") ?? "";
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language

  const primaryLanguage = acceptLanguage.split(",")[0]?.trim().toLowerCase();
  // console.log("Detected primary language:", primaryLanguage);

  if (primaryLanguage?.startsWith("da")) {
    return "da";
  }

  return "en";
}

export default getRequestConfig(async () => {
  const locale = await detectLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
