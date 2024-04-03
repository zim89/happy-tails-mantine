import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Admin',
  description: null,
  robots: {
    index: false,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
