'use client';

import { useDeviceSize } from '@/shared/lib/hooks';
import CategoriesSlider from './components/CategoriesSlider';
import CategoriesPresentation from './components/CategoriesPresentation';

export default function Categories() {
  const { isDesktop } = useDeviceSize();

  return (
    <section className='pt-16 md:pt-[88px] lg:pt-[104px]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Our Product Categories
      </h2>
      {isDesktop ? <CategoriesPresentation /> : <CategoriesSlider />}
    </section>
  );
}
