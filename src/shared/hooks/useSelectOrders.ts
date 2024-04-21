import { useFindManyQuery } from "../api/ordersApi";
import { Order } from "../types/types";

export const useSelectOrders = <T>(cb: (orders: Order[]) => T, token: string) => {
    const { orders } = useFindManyQuery({ page: 0, limit: Infinity, token }, { selectFromResult: res => ({ orders: cb(res.data?.content || []) }) });
    return orders;
}