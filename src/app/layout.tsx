import { Lato, Ms_Madi, Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";

import theme from '@/shared/config/theme';
import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
// Styles for rich text editor
import '@mantine/tiptap/styles.css';

import { AppProviders } from '@/shared/config/AppProviders';
import Sitelinks from './(root)/sitelinks';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-lato',
  display: 'swap',
});

const msMadi = Ms_Madi({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-madi',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-inter',
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <Sitelinks />
        <ColorSchemeScript defer />
      </head>
      <body className={`${lato.variable} ${msMadi.variable} ${inter.variable} antialiased`}>
        <AppProviders>
          <MantineProvider theme={theme}>
            {children}
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </MantineProvider>
        </AppProviders>
      </body>
    </html>
  );
}
