import { useCategoriesQuery } from "../api/categoryApi";
import { Category } from "../types/types";


export const useSelectCategories = <T>(cb: (categories: Category[]) => T) => {
    const { categories } = useCategoriesQuery(undefined, { selectFromResult: res => ({ categories: cb(res.data?.content || []) }) });
    return categories;
}