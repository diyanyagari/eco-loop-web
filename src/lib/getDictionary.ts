// ITS ASYNC GET DIRECTORY
// import type { Locale } from "@/types/locale";

// export const getDictionary = async (locale: Locale) => {
//   switch (locale) {
//     case "id":
//       return (await import("@/locales/id.json")).default;
//     case "en":
//     default:
//       return (await import("@/locales/en.json")).default;
//   }
// };

// ITS SYNC GET DIRECTORY
import en from "@/locales/en.json";
import id from "@/locales/id.json";

export const dictionaries = {
  en,
  id,
} as const;

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
