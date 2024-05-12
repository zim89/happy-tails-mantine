import { useFindManyQuery } from "../api/ordersApi";
import { Order } from "../types/types";

export const useSelectOrders = <T>(cb: (orders: Order[]) => T) => {
    const { orders } = useFindManyQuery({ page: 0, limit: 1000000 }, { selectFromResult: res => ({ orders: cb(res.data?.content || []) }) });
    return orders;
}