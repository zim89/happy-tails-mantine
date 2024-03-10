import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Happy Tails: Contact Us with Your Questions or Concerns',
  description:
    "Need help with an order, product, or have a question? Contact Happy Tails! We're here to assist you.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
