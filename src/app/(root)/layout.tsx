import { Metadata } from 'next';
import Header from '@/modules/Header';
import Footer from '@/modules/Footer';

export const metadata: Metadata = {
  title: "Happy Tails: Spoil Your Pup with Love (Clothes, Furniture, Toys & More!)",
  description: "Pamper your furry friend with love from Happy Tails! We offer a wide selection of dog clothes, furniture, toys, and other supplies to keep your pup happy and healthy. Shop now for fast shipping and amazing deals!"
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='grid h-screen grid-rows-[_1fr_auto] pt-[4.625rem] lg:pt-32'>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
