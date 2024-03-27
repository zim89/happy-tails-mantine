import { Lato } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import theme from '@/shared/config/theme';
import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { AppProviders } from '@/shared/config/AppProviders';
import Sitelinks from "./(root)/sitelinks";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-lato',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <Sitelinks />
        <ColorSchemeScript defer/>
      </head>
      <body className={`${lato.variable} antialiased`}>
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
