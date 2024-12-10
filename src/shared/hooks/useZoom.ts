'use client';

import { useEffect } from 'react';

export const useZoom = (scale: number) => {
  useEffect(() => {
    if (scale) {
      // @ts-ignore
      globalThis.document.body.style.zoom = scale;
    }

    return () => {
      // After leaving a page, return defaults
      // @ts-ignore
      globalThis.document.body.style.zoom = 1;
    };
  }, [scale]);
};
