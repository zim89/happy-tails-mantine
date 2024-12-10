import { Lato, Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import theme from '@/shared/config/theme';
import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
// Styles for rich text editor
import '@mantine/tiptap/styles.css';

// Styles for dates
import '@mantine/dates/styles.css';

// Styles for phone input
import 'react-international-phone/style.css';

import { AppProviders } from '@/shared/config/AppProviders';
import Sitelinks from './(root)/sitelinks';
import { Metadata, Viewport } from 'next';
import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
} from '@/shared/config/appVariables';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-lato',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-inter',
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
      </head>
      <body className={`${lato.variable} ${inter.variable} antialiased`}>
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
