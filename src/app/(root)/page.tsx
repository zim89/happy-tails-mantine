import BestSellers from '@/modules/BestSellers';
import Featured from '@/modules/Featured';
import HeroCarousel from '@/modules/HeroCarousel';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestSellers />
      <Featured />
    </>
  );
}
