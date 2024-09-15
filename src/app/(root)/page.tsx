import BestSellers from '@/modules/BestSellers';
import Blog from '@/modules/Blog';
import Categories from '@/modules/Categories';
import Featured from '@/modules/Featured';
import HeroCarousel from '@/modules/HeroCarousel';
import WhyUs from '@/modules/WhyUs';
import { auth } from 'auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

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
