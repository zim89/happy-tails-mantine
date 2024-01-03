import React from 'react';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import theme from '../shared/config/theme';
import './globals.css';

import Header from '@/modules/Header';
import Footer from '@/modules/Footer';
import { AppProviders } from '@/shared/config/AppProviders';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Happy Tails',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${lato.variable} pt-[74px] lg:pt-[122px]`}>
        <AppProviders>
          <MantineProvider theme={theme}>
            <Header />
            <main>{children}</main>
            <Footer />
          </MantineProvider>
        </AppProviders>
      </body>
    </html>
  );
}
