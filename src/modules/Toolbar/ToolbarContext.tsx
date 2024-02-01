'use client';

import { FilterFormValues } from '@/modules/Toolbar/components/FilterForm/FilterForm';
import { Sort } from '@/shared/types/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export type ToolbarData = {
  filter: FilterFormValues;
  sort?: Sort;
};

export const ToolbarContext = createContext<
  [ToolbarData, Dispatch<SetStateAction<ToolbarData>>]
>(null!);

export const ToolbarProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<ToolbarData>({
    filter: {
      categories: [],
      prices: [],
      onlyInStock: false,
    },
  });

  return (
    <ToolbarContext.Provider value={[value, setValue]}>
      {children}
    </ToolbarContext.Provider>
  );
};
