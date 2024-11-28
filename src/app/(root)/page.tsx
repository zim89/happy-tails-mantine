import dynamic from 'next/dynamic';

const Featured = dynamic(() => import('@/modules/Featured'));
const Categories = dynamic(() => import('@/modules/Categories'));
const WhyUs = dynamic(() => import('@/modules/WhyUs'));
const HeroCarousel = dynamic(() => import('@/modules/HeroCarousel'), {
  ssr: false,
});
const Blog = dynamic(() => import('@/modules/Blog'));
const BestSellers = dynamic(() => import('@/modules/BestSellers'));
const ChatBot = dynamic(() => import('@/modules/ChatBot'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestSellers />
      <Featured />
      <Categories />
      <Blog />
      <WhyUs />
      <ChatBot />
    </>
  );
}
