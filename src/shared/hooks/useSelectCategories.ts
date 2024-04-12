import { Category, useCategoriesQuery } from "../api/categoryApi";

export const useSelectCategories = <T>(cb: (categories: Category[]) => T) => {
    const { categories } = useCategoriesQuery(undefined, { selectFromResult: res => ({ categories: cb(res.data?.content || []) }) });
    return categories;
}