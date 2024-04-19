import { Metadata } from 'next';

export const generateMetadata = ({
  params: { id },
}: {
  params: { id: string };
}): Metadata => {
  return {
    title: `Order #${id.toUpperCase()} Details`,
    robots: {
      index: false,
    },
  };
};

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
