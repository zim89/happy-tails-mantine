import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add product page',
  robots: {
    index: false,
    indexifembedded: false,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
