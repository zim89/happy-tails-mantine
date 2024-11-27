import dynamic from 'next/dynamic';

const Featured = dynamic(() => import('@/modules/Featured'));
const Categories = dynamic(() => import('@/modules/Categories'));
const WhyUs = dynamic(() => import('@/modules/WhyUs'));
const HeroCarousel = dynamic(() => import('@/modules/HeroCarousel'));
const Blog = dynamic(() => import('@/modules/Blog'), { ssr: false });
const BestSellers = dynamic(() => import('@/modules/BestSellers'), {
  ssr: false,
});
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
