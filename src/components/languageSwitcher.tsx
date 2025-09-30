"use client";

import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const locales = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function changeLocale(locale: string) {
    const segments = pathname.split("/");

    if (locales.some((loc) => loc.code === segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    router.push(segments.join("/") || "/");
  }

  return (
    <select
      onChange={(e) => changeLocale(e.target.value)}
      defaultValue={params.locale}
      style={{
        padding: "0.4rem",
        borderRadius: "0.4rem",
        border: "1px solid #ccc",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code}>
          {loc.label}
        </option>
      ))}
    </select>
  );
}
