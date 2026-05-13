"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type Locale = "en" | "da";

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 år
    sameSite: "lax",
  });
  revalidatePath("/");
}
