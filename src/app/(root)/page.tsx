import BestSellers from '@/modules/BestSellers';
import Blog from '@/modules/Blog';
import Categories from '@/modules/Categories';
import Featured from '@/modules/Featured';
import HeroCarousel from '@/modules/HeroCarousel';
import WhyUs from '@/modules/WhyUs';
import { useAuth } from '@/shared/hooks/useAuth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestSellers />
      <Featured />
      <Categories />
      <Blog />
      <WhyUs />
    </>
  );
}
