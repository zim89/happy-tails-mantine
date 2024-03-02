import { createContext, useState } from "react";

import { mockData, Category } from "./data";

type Context = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}
export const categoriesContext = createContext<Context>({
  categories: [],
  setCategories: () => {}
});

type CategoriesProviderProps = {
  children: React.ReactNode
}
export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState(mockData);

  return (
    <categoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </categoriesContext.Provider>
  )
}

export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
