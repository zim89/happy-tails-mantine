import { Metadata } from 'next';

import LayoutTemplate from "@/shared/lib/layout";

export const metadata: Metadata = {
  title:
    'Happy Tails: Spoil Your Pup with Love (Clothes, Furniture, Toys & More!)',
  description:
    'We offer a wide selection of dog clothes, furniture, toys, and other supplies to keep your pup happy and healthy. Shop now for amazing deals!',
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutTemplate>
      {children}
    </LayoutTemplate>
  );
}