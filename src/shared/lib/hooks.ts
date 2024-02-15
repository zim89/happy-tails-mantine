'use client';

import { useMediaQuery } from '@mantine/hooks';

export const useDeviceSize = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  return { isMobile, isTablet, isDesktop };
};
