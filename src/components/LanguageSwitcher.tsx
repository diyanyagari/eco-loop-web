/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const languages = ["en", "id"];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLang = pathname.split("/")[1]; // get current locale from URL

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLang; // replace locale segment
    const newPath = segments.join("/");

    localStorage.setItem("lang", newLang); // save preference

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <select onChange={handleChange} value={currentLang}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
