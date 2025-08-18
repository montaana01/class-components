import { getMessages } from 'next-intl/server';
import Providers from '@/components/Providers';
import type { LayoutProps } from '@/types';
import './globals.scss';
import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/pokeapi.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React app | montaana01</title>
        <base href={`/${locale}/`} />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
