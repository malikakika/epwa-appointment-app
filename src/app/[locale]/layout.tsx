/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return (await import(`../../messages/fr.json`)).default;
  }
}

export default async function LocaleLayout(props: any) {
  const { children, params } = props as {
    children: React.ReactNode;
    params: { locale: string };
  };

  const messages = await getMessages(params.locale);

  return (
    <html lang={params.locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
