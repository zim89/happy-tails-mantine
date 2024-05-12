import { useFindManyQuery } from "../api/productApi";
import { Product } from "../types/types";

export const useSelectProducts = <T>(cb: (products: Product[]) => T) => {
    const { products } = useFindManyQuery({ page: 0, limit: Infinity }, { selectFromResult: res => ({ products: cb(res.data?.content || []) }) });
    return products;
}