'use client';

import { useDeviceSize } from '@/shared/lib/hooks';
import CategoriesSlider from './CategoriesSlider';
import { CategoriesPresentationWrapper } from './CategoriesPresentationWrapper';

export const Display = () => {
  const { isDesktop } = useDeviceSize();

  return (
    <>{isDesktop ? <CategoriesPresentationWrapper /> : <CategoriesSlider />}</>
  );
};
