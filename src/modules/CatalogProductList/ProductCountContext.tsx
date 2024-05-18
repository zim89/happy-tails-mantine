'use client';

import {
  type ReactNode,
  createContext,
  useState,
  useCallback
} from 'react';

export const ProductCountContext = createContext<
  [number, (val: number) => void]
>([0, () => {}]);

export default function ProductCountContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, _setValue] = useState(0);

  const setValue = useCallback((val: number) => _setValue(val), [value]);

  return (
    <ProductCountContext.Provider value={[value, setValue]}>
      {children}
    </ProductCountContext.Provider>
  );
}
