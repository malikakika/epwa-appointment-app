"use client";

import { useTranslations } from "next-intl";

export default function Offline() {
  const t = useTranslations("offline");

  return (
    <main className="p-6 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-700">{t("message")}</p>
      </div>
    </main>
  );
}
